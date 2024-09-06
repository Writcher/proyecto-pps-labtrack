import { db } from '@vercel/postgres';
import { userCareer, newUserCareer } from '../dtos/usercareer';

const client = db;

export async function getUserCareers() {
    try {
        const result = await client.sql`
        SELECT * FROM "usercareer"
        `;
        return result.rows as userCareer[];
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo obtener el usercareer");
    }
}

export async function getUserCareerByName(name: string) {
    try {
        const result = await client.sql`
        SELECT * FROM "usercareer"
        WHERE name ILIKE ${`%${name}%`}
        `;
        return result;
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo obtener el usercareer");
    }
}

export async function createUserCareer(usercareer: newUserCareer) {
    try {
        return client.sql`
        INSERT INTO "usercareer" (name)
        VALUES (${usercareer.name})
        `;
    } catch(error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo crear el usercareer");
    }
}

export async function dropUserCareer(id: number) {
    try {
        return client.sql`
        DELETE FROM "usercareer"
        WHERE id = ${id}
        `;
    } catch(error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo eliminar el usercareer");
    }
}

export async function updateUserCareer(usercareer: userCareer) {
    try {
        return client.sql`
        UPDATE "usercareer"
        SET name = ${usercareer.name}
        WHERE id = ${usercareer.id}
        `;
    } catch(error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo editar el usercareer");
    }
}