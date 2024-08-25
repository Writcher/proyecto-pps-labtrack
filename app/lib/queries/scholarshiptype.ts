import { db } from '@vercel/postgres';
import { Scholarshiptype, NewScolarchiptype } from '../definitions';

const client = db;

export async function getScholarshipTypes() {
    try {
        const result = await client.sql`
        SELECT * FROM "scholarshiptype"
        `;
        return result.rows as Scholarshiptype[];
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo obtener el scholarshiptype");
    }
}

export async function getScholarshipTypeByName(name: string) {
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

export async function createScholarshipType(scholarshiptype: NewScolarchiptype) {
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

export async function dropScholarshipType(id: number) {
    try {
        return client.sql`
        DELETE FROM "scholarshiptype"
        WHERE id = ${id}
        `;
    } catch(error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo eliminar el scholarshiptype");
    }
}

export async function updateScholarshipType(scholarshiptype: Scholarshiptype) {
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