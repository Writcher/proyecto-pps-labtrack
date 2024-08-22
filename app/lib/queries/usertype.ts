import { db } from '@vercel/postgres';

const client = db;

export async function getTypeScholar() {
    try {
        const result = await client.sql`
            SELECT id
            FROM "usertype"
            WHERE name ILIKE 'Becario'
        `;
        let response = result.rows;
        if (response.length > 0) {
            return response[0].id;
        } 
        const insertResult = await client.sql`
            INSERT INTO "usertype" (name)
            VALUES ('Becario')
            RETURNING id
        `;
        response = insertResult.rows;
        return response[0].id;
    } catch (error) {
        console.error("Error al obtener o crear el tipo 'Becario':", error);
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
        let response = result.rows;
        if (response.length > 0) {
            return response[0].id;
        } 
        const insertResult = await client.sql`
            INSERT INTO "usertype" (name)
            VALUES ('Admin')
            RETURNING id
        `;
        response = insertResult.rows;
        return response[0].id;
    } catch (error) {
        console.error("Error al obtener o crear el tipo 'Admin':", error);
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
        let response = result.rows;
        if (response.length > 0) {
            return response[0].id;
        } 
        const insertResult = await client.sql`
            INSERT INTO "usertype" (name)
            VALUES ('Invitado')
            RETURNING id
        `;
        response = insertResult.rows;
        return response[0].id;
    } catch (error) {
        console.error("Error al obtener o crear el tipo 'Invitado':", error);
        throw error;
    }
}