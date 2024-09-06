import { db } from '@vercel/postgres';
import { grade, newGrade } from '../dtos/grade';

const client = db;

export async function getGrades() {
    try {
        const result = await client.sql`
        SELECT * FROM "grade"
        `;
        return result.rows as grade[];
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo obtener el grade");
    }
}

export async function getGradeByName(name: string) {
    try {
        const result = await client.sql`
        SELECT * FROM "grade"
        WHERE name ILIKE ${`%${name}%`}
        `;
        return result;
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo obtener el grade");
    }
}

export async function createGrade(grade: newGrade) {
    try {
        return client.sql`
        INSERT INTO "grade" (name)
        VALUES (${grade.name})
        `;
    } catch(error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo crear el grade");
    }
}

export async function dropGrade(id: number) {
    try {
        return client.sql`
        DELETE FROM "grade"
        WHERE id = ${id}
        `;
    } catch(error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo eliminar el grade");
    }
}

export async function updateGrade(grade: grade) {

    try {
        return client.sql`
        UPDATE "grade"
        SET name = ${grade.name}
        WHERE id = ${grade.id}
        `;
    } catch(error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo editar el grade");
    }
}