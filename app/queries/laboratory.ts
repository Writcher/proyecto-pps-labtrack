import { sql } from '@vercel/postgres';
import { Laboratory } from '../lib/definitions';

export async function getLabs() {
    try {
        const {rows} = await sql<Laboratory>`SELECT * FROM laboratory`;
        return rows;
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo obtener laboratory");
    }
}