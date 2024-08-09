import { db } from '@vercel/postgres';
import { Supplystatus, NewSupplystatus } from '../lib/definitions';

export async function getSupplyStatuses() {
    const client = await db.connect();
    try {
        const result = await client.sql`
        SELECT * FROM "supplystatuses"
        `;
        return result.rows as Supplystatus[];
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo obtener el supplystatus");
    }
}

export async function getSupplyStatusByName(name: string){
    const client = await db.connect();
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

export async function getSupplyStatusById(id: number){
    const client = await db.connect();
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

export async function createSupplyStatus(supplystatus: NewSupplystatus){
    const client = await db.connect();
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

export async function dropSupplyStatus(id: number){
    const client = await db.connect();
    try {
        return client.sql`
        DELETE FROM "supplystatus"
        WHERE id = ${id}
        `;
    } catch(error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo crear el supplystatus");
    }
}

export async function updateSupplyStatus(supplystatus: Supplystatus){
    const client = await db.connect();
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