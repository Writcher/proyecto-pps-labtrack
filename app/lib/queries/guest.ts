import { db } from '@vercel/postgres';
import { getTypeGuest } from './usertype';
import { GetGuest, NewGuest } from '../definitions';

const client = db;

export async function getGuests(labid: number) {
    try {
        const type = await getTypeGuest();
        const result = await client.sql`
        SELECT u.id, u.name, u.created_at, u.dropped_at, u.email, g.expires_at AS expires_at , us.name AS userstatus
        FROM "user" u
        JOIN "userstatus" us ON u.userstatus_id = us.id
        JOIN "guest" g ON u.id = g.id
        WHERE u.usertype_id = ${type}
        AND u.laboratory_id = ${labid}
        `;
        return result.rows as GetGuest[];
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo obtener el invitado");
    }
}

export async function getGuestsByName(name: string, labid: number) {
    try {
        const type = await getTypeGuest();
        const result = await client.sql`
        SELECT u.id, u.name, u.created_at, u.dropped_at, u.email, g.expires_at AS expires_at , us.name AS userstatus
        FROM "user" u
        JOIN "userstatus" us ON u.userstatus_id = us.id
        JOIN "guest" g ON u.id = g.id
        WHERE u.name ILIKE ${`%${name}%`}
        AND    u.usertype_id = ${type}
        AND u.laboratory_id = ${labid}
        `;
        return result.rows as GetGuest[];
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo obtener el invitado");
    }
}

export async function createGuest(user: NewGuest)  {
    try {
        const date = new Date(user.expires_at);
        const dateExpiration = date.toISOString().split('T')[0];
        const response = await client.sql`
        INSERT INTO "user" (name, email, password, laboratory_id, usertype_id, userstatus_id)
        VALUES (${user.name}, ${user.email}, ${user.password}, ${user.laboratory_id}, ${user.usertype_id}, ${user.userstatus_id})
        RETURNING id
        ;`;
        const id = response.rows[0].id;
        return client.sql`
        INSERT INTO "guest" (id, expires_at)
        VALUES (${id}, ${dateExpiration})
        ;`
    } catch(error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo crear el invitado");
    }
}