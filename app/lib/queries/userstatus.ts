import { db } from "@vercel/postgres";

const client = db;

export async function getStatusPending() {
    try {
        const result = await client.sql`
            SELECT id
            FROM "userstatus"
            WHERE name ILIKE 'Pendiente'
        `;
        let response = result.rows;
        if (response.length > 0) {
            return response[0].id;
        } 
        const insertResult = await client.sql`
            INSERT INTO "userstatus" (name)
            VALUES ('Pendiente')
            RETURNING id
        `;
        response = insertResult.rows;
        return response[0].id;
    } catch (error) {
        console.error("Error al obtener o crear el estado 'Pendiente':", error);
        throw error;
    }
}

export async function getStatusActive() {
    try {
        const result = await client.sql`
            SELECT id
            FROM "userstatus"
            WHERE name ILIKE 'Activo'
        `;
        let response = result.rows;
        if (response.length > 0) {
            return response[0].id;
        } 
        const insertResult = await client.sql`
            INSERT INTO "userstatus" (name)
            VALUES ('Activo')
            RETURNING id
        `;
        response = insertResult.rows;
        return response[0].id;
    } catch (error) {
        console.error("Error al obtener o crear el estado 'Activo':", error);
        throw error;
    }
}

export async function getStatusDeactivated(){
    try {
        const result = await client.sql`
            SELECT id
            FROM "userstatus"
            WHERE name ILIKE 'Inactivo'
        `;
        let response = result.rows;
        if (response.length > 0) {
            return response[0].id;
        } 
        const insertResult = await client.sql`
            INSERT INTO "userstatus" (name)
            VALUES ('Inactivo')
            RETURNING id
        `;
        response = insertResult.rows;
        return response[0].id;
    } catch (error) {
        console.error("Error al obtener o crear el estado 'Inactivo':", error);
        throw error;
    }
}

export async function getStatusExpired(){
    try {
        const result = await client.sql`
            SELECT id
            FROM "userstatus"
            WHERE name ILIKE 'Expirado'
        `;
        let response = result.rows;
        if (response.length > 0) {
            return response[0].id;
        } 
        const insertResult = await client.sql`
            INSERT INTO "userstatus" (name)
            VALUES ('Expirado')
            RETURNING id
        `;
        response = insertResult.rows;
        return response[0].id;
    } catch (error) {
        console.error("Error al obtener o crear el estado 'Expirado':", error);
        throw error;
    }
}