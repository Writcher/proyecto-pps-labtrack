import { db } from "@vercel/postgres";
import { fetchedProject, fetchProjectData } from "../dtos/project";

const client = db;

export async function getProjectsTable(params: fetchProjectData) {
    try {
        const offset = (params.page) * params.rowsPerPage;
        const projectsearch = `%${params.projectSearch}%`;
        const scholarsearch = `%${params.scholarSearch}%`;
        const baseValues = [params.laboratory_id, params.rowsPerPage, offset];
        let text = `
            SELECT 
                p.id, 
                p.name, 
                p.description,   
                pt.name AS projecttypename,
                ps.name AS projectstatusname,
                (SELECT COUNT(*) 
                    FROM "task" t 
                    WHERE t.project_id = p.id ) AS projecttaskcount,
                (SELECT COUNT(*)
                    FROM "task" t
                    JOIN "taskstatus" ts ON t.taskstatus_id = ts.id
                    WHERE t.project_id = p.id AND ts.name = 'Completada') AS completedprojecttaskcount
            FROM "project" p
            JOIN "projecttype" pt ON p.projecttype_id = pt.id
            JOIN "projectstatus" ps ON p.projectstatus_id = ps.id
            LEFT JOIN "projectscholar" psc ON p.id = psc.project_id
            LEFT JOIN "scholar" s ON s.id = psc.scholar_id
            LEFT JOIN "usercareer" uc ON uc.id = s.usercareer_id
            LEFT JOIN "scholarshiptype" st ON st.id = s.scholarshiptype_id
            WHERE p.laboratory_id = $1
        `;
        const values: any = [...baseValues];
        let filtertext = '';
        if (params.projectSearch !== "") {
            filtertext += `AND unaccent(p.name) ILIKE unaccent($${values.length + 1}) 
            `;
            values.push(projectsearch);
        };
        if (params.projecttype_id !== 0) {
            filtertext += `AND p.projecttype_id = $${values.length +1}
            `;
            values.push(params.projecttype_id);
        };
        if (params.projectstatus_id !== 0) {
            filtertext += `AND p.projectstatus_id = $${values.length +1}
            `;
            values.push(params.projectstatus_id);
        };
        if (params.scholarSearch !== "") {
            filtertext += `AND EXISTS (
                SELECT 1
                FROM "projectscholar" psc2
                JOIN "scholar" s2 ON s2.id = psc2.scholar_id
                WHERE psc2.project_id = p.id
                AND unaccent(s2.name) ILIKE unaccent($${values.length + 1})
            )
            `;
            values.push(scholarsearch)
        };
        if (params.scholarshiptype_id !== 0) {
            filtertext += `AND EXISTS (
                SELECT 1
                FROM "projectscholar" psc2
                JOIN "scholar" s2 ON s2.id = psc2.scholar_id
                WHERE psc2.project_id = p.id
                AND s2.scholarshiptype_id = $${values.length +1}
            )
            `;
            values.push(params.scholarshiptype_id);
        };
        if (params.usercareer_id !== 0) {
            filtertext += `AND EXISTS (
                SELECT 1
                FROM "projectscholar" psc2
                JOIN "scholar" s2 ON s2.id = psc2.scholar_id
                WHERE psc2.project_id = p.id
                AND s2.usercareer_id = $${values.length +1}
            )
            `;
            values.push(params.usercareer_id);
        };
        text += filtertext;
        const grouptext = `
            GROUP BY 
                p.id, pt.name, ps.name
        `;
        text += grouptext;
        text += `
            LIMIT $2 OFFSET $3
        `;
        const result = await client.query(text, values);
        const text2 = `
        SELECT COUNT(*) AS total
        FROM "project" p
        WHERE p.laboratory_id = $1
        `;
        const values2 = [params.laboratory_id];
        const countresult = await client.query(text2, values2);
        return {
            projects: result.rows as fetchedProject[],
            totalProjects: countresult.rows[0].total,
        };
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo obtener los proyectos");
    };
};