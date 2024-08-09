import { sql } from '@vercel/postgres';
import { Usertype } from '../definitions';

export async function gethUserType() {
    try {
        const {rows} = await sql<Usertype>`SELECT * FROM usertype`;
        return rows;
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo obtener usertype");
    }
}