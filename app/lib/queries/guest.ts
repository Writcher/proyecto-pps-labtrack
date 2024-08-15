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

export async function getGuestExpirationDate(id: number) {
    try {
        const response = await client.sql`
        SELECT expires_at
        FROM "guest"
        WHERE id = ${id}
        `;
        const { expires_at } = response.rows[0];
        return new Date(expires_at);
    } catch(error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo encontrar el invitado");
    }
}

export async function createGuest(user: NewGuest)  {
    try {
        const date = new Date(user.expires_at);
        const dateExpiration = date.toISOString().split('T')[0];
        await client.sql`BEGIN`;
        const response = await client.sql`
        INSERT INTO "user" (name, email, password, laboratory_id, usertype_id, userstatus_id)
        VALUES (${user.name}, ${user.email}, ${user.password}, ${user.laboratory_id}, ${user.usertype_id}, ${user.userstatus_id})
        RETURNING id
        ;`;
        const id = response.rows[0].id;
        await client.sql`
        INSERT INTO "guest" (id, expires_at)
        VALUES (${id}, ${dateExpiration})
        ;`
        await client.sql`COMMIT`;
        return { success: true, message: "Instancia creada correctamente" };
    } catch(error) {
        console.error("Error de Base de Datos:", error);
        await client.sql`ROLLBACK`;
        throw new Error("No se pudo crear el invitado");
    }
}

export async function dropGuest(id: number) {
    try {
        await client.sql`BEGIN`;
        await client.sql`
        DELETE FROM "guest"
        WHERE id = ${id}
        `;
        await client.sql`
        DELETE FROM "user"
        WHERE id = ${id}
        `;
        await client.sql`COMMIT`;
        return { success: true, message: "Instancia eliminada correctamente" };
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        await client.sql`ROLLBACK`;
        throw new Error("No se pudo eliminar el invitado");
    }
}

export async function getGuestStatus(id: number) {
    try {
        const result = await client.sql`
        SELECT userstatus_id
        FROM "user"
        WHERE id = ${id}
        `;
        const response = result.rows;
        if (response.length > 0) {
            return response[0].userstatus_id;;
        } else {
            throw new Error("No se encontró el estatus");
        }
    } catch(error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo obtener el status");
    }
}