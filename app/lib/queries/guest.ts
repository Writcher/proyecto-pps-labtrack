import { db } from '@vercel/postgres';
import { getTypeGuest } from './usertype';
import { GetGuest } from '../definitions';

const client = db;

export async function getGuests(labid: number) {
    try {
        const type = await getTypeGuest();
        const result = await client.sql`
        SELECT u.id, u.name, u.created_at, u.dropped_at, u.email, g.expires_at AS expires_at , us.name AS userstatus,
        FROM "user" u
        JOIN "userstatus" us ON u.userstatus_id = us.id
        JOIN "guest" g ON u.id = g.id
        WHERE u.usertype_id = ${type}
        AND u.laboratory_id = ${labid}
        `;
        return result.rows as GetGuest[];
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo obtener el becario");
    }
}

export async function getGuestsByName(name: string, labid: number) {
    try {
        const type = await getTypeGuest();
        const result = await client.sql`
        SELECT u.id, u.name, u.created_at, u.dropped_at, u.email, g.expires_at AS expires_at , us.name AS userstatus,
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
        throw new Error("No se pudo obtener el becario");
    }
}