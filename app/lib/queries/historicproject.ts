import { db } from '@vercel/postgres';
import { GetHistoricProject } from '../definitions';

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
            query += ` AND hs.historicscholarshiptype_id = $${paramIndex++}`;
            params.push(filters.scholarship);
        }
        if (filters.userCareer !== undefined) {
            query += ` AND hs.historicusercareer_id = $${paramIndex++}`;
            params.push(filters.userCareer);
        }
        if (filters.scholarname !== undefined) {
            query += ` AND hs.name ILIKE unaccent($${paramIndex++})`;
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