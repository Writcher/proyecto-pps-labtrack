import { db } from '@vercel/postgres';
import { Projecttype, NewProjecttype } from '../definitions';

const client = db;

export async function getHistoricProjectTypes() {
    try {
        const result = await client.sql`
        SELECT * FROM "historicprojecttype"
        `;
        return result.rows as Projecttype[];
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo obtener el projecttype");
    }
}

export async function createHistoricProjectType(historicprojecttype: NewProjecttype) {
    try {
        return client.sql`
        INSERT INTO "historicprojecttype" (name)
        VALUES (${historicprojecttype.name})
        `;
    } catch(error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo crear el projecttype");
    }
}