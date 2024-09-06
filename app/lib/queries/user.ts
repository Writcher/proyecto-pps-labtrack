import { db } from '@vercel/postgres';
import { newUserQuery, User, fetchedAdmin } from '../dtos/user';
import { getTypeAdmin } from './usertype';

const client = db;

export async function getUserByEmail(email: string) {
    try {
        const result = await client.sql`
        SELECT * FROM "user" WHERE email = ${email} LIMIT 1
        `;
        const user = result.rows[0];
        if (user) {
            return {
                ...user,
                id: user.id.toString(), // Convert ID to string
            } as User;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo obtener el correo");
    }
}

export async function createUser(user: newUserQuery) {
    try {
        return client.sql`
        INSERT INTO "user" (name, email, password, laboratory_id, usertype_id, userstatus_id)
        VALUES (${user.name}, ${user.email}, ${user.password}, ${user.laboratory_id}, ${user.usertype_id}, ${user.userstatus_id})
        `;
    } catch(error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo crear el usuario");
    }
}

export async function verifyUserEmail(email: string, status: number) {
    try {
        const date = new Date;
        const dateVerified = date.toISOString().split('T')[0];
        return client.sql`
            UPDATE "user"
            SET emailverified = ${dateVerified},
                userstatus_id = ${status}
            WHERE email = ${email}
        `;
    } catch(error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo editar el usuario");
    }
}

export async function userChangeStatus(id: number, newStatus: number, ) {
    try {
        const date = new Date;
        const dateDeactivated = date.toISOString().split('T')[0];
        return client.sql`
        UPDATE "user"
        SET dropped_at = ${dateDeactivated}, userstatus_id = ${newStatus}
        WHERE id = ${id}
        `;
    } catch(error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo editar el user");
    }
}

export async function getAdmins(labid: number) {
    try {
        const type = await getTypeAdmin();
        const result = await client.sql`
        SELECT id, name 
        FROM "user"
        WHERE usertype_id = ${type}
        AND laboratory_id = ${labid}
        `;
        return result.rows as fetchedAdmin[];
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo obtener el becario");
    }
}