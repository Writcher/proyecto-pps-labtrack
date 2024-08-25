import { db } from '@vercel/postgres';
import { Usercareer, NewUsercareer } from '../definitions';

const client = db;

export async function getHistoricUserCareers() {
    try {
        const result = await client.sql`
        SELECT * FROM "historicusercareer"
        `;
        return result.rows as Usercareer[];
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo obtener el usercareer");
    }
}

export async function createHistoricUserCareer(historicusercareer: NewUsercareer) {
    try {
        return client.sql`
        INSERT INTO "historicusercareer" (name)
        VALUES (${historicusercareer.name})
        `;
    } catch(error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo crear el usercareer");
    }
}