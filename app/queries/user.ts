import { db } from '@vercel/postgres';
import {NewUser } from "../lib/definitions";



export async function getUserByEmail(email: string) {
    const client = await db.connect();
    try {
        const result = await client.sql`
        SELECT * FROM "user" WHERE email = ${email} LIMIT 1
        `;
        return result.rows[0];
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo obtener el correo");
    }
}

export async function createUser(user: NewUser){
    const client = await db.connect();
    try {
        return client.sql`
        INSERT INTO "user" (name, file, email, password, laboratory_id, usertype_id)
        VALUES (${user.name}, ${user.file}, ${user.email}, ${user.password}, ${user.laboratory_id}, ${user.usertype_id})
        `;
    } catch(error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo crear el usuario");
    }
}