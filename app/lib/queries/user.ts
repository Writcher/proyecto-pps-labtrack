import { db } from '@vercel/postgres';
import { newUserQuery, user } from '../dtos/user';
import { getTypeAdmin } from './usertype';
import { fetchedChatUser } from '../dtos/message';

const client = db;

export async function getUserByEmail(email: string) {
    try {
        const text = `
        SELECT * FROM "user" WHERE email = $1 LIMIT 1
        `;
        const values = [email];
        const result = await client.query(text, values);
        const user = result.rows[0];
        if (user) {
            return {
                ...user,
                id: user.id.toString(), // Convert ID to string
            } as user;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo obtener el correo");
    };
};

export async function createUser(user: newUserQuery) {
    try {
        const text = `
        INSERT INTO "user" (name, email, password, laboratory_id, usertype_id, userstatus_id)
        VALUES ($1, $2, $3, $4, $5, $6)
        `;
        const values = [user.name, user.email, user.password, user.laboratory_id, user.usertype_id, user.userstatus_id];
        return client.query(text, values);
    } catch(error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo crear el usuario");
    };
};

export async function verifyUserEmail(email: string, status: number) {
    try {
        const date = new Date;
        const dateVerified = date.toISOString().split('T')[0];
        const text = `
            UPDATE "user"
            SET emailverified = $1,
                userstatus_id = $2
            WHERE email = $3
        `;
        const values = [dateVerified, status, email];
        return client.query(text, values);
    } catch(error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo editar el usuario");
    };
};

export async function userChangeStatus(id: number, newStatus: number, ) {
    try {
        const date = new Date;
        const dateDeactivated = date.toISOString().split('T')[0];
        const text = `
        UPDATE "user"
        SET dropped_at = $1, userstatus_id = $2
        WHERE id = $3
        `;
        const values = [dateDeactivated, newStatus, id];
        return client.query(text, values);
    } catch(error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo editar el user");
    };
};

export async function getAdmins(labid: number) {
    try {
        const type = await getTypeAdmin();
        const text = `
        SELECT u.id, u.name
        FROM "user" u
        WHERE u.usertype_id = $1
            AND u.laboratory_id = $2
        `;
        const values = [type, labid];
        const result = await client.query(text, values);
        return result.rows as fetchedChatUser[];
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo obtener el becario");
    };
};