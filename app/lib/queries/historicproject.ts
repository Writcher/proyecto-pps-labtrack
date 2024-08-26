import { db } from '@vercel/postgres';
import { GetHistoricProject, NewHistoricProject } from '../definitions';

const client = db;

export async function getHistoricProjects(
    labid: number,
    filters: {
        projectname?: string;
        scholarship?: number;
        userCareer?: number;
        scholarname?: string;
        projectStatus?: number;
        projectType?: number;
        year?: number;
    }
) {
    try {
        let query = `
            SELECT 
                hp.id, 
                hp.name, 
                hp.description, 
                hp.year, 
                hp.historicprojecttype_id, 
                hpt.name AS historicprojecttypename,
                hp.historicprojectstatus_id, 
                hps.name AS historicprojectstatusname,
                COALESCE(
                    json_agg(
                        json_build_object(
                            'id', hs.id,
                            'name', hs.name,
                            'email', hs.email,
                            'dni', hs.dni,
                            'file', hs.file,
                            'phone', hs.phone,
                            'careerlevel', hs.careerlevel,
                            'historicusercareer_id', hs.historicusercareer_id,
                            'historicusercareername', huc.name,
                            'historicscholarshiptype_id', hs.historicscholarshiptype_id,
                            'historicscholarshiptypename', hst.name
                        )
                    ) FILTER (WHERE hs.id IS NOT NULL), '[]'
                ) AS historicscholars
            FROM "historicproject" hp
            JOIN "historicprojecttype" hpt ON hp.historicprojecttype_id = hpt.id
            JOIN "historicprojectstatus" hps ON hp.historicprojectstatus_id = hps.id
            LEFT JOIN "historicprojectscholar" hpsc ON hp.id = hpsc.historicproject_id
            LEFT JOIN "historicscholar" hs ON hs.id = hpsc.historicscholar_id
            LEFT JOIN "historicusercareer" huc ON huc.id = hs.historicusercareer_id
            LEFT JOIN "historicscholarshiptype" hst ON hst.id = hs.historicscholarshiptype_id
            WHERE hp.laboratory_id = $1
        `;
        const params: any[] = [labid];
        let paramIndex = 2;
        if (filters.projectname !== undefined) {
            query += ` AND hp.name ILIKE unaccent($${paramIndex++})`;
            params.push(`%${filters.projectname}%`);
        }
        if (filters.scholarship !== undefined) {
            query += ` AND EXISTS (
                SELECT 1
                FROM "historicprojectscholar" hpsc2
                JOIN "historicscholar" hs2 ON hs2.id = hpsc2.historicscholar_id
                WHERE hpsc2.historicproject_id = hp.id
                AND hs2.historicscholarshiptype_id = $${paramIndex++}
            )`;
            params.push(filters.scholarship);
        }
        if (filters.userCareer !== undefined) {
            query += ` AND EXISTS (
                SELECT 1
                FROM "historicprojectscholar" hpsc2
                JOIN "historicscholar" hs2 ON hs2.id = hpsc2.historicscholar_id
                WHERE hpsc2.historicproject_id = hp.id
                AND hs2.historicusercareer_id = $${paramIndex++}
            )`;
            params.push(filters.userCareer);
        }
        if (filters.scholarname !== undefined) {
            query += ` AND EXISTS (
                SELECT 1
                FROM "historicprojectscholar" hpsc2
                JOIN "historicscholar" hs2 ON hs2.id = hpsc2.historicscholar_id
                WHERE hpsc2.historicproject_id = hp.id
                AND hs2.name ILIKE unaccent($${paramIndex++})
            )`;
            params.push(`%${filters.scholarname}%`);
        }
        if (filters.projectStatus !== undefined) {
            query += ` AND hp.historicprojectstatus_id = $${paramIndex++}`;
            params.push(filters.projectStatus);
        }
        if (filters.projectType !== undefined) {
            query += ` AND hp.historicprojecttype_id = $${paramIndex++}`;
            params.push(filters.projectType);
        }
        if (filters.year !== undefined) {
            query += ` AND hp.year = $${paramIndex++}`;
            params.push(filters.year);
        }
        query += `
            GROUP BY 
                hp.id, hpt.name, hps.name;
        `;
        const resultproject = await client.query(query, params);
        return resultproject.rows as GetHistoricProject[];
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo obtener los proyectos históricos");
    }
}

export async function createHistoricProject(historicProject: NewHistoricProject) {
    try {
        await client.sql`BEGIN`;
        const response = await client.sql`
        INSERT INTO "historicproject" (name, description, year, laboratory_id, historicprojectstatus_id, historicprojecttype_id)
        VALUES (${historicProject.name}, ${historicProject.description}, ${historicProject.year}, ${historicProject.laboratory_id}, ${historicProject.projectstatus_id}, ${historicProject.projecttype_id})
        RETURNING id
        ;`;
        const projectid = response.rows[0].id;
        for (const scholar of historicProject.scholars) {
            const emailValue = scholar.email !== undefined && scholar.email !== '' ? scholar.email : null;
            const dniValue = scholar.dni !== undefined && scholar.dni !== '' ? scholar.dni : null;
            const fileValue = scholar.file !== undefined && scholar.file !== '' ? scholar.file : null;
            const phoneValue = scholar.phone !== undefined && scholar.phone !== '' ? scholar.phone : null;
            const careerlevelValue = scholar.careerlevel !== undefined ? scholar.careerlevel : null;
            const response = await client.sql`
            INSERT INTO "historicscholar" (name, email, dni, file, phone, careerlevel, historicusercareer_id, historicscholarshiptype_id)
            VALUES (${scholar.name}, ${emailValue}, ${dniValue}, ${fileValue}, ${phoneValue}, ${careerlevelValue}, ${scholar.historicusercareer_id}, ${scholar.historicscholarshiptype_id})
            RETURNING id
            ;`;
            const scholarid = response.rows[0].id;
            await client.sql`
            INSERT INTO "historicprojectscholar" (historicproject_id, historicscholar_id)
            VALUES (${projectid}, ${scholarid})
            `;
        }
        await client.sql`COMMIT`;
        return { success: true, message: "Instancia creada correctamente" };
    } catch(error) {
        console.error("Error de Base de Datos:", error);
        await client.sql`ROLLBACK`;
        throw new Error("No se pudo crear el historico");
    }
}