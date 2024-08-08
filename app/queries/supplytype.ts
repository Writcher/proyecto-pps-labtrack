import { db } from '@vercel/postgres';
import { Supplytype, NewSupplytype } from '../lib/definitions';

export async function getSupplyTypes() {
    const client = await db.connect();
    try {
        const result = await client.sql`
        SELECT * FROM "supplytype"
        `;
        return result.rows as Supplytype[];
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo obtener el supplytype");
    }
}

export async function getSupplyTypeByName(name: string){
    const client = await db.connect();
    try {
        const result = await client.sql`
        SELECT * FROM "supplytype"
        WHERE name = ${name}
        `;
        return result.rows;
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo obtener el supplytype");
    }
}


export async function getSupplyTypeById(id: number){
    const client = await db.connect();
    try {
        const result = await client.sql`
        SELECT * FROM "supplytype"
        WHERE id = ${id}
        `;
        return result.rows;
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo obtener el supplytype");
    }
}

export async function createSupplyType(supplytype: NewSupplytype){
    const client = await db.connect();
    try {
        return client.sql`
        INSERT INTO "supplytype" (name)
        VALUES (${supplytype.name})
        `;
    } catch(error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo crear el supplytype");
    }
}

export async function dropSupplyType(id: number){
    const client = await db.connect();
    try {
        return client.sql`
        DELETE FROM "supplytype"
        WHERE id = ${id}
        `;
    } catch(error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo crear el supplytype");
    }
}

export async function updateSupplyType(id: number, supplytype: NewSupplytype){
    const client = await db.connect();
    try {
        return client.sql`
        UPDATE "supplytype"
        SET (name = ${supplytype.name})
        WHERE id = ${id}
        `;
    } catch(error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo crear el supplytype");
    }
}