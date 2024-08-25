import { db } from '@vercel/postgres';
import { Projectstatus, NewProjectstatus } from '../definitions';

const client = db;

export async function getHistoricProjectStatuses() {
    try {
        const result = await client.sql`
        SELECT * FROM "historicprojectstatus"
        `;
        return result.rows as Projectstatus[];
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo obtener el projectstatus");
    }
}

export async function createHistoricProjectStatus(historicprojectstatus: NewProjectstatus) {
    try {
        return client.sql`
        INSERT INTO "historicprojectstatus" (name)
        VALUES (${historicprojectstatus.name})
        `;
    } catch(error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo crear el projectstatus");
    }
}