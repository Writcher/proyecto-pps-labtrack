import { db } from '@vercel/postgres';
import { EditUserScholar, NewUser, User, UserGetGuest, UserGetScholar, } from "../definitions";
import { getTypeGuest, getTypeScholar } from './usertype';
import { getStatusActive } from './userstatus';

const client = db;

export async function getScholars(labid: number) {
    try {
        const type = await getTypeScholar();
        const result = await client.sql`
        SELECT u.id, u.scholarshiptype_id, u.usercareer_id, u.name, u.file, u.dni, u.address, u.phone, u.careerlevel, u.created_at, u.deactivated_at, u.email, uc.name AS usercareer, us.name AS userstatus, st.name AS scholarshiptype
        FROM "user" u
        JOIN "usercareer" uc ON u.usercareer_id = uc.id
        JOIN "userstatus" us ON u.userstatus_id = us.id
        JOIN "scholarshiptype" st ON u.scholarshiptype_id = st.id
        WHERE u.usertype_id = ${type}
        AND u.laboratory_id = ${labid}
        `;
        return result.rows as UserGetScholar[];
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo obtener el becario");
    }
}

export async function getScholarByName(name: string, labid: number) {
    try {
        const type = await getTypeScholar();
        const result = await client.sql`
            SELECT u.id, u.scholarshiptype_id, u.usercareer_id, u.name, u.file, u.dni, u.address, u.phone, u.careerlevel, u.created_at, u.deactivated_at, u.email, uc.name AS usercareer, us.name AS userstatus, st.name AS scholarshiptype
            FROM "user" u
            JOIN "usercareer" uc ON u.usercareer_id = uc.id
            JOIN "userstatus" us ON u.userstatus_id = us.id
            JOIN "scholarshiptype" st ON u.scholarshiptype_id = st.id
            WHERE u.name ILIKE ${`%${name}%`}
                AND u.usertype_id = ${type}
                AND u.laboratory_id = ${labid}
        `;
        return result.rows as UserGetScholar[];
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo obtener el becario");
    }
}

export async function createScholar(user: NewUser)  {
    try {
        return client.sql`
        INSERT INTO "user" (name, file, dni, address, phone, careerlevel, email, password, laboratory_id, usertype_id, userstatus_id, scholarshiptype_id, usercareer_id)
        VALUES (${user.name}, ${user.file}, ${user.dni}, ${user.address}, ${user.phone}, ${user.careerlevel}, ${user.email}, ${user.password}, ${user.laboratory_id}, ${user.usertype_id}, ${user.userstatus_id}, ${user.scholarshiptype_id}, ${user.usercareer_id})
        `;
    } catch(error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo crear el usuario");
    }
}

export async function editScholar(user: EditUserScholar) {
    try {
        return client.sql`
        UPDATE "user"
        SET name = ${user.name},
            file = ${user.file},
            dni = ${user.dni},
            address = ${user.address},
            phone = ${user.phone},
            careerlevel = ${user.careerlevel},
            scholarshiptype_id = ${user.scholarshiptype_id},
            usercareer_id = ${user.usercareer_id}
        WHERE id = ${user.id}
        `;
    } catch(error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo editar el user");
    }
}   

export async function getGuests(labid: number) {
    try {
        const type = await getTypeGuest();
        const result = await client.sql`
        SELECT u.id, u.name, u.created_at, u.deactivated_at, u.email, vt.date_from AS date_from, vt.date_until AS date_until, us.name AS userstatus,
        FROM "user" u
        JOIN "userstatus" us ON u.userstatus_id = us.id
        JOIN "validitytime" vt ON u.validitytime_id = vt.id
        WHERE u.usertype_id = ${type}
        AND u.laboratory_id = ${labid}
        `;
        return result.rows as UserGetGuest[];
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo obtener el becario");
    }
}

export async function getGuestsByName(name: string, labid: number) {
    try {
        const type = await getTypeGuest();
        const result = await client.sql`
        SELECT u.id, u.name, u.created_at, u.deactivated_at, u.email, vt.date_from AS date_from, vt.date_until AS date_until, us.name AS userstatus,
        FROM "user" u
        JOIN "userstatus" us ON u.userstatus_id = us.id
        JOIN "validitytime" vt ON u.validitytime_id = vt.id
        WHERE u.name ILIKE ${`%${name}%`}
        AND    u.usertype_id = ${type}
        AND u.laboratory_id = ${labid}
        `;
        return result.rows as UserGetGuest[];
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo obtener el becario");
    }
}

export async function getUserByEmail(email: string) {
    try {
        const result = await client.sql`
        SELECT id, password, email, userstatus_id, validitytime_id, emailVerified FROM "user" WHERE email = ${email} LIMIT 1
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

export async function createUser(user: NewUser) {
    try {
        return client.sql`
        INSERT INTO "user" (name, file, email, password, laboratory_id, usertype_id, userstatus_id)
        VALUES (${user.name}, ${user.file}, ${user.email}, ${user.password}, ${user.laboratory_id}, ${user.usertype_id}, ${user.userstatus_id})
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
            SET emailVerified = ${dateVerified},
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
        SET deactivated_at = ${dateDeactivated}, userstatus_id = ${newStatus}
        WHERE id = ${id}
        `;
    } catch(error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo editar el user");
    }
}