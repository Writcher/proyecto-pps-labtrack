import { db } from "@vercel/postgres";

const client = db;

export async function getTaskStatusPending() {
    try {
        const text1 = `
            SELECT id
            FROM "taskstatus"
            WHERE name ILIKE 'Pendiente'
        `;
        const result = await client.query(text1);
        let response = result.rows;
        if (response.length > 0) {
            return response[0].id;
        };
        const text2 = `
            INSERT INTO "taskstatus" (name)
            VALUES ('Pendiente')
            RETURNING id
        `;
        const insertResult = await client.query(text2);
        response = insertResult.rows;
        return response[0].id;
    } catch (error) {
        console.error("Error al obtener o crear el estado de tarea 'Pendiente':", error);
        throw error;
    };
};