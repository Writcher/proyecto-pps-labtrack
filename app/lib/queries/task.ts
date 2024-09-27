import { db } from "@vercel/postgres";
import { fetchedPageTask } from "../dtos/task";

const client = db;

export async function getProjectTasks(project_id: number, page: number) {
    try {
        const limit = 5;
        const offset = (page - 1) * limit;
        const text1 = `
        SELECT
            t.id,
            t.name,
            t.description,
            t.created_at,
            t.start,
            t.end,
            ts.name AS taskstatusname
        FROM "task" t
        JOIN "taskstatus" ts ON t.taskstatus_id = ts.id
        WHERE t.project_id = $1
        ORDER BY created_at DESC
        LIMIT $2 OFFSET $3
        `;
        const values1 = [project_id, limit, offset];
        const result = await client.query(text1, values1);
        const text2 = `
        SELECT COUNT(*) AS total
        FROM "task"
        WHERE project_id = $1
        `;
        const values2 = [project_id];
        const count = await client.query(text2, values2);
        return {
            tasks: result.rows as fetchedPageTask[],
            totalTasks: count.rows[0].total as number,
        };
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo obtener la tarea");
    };
};