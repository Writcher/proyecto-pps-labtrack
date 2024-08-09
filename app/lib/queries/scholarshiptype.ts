import { db } from '@vercel/postgres';
import { Scolarshiptype, NewScolarchiptype } from '../definitions';

const client = db;

export async function getScolarshipTypes() {
    try {
        const result = await client.sql`
        SELECT * FROM "scholarshiptype"
        `;
        return result.rows as Scolarshiptype[];
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo obtener el scholarshiptype");
    }
}

export async function getScolarshipTypeByName(name: string) {
    try {
        const result = await client.sql`
        SELECT * FROM "scholarshiptype"
        WHERE name ILIKE ${`%${name}%`}
        `;
        return result;
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo obtener el scholarshiptype");
    }
}

export async function getScolarshipTypeById(id: number) {
    try {
        const result = await client.sql`
        SELECT * FROM "scholarshiptype"
        WHERE id = ${id}
        `;
        return result.rows;
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo obtener el scholarshiptype");
    }
}

export async function createScolarshipType(scholarshiptype: NewScolarchiptype) {
    try {
        return client.sql`
        INSERT INTO "scholarshiptype" (name)
        VALUES (${scholarshiptype.name})
        `;
    } catch(error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo crear el scholarshiptype");
    }
}

export async function dropScolarshipType(id: number) {
    try {
        return client.sql`
        DELETE FROM "scholarshiptype"
        WHERE id = ${id}
        `;
    } catch(error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo crear el scholarshiptype");
    }
}

export async function updateScolarshipType(scholarshiptype: Scolarshiptype) {
    try {
        return client.sql`
        UPDATE "scholarshiptype"
        SET name = ${scholarshiptype.name}
        WHERE id = ${scholarshiptype.id}
        `;
    } catch(error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo editar el scholarshiptype");
    }
}