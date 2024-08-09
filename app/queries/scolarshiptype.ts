import { db } from '@vercel/postgres';
import { Scolarshiptype, NewScolarchiptype } from '../lib/definitions';

export async function getScolarshipTypes() {
    const client = await db.connect();
    try {
        const result = await client.sql`
        SELECT * FROM "scolarshiptype"
        `;
        return result.rows as Scolarshiptype[];
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo obtener el scolarshiptype");
    }
}

export async function getScolarshipTypeByName(name: string){
    const client = await db.connect();
    try {
        const result = await client.sql`
        SELECT * FROM "scolarshiptype"
        WHERE name ILIKE ${`%${name}%`}
        `;
        return result;
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo obtener el scolarshiptype");
    }
}

export async function getScolarshipTypeById(id: number){
    const client = await db.connect();
    try {
        const result = await client.sql`
        SELECT * FROM "scolarshiptype"
        WHERE id = ${id}
        `;
        return result.rows;
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo obtener el scolarshiptype");
    }
}

export async function createScolarshipType(scolarshiptype: NewScolarchiptype){
    const client = await db.connect();
    try {
        return client.sql`
        INSERT INTO "scolarshiptype" (name)
        VALUES (${scolarshiptype.name})
        `;
    } catch(error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo crear el scolarshiptype");
    }
}

export async function dropScolarshipType(id: number){
    const client = await db.connect();
    try {
        return client.sql`
        DELETE FROM "scolarshiptype"
        WHERE id = ${id}
        `;
    } catch(error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo crear el scolarshiptype");
    }
}

export async function updateScolarshipType(scolarshiptype: Scolarshiptype){
    const client = await db.connect();
    try {
        return client.sql`
        UPDATE "scolarshiptype"
        SET name = ${scolarshiptype.name}
        WHERE id = ${scolarshiptype.id}
        `;
    } catch(error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo editar el scolarshiptype");
    }
}