import { db } from "@vercel/postgres";
import { editSupplyQuery, fetchedSupply, newSupplyQuery } from "../dtos/supply";

const client = db;

export async function getSupplies(labid: number) {
    try {
        const text = `
        SELECT 
            s.id, s.name, s.year, s.description, s.supplytype_id, s.supplystatus_id,
            ss.name AS supplystatus,
            st.name AS supplytype
        FROM "supply" s
        JOIN "supplytype" st ON s.supplytype_id = st.id
        JOIN "supplystatus" ss ON s.supplystatus_id = ss.id
        WHERE s.laboratory_id = $1
        `;
        const values = [labid];
        const result = await client.query(text, values);
        return result.rows as fetchedSupply[];
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo obtener el supply");
    };
};

export async function getSupplyByName(name: string, labid: number) {
    try {
        const text = `
        SELECT 
            s.id, s.name, s.year, s.description, s.supplytype_id, s.supplystatus_id,
            ss.name AS supplystatus,
            st.name AS supplytype
        FROM "supply" s
        JOIN "supplytype" st ON s.supplytype_id = st.id
        JOIN "supplystatus" ss ON s.supplystatus_id = ss.id
        WHERE s.name ILIKE $1
            AND s.laboratory_id = $1
        `;
        const namefinal = '%' + name + '%';
        const values = [namefinal, labid];
        const result = await client.query(text, values);
        return result.rows as fetchedSupply[];
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo obtener el supply");
    };
};

export async function createSupply(supply: newSupplyQuery) {
    try {
        const text = `
        INSERT INTO "supply" (name, description, year, laboratory_id, supplytype_id, supplystatus_id)
        VALUES ($1, $2, $3, $4, $5, $6)
        `;
        const values = [supply.name, supply.description, supply.year, supply.laboratory_id, supply.supplytype_id, supply.supplystatus_id];
        return client.query(text, values);
    }   catch(error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo crear el supply");
    };
};

export async function editSupply(supply: editSupplyQuery) {
    try {
        const text = `
        UPDATE "supply"
        SET name = $1,
            description = $2,
            year = $3,
            supplystatus_id = $4,
            supplytype_id = $5
        WHERE id = $6
        `;
        const values = [supply.name, supply.description, supply.year, supply.supplystatus_id, supply.supplytype_id, supply.id];
        return client.query(text, values);
    } catch(error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo editar el supply");
    };
};

export async function dropSupply(id: number) {
    try {
        const text = `
        DELETE FROM "supply"
        WHERE id = $1
        `;
        const values = [id];
        return client.query(text, values);
    } catch(error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo eliminar el supply");
    };
};
