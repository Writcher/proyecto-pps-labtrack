import { db } from '@vercel/postgres';
import { Grade, NewGrade } from '../lib/definitions'; 

export async function getGrades() {
    const client = await db.connect();
    try {
        const result = await client.sql`
        SELECT * FROM "grade"
        `;
        return result.rows as Grade[];
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo obtener el grade");
    }
}

export async function getGradeByName(name: string){
    const client = await db.connect();
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

export async function getGradeById(id: number){
    const client = await db.connect();
    try {
        const result = await client.sql`
        SELECT * FROM "grade"
        WHERE id = ${id}
        `;
        return result.rows;
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo obtener el grade");
    }
}

export async function createGrade(grade: NewGrade){
    const client = await db.connect();
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

export async function dropGrade(id: number){
    const client = await db.connect();
    try {
        return client.sql`
        DELETE FROM "grade"
        WHERE id = ${id}
        `;
    } catch(error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo crear el grade");
    }
}

export async function updateGrade(grade: Grade){
    const client = await db.connect();
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