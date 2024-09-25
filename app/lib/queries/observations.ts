import { db } from "@vercel/postgres";
import { createProjectObservationQuery, deleteObservationQuery, fetchedObservations } from "../dtos/observation";

const client = db;

export async function getProjectObservations(project_id: number, page: number)  {
    try {
        const limit = 5;
        const offset = (page - 1) * limit;
        const text1 = `
            SELECT 
                id,
                content,
                created_at
            FROM "observation" 
            WHERE project_id = $1
                AND task_id IS NULL
            ORDER BY created_at DESC
            LIMIT $2 OFFSET $3
        `;
        const values1 =  [project_id, limit, offset];
        const result = await client.query(text1, values1);
        const text2 = `
            SELECT COUNT(*) AS total
        FROM "observation" p
        WHERE project_id = $1
            AND task_id IS NULL
        `;
        const values2 = [project_id];
        const count = await client.query(text2, values2);
        return {
            observations: result.rows as fetchedObservations[],
            totalObservations: count.rows[0].total as number,
        };
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo obtener las observaciones");
    };
};

export async function createObservationProject(params: createProjectObservationQuery) {
    try {
        const text1 = `
        INSERT INTO "observation" (content, project_id)
        VALUES ($1, $2)
        `;
        const values1 = [params.content, params.project_id];
        const response = await client.query(text1, values1);
        return { success: true, message: "Instancia creada correctamente" };
    } catch(error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo crear la observacion");
    };
};

export async function dropObservation(params: deleteObservationQuery) {
    try {
        const text1 = `
        DELETE FROM "observation" WHERE id = $1
        `;
        const values1 = [params.id];
        const response = await client.query(text1, values1);
        return { success: true, message: "Instancia eliminada correctamente" };
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo eliminar la observacion")
    };
};