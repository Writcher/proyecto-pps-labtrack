import { db } from "@vercel/postgres";

const client = db;

export async function getStatusPending() {
    try {
        const result = await client.sql`
            SELECT id
            FROM "userstatus"
            WHERE name ILIKE 'Pendiente'
        `;
        const response = result.rows;
        if (response.length > 0) {
            return response[0].id;;
        } else {
            throw new Error("No se encontró el estatus 'Pendiente'");
        }
    } catch (error) {
        console.error("Error al obtener el estatus 'Pendiente':", error);
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
        const response = result.rows;
        if (response.length > 0) {
            return response[0].id;;
        } else {
            throw new Error("No se encontró el estatus 'Activo'");
        }
    } catch (error) {
        console.error("Error al obtener el estatus 'Activo':", error);
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
        const response = result.rows;
        if (response.length > 0) {
            return response[0].id;;
        } else {
            throw new Error("No se encontró el estatus 'Inactivo'");
        }
    } catch (error) {
        console.error("Error al obtener el estatus 'Inactivo':", error);
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
        const response = result.rows;
        if (response.length > 0) {
            return response[0].id;;
        } else {
            throw new Error("No se encontró el estatus 'Expírado'");
        }
    } catch (error) {
        console.error("Error al obtener el estatus 'Expirado':", error);
        throw error;
    }
}