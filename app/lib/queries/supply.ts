import { db } from "@vercel/postgres";
import { editSupplyQuery, fetchedSupply, newSupplyQuery } from "../dtos/supply";

const client = db;

export async function getSupplies(labid: number) {
    try {
        const result = await client.sql`
        SELECT 
            s.id, s.name, s.year, s.description, s.supplytype_id, s.supplystatus_id,
            ss.name AS supplystatus,
            st.name AS supplytype
        FROM "supply" s
        JOIN "supplytype" st ON s.supplytype_id = st.id
        JOIN "supplystatus" ss ON s.supplystatus_id = ss.id
        WHERE s.laboratory_id = ${labid}
        `;
        return result.rows as fetchedSupply[];
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo obtener el supply");
    }
}

export async function getSupplyByName(name: string, labid: number) {
    try {
        const result = await client.sql`
        SELECT 
            s.id, s.name, s.year, s.description, s.supplytype_id, s.supplystatus_id,
            ss.name AS supplystatus,
            st.name AS supplytype
        FROM "supply" s
        JOIN "supplytype" st ON s.supplytype_id = st.id
        JOIN "supplystatus" ss ON s.supplystatus_id = ss.id
        WHERE s.name ILIKE ${`%${name}%`}
            AND s.laboratory_id = ${labid}
        `;
        return result.rows as fetchedSupply[];
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo obtener el supply");
    }
}

export async function createSupply(supply: newSupplyQuery) {
    try {
        return client.sql`
        INSERT INTO "supply" (name, description, year, laboratory_id, supplytype_id, supplystatus_id)
        VALUES (${supply.name}, ${supply.description}, ${supply.year}, ${supply.laboratory_id}, ${supply.supplytype_id}, ${supply.supplystatus_id} )
        `;
    }   catch(error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo crear el supply");
    }
}

export async function editSupply(supply: editSupplyQuery) {
    try {
        return client.sql`
        UPDATE "supply"
        SET name = ${supply.name},
            description = ${supply.description},
            year = ${supply.year},
            supplystatus_id = ${supply.supplystatus_id},
            supplytype_id = ${supply.supplytype_id}
        WHERE id = ${supply.id}
        `;
    } catch(error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo editar el supply");
    }
}

export async function dropSupply(id: number) {
    try {
        return client.sql`
        DELETE FROM "supply"
        WHERE id = ${id}
        `;
    } catch(error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo eliminar el supply");
    }
}
