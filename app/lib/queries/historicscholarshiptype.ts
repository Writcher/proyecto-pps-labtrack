import { db } from '@vercel/postgres';
import { Scholarshiptype, NewScolarchiptype } from '../definitions';

const client = db;

export async function getHistoricScholarshipTypes() {
    try {
        const result = await client.sql`
        SELECT * FROM "historicscholarshiptype"
        `;
        return result.rows as Scholarshiptype[];
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo obtener el scholarshiptype");
    }
}

export async function createHistoricScholarshipType(historicscholarshiptype: NewScolarchiptype) {
    try {
        return client.sql`
        INSERT INTO "historicscholarshiptype" (name)
        VALUES (${historicscholarshiptype.name})
        `;
    } catch(error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo crear el scholarshiptype");
    }
}