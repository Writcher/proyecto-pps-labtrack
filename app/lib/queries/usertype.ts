import { db } from '@vercel/postgres';

const client = db;

export async function getTypeScholar() {
    try {
        const result = await client.sql`
            SELECT id
            FROM "usertype"
            WHERE name ILIKE 'Becario'
        `;
        const response = result.rows;
        if (response.length > 0) {
            return response[0].id;;
        } else {
            throw new Error("No se encontró el tipo 'Becario'");
        }
    } catch (error) {
        console.error("Error al obtener el tipo 'Becario':", error);
        throw error;
    }
}

export async function getTypeAdmin() {
    try {
        const result = await client.sql`
            SELECT id
            FROM "usertype"
            WHERE name ILIKE 'Admin'
        `;
        const response = result.rows;
        if (response.length > 0) {
            return response[0].id;;
        } else {
            throw new Error("No se encontró el tipo 'Admin'");
        }
    } catch (error) {
        console.error("Error al obtener el tipo 'Admin':", error);
        throw error;
    }
}

export async function getTypeGuest() {
    try {
        const result = await client.sql`
            SELECT id
            FROM "usertype"
            WHERE name ILIKE 'Invitado'
        `;
        const response = result.rows;
        if (response.length > 0) {
            return response[0].id;;
        } else {
            throw new Error("No se encontró el tipo 'Invitado'");
        }
    } catch (error) {
        console.error("Error al obtener el tipo 'Invitado':", error);
        throw error;
    }
}