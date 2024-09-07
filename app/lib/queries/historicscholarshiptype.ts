import { db } from '@vercel/postgres';
import { scholarshipType } from '../dtos/scholarshiptype';
import { createABMItemQuery } from '../dtos/abm';

const client = db;

export async function getHistoricScholarshipTypes() {
    try {
        const text = `
        SELECT * FROM "historicscholarshiptype"
        `;
        const result = await client.query(text);
        return result.rows as scholarshipType[];
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo obtener el historicscholarshiptype");
    }
};

export async function createHistoricScholarshipType(params: createABMItemQuery) {
    try {
        const text = `
        INSERT INTO "historicscholarshiptype" (name)
        VALUES ($1)
        `;
        const values = [params.name];
        await client.query(text, values);
        return { success: true, message: "Instancia creada correctamente" };
    } catch(error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo crear el historicscholarshiptype");
    }
};