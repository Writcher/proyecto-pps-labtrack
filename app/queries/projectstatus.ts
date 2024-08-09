import { db } from '@vercel/postgres';
import { Projectstatus, NewProjectstatus } from '../lib/definitions';

export async function getProjectStatuses() {
    const client = await db.connect();
    try {
        const result = await client.sql`
        SELECT * FROM "projectstatus"
        `;
        return result.rows as Projectstatus[];
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo obtener el projectstatus");
    }
}

export async function getProjectStatusByName(name: string){
    const client = await db.connect();
    try {
        const result = await client.sql`
        SELECT * FROM "projectstatus"
        WHERE name ILIKE ${`%${name}%`}
        `;
        return result;
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo obtener el projectstatus");
    }
}

export async function getProjectStatusById(id: number){
    const client = await db.connect();
    try {
        const result = await client.sql`
        SELECT * FROM "projectstatus"
        WHERE id = ${id}
        `;
        return result.rows;
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo obtener el projectstatus");
    }
}

export async function createProjectStatus(projectstatus: NewProjectstatus){
    const client = await db.connect();
    try {
        return client.sql`
        INSERT INTO "projectstatus" (name)
        VALUES (${projectstatus.name})
        `;
    } catch(error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo crear el projectstatus");
    }
}

export async function dropProjectStatus(id: number){
    const client = await db.connect();
    try {
        return client.sql`
        DELETE FROM "projectstatus"
        WHERE id = ${id}
        `;
    } catch(error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo crear el projectstatus");
    }
}

export async function updateProjectStatus(projectstatus: Projectstatus){
    const client = await db.connect();
    try {
        return client.sql`
        UPDATE "projectstatus"
        SET name = ${projectstatus.name}
        WHERE id = ${projectstatus.id}
        `;
    } catch(error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo editar el projectstatus");
    }
}