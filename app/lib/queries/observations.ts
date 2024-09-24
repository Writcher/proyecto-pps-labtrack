import { db } from "@vercel/postgres";
import { createProjectObservationQuery, fetchedObservations } from "../dtos/observation";

const client = db;

export async function getProjectObservations(project_id: number)  {
    try {
        const text = `
            SELECT 
                id,
                content,
                created_at
            FROM "observation" 
            WHERE project_id = $1
                AND task_id IS NULL
        `;
        const values =  [project_id];
        const result = await client.query(text, values);
        return result.rows as fetchedObservations[];
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
        throw new Error("No se pudo crear el proyecto");
    };
};