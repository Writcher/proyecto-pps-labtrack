import { db } from '@vercel/postgres';
import { Supplystatus, NewSupplystatus } from '../definitions';

const client = db;

export async function getSupplyStatuses() {
    try {
        const result = await client.sql`
        SELECT * FROM "supplystatus"
        `;
        return result.rows as Supplystatus[];
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo obtener el supplystatus");
    }
}

export async function getSupplyStatusByName(name: string) {
    try {
        const result = await client.sql`
        SELECT * FROM "supplystatus"
        WHERE name ILIKE ${`%${name}%`}
        `;
        return result;
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo obtener el supplystatus");
    }
}

export async function getSupplyStatusById(id: number) {
    try {
        const result = await client.sql`
        SELECT * FROM "supplystatus"
        WHERE id = ${id}
        `;
        return result.rows;
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo obtener el supplystatus");
    }
}

export async function createSupplyStatus(supplystatus: NewSupplystatus) {
    try {
        return client.sql`
        INSERT INTO "supplystatus" (name)
        VALUES (${supplystatus.name})
        `;
    } catch(error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo crear el supplystatus");
    }
}

export async function dropSupplyStatus(id: number) {
    try {
        return client.sql`
        DELETE FROM "supplystatus"
        WHERE id = ${id}
        `;
    } catch(error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo eliminar el supplystatus");
    }
}

export async function updateSupplyStatus(supplystatus: Supplystatus) {
    try {
        return client.sql`
        UPDATE "supplystatus"
        SET name = ${supplystatus.name}
        WHERE id = ${supplystatus.id}
        `;
    } catch(error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo editar el supplystatus");
    }
}