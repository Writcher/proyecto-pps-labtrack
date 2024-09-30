import { db } from "@vercel/postgres";
import { createProjectObservationQuery, createTaskObservationQuery, deleteObservationQuery, fetchedObservations } from "../dtos/observation";

const client = db;

export async function getTaskObservations(project_id: number, task_id: number, page: number)  {
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
                AND task_id = $2
            ORDER BY created_at DESC
            LIMIT $3 OFFSET $4
        `;
        const values1 =  [project_id, task_id, limit, offset];
        const result = await client.query(text1, values1);
        const text2 = `
            SELECT COUNT(*) AS total
        FROM "observation" p
        WHERE project_id = $1
            AND task_id = $2
        `;
        const values2 = [project_id, task_id];
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
        const textbegin = `BEGIN`;
        await client.query(textbegin);
        const text1 = `
        INSERT INTO "observation" (content, project_id)
        VALUES ($1, $2)
        RETURNING id
        `;
        const values1 = [params.content, params.project_id];
        const response = await client.query(text1, values1);
        const observationid = response.rows[0].id;
        for (const scholar_id of params.scholar_ids) {
            const text2 = `
            INSERT INTO "observation_read" (scholar_id, observation_id)
            VALUES ($1, $2)
            `;
            const values2 = [scholar_id, observationid];
            await client.query(text2, values2);
        };
        const textcommit = `COMMIT`;
        await client.query(textcommit);
        return { success: true, message: "Instancia creada correctamente" };
    } catch(error) {
        console.error("Error de Base de Datos:", error);
        const textrollback = `ROLLBACK`;
        await client.query(textrollback);
        throw new Error("No se pudo crear la observacion");
    };
};

export async function createObservationTask(params: createTaskObservationQuery) {
    try {
        const textbegin = `BEGIN`;
        await client.query(textbegin);
        const text1 = `
        INSERT INTO "observation" (content, project_id, task_id)
        VALUES ($1, $2, $3)
        RETURNING id
        `;
        const values1 = [params.content, params.project_id , params.task_id];
        const response = await client.query(text1, values1);
        const observationid = response.rows[0].id;
        const text2 = `
        SELECT scholar_id 
        FROM projectscholar
        WHERE project_id = $1
        `;
        const values2 = [params.project_id];
        const scholars = await client.query(text2, values2); 
        for (const scholar of scholars.rows) {
            const scholar_id = scholar.scholar_id;
            const text3 = `
            INSERT INTO "observation_read" (scholar_id, observation_id)
            VALUES ($1, $2)
            `;
            const values3 = [scholar_id, observationid];
            await client.query(text3, values3);
        };
        const textcommit = `COMMIT`;
        await client.query(textcommit);
        return { success: true, message: "Instancia creada correctamente" };
    } catch(error) {
        console.error("Error de Base de Datos:", error);
        const textrollback = `ROLLBACK`;
        await client.query(textrollback);
        throw new Error("No se pudo crear la observacion");
    };
};

export async function dropObservation(params: deleteObservationQuery) {
    try {
        const textbegin = `BEGIN`;
        await client.query(textbegin);
        const text2 = `
        DELETE FROM "observation_read" WHERE observation_id = $1
        `;
        const values2 = [params.id];
        await client.query(text2, values2);
        const text1 = `
        DELETE FROM "observation" WHERE id = $1
        `;
        const values1 = [params.id];
        await client.query(text1, values1);
        const textcommit = `COMMIT`;
        await client.query(textcommit);
        return { success: true, message: "Instancia eliminada correctamente" };
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        const textrollback = `ROLLBACK`;
        await client.query(textrollback);
        throw new Error("No se pudo eliminar la observacion");
    };
};