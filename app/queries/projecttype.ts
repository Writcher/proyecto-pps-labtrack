import { db } from '@vercel/postgres';
import { Projecttype, NewProjecttype } from '../lib/definitions';

export async function getProjectTypes() {
    const client = await db.connect();
    try {
        const result = await client.sql`
        SELECT * FROM "projecttype"
        `;
        return result.rows as Projecttype[];
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo obtener el projecttype");
    }
}

export async function getProjectTypeByName(name: string){
    const client = await db.connect();
    try {
        const result = await client.sql`
        SELECT * FROM "projecttype"
        WHERE name ILIKE ${`%${name}%`}
        `;
        return result;
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo obtener el projecttype");
    }
}

export async function getProjectTypeById(id: number){
    const client = await db.connect();
    try {
        const result = await client.sql`
        SELECT * FROM "projecttype"
        WHERE id = ${id}
        `;
        return result.rows;
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo obtener el projecttype");
    }
}

export async function createProjectType(projecttype: NewProjecttype){
    const client = await db.connect();
    try {
        return client.sql`
        INSERT INTO "projecttype" (name)
        VALUES (${projecttype.name})
        `;
    } catch(error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo crear el projecttype");
    }
}

export async function dropProjectType(id: number){
    const client = await db.connect();
    try {
        return client.sql`
        DELETE FROM "projecttype"
        WHERE id = ${id}
        `;
    } catch(error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo crear el projecttype");
    }
}

export async function updateProjectType(projecttype: Projecttype){
    const client = await db.connect();
    try {
        return client.sql`
        UPDATE "projecttype"
        SET name = ${projecttype.name}
        WHERE id = ${projecttype.id}
        `;
    } catch(error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo editar el projecttype");
    }
}