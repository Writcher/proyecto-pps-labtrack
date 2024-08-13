import { db } from '@vercel/postgres';
import { Laboratory } from '../definitions';

const client = db;
export async function getLabs() {
    try {
        const result = await client.sql`
        SELECT * FROM "laboratory"
        `;
        return result.rows as Laboratory[];
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo obtener el laboratory");
    }
}

export async function getLabById(id: number) {
    try {
        const result = await client.sql`
        SELECT * FROM "laboratory"
        WHERE id = ${id}
        `;
        return result.rows[0];
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo obtener el laboratory");
    }
}