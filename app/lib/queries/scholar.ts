import { db } from "@vercel/postgres";
import { getTypeScholar } from "./usertype";
import { EditScholar, GetScholar, NewScholar } from "../definitions";

const client = db;

export async function getScholars(labid: number) {
    try {
        const type = await getTypeScholar();
        const result = await client.sql`
        SELECT u.id, u.name, u.email, u.created_at, u.dropped_at, 
            us.name AS userstatus, 
            s.file, s.dni, s.address, s.phone, s.careerlevel, s.usercareer_id, s.scholarshiptype_id,
            uc.name AS usercareer, 
            st.name AS scholarshiptype
        FROM "user" u
        JOIN "userstatus" us ON u.userstatus_id = us.id
        JOIN "scholar" s ON u.id = s.id
        JOIN "usercareer" uc ON s.usercareer_id = uc.id
        JOIN "scholarshiptype" st ON s.scholarshiptype_id = st.id
        WHERE u.usertype_id = ${type}
        AND u.laboratory_id = ${labid}
        `;
        return result.rows as GetScholar[];
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo obtener el becario");
    }
}

export async function getScholarByName(name: string, labid: number) {
    try {
        const type = await getTypeScholar();
        const result = await client.sql`
        SELECT u.id, u.name, u.email, u.created_at, u.dropped_at, 
            us.name AS userstatus, 
            s.file, s.dni, s.address, s.phone, s.careerlevel, s.usercareer_id, s.scholarshiptype_id,
            uc.name AS usercareer, 
            st.name AS scholarshiptype
        FROM "user" u
        JOIN "userstatus" us ON u.userstatus_id = us.id
        JOIN "scholar" s ON u.id = s.id
        JOIN "usercareer" uc ON s.usercareer_id = uc.id
        JOIN "scholarshiptype" st ON s.scholarshiptype_id = st.id
        WHERE u.name ILIKE ${`%${name}%`}
            AND u.usertype_id = ${type}
            AND u.laboratory_id = ${labid}
        `;
        return result.rows as GetScholar[];
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo obtener el becario");
    }
}

export async function createScholar(user: NewScholar)  {
    try {
        const response = await client.sql`
        INSERT INTO "user" (name, email, password, laboratory_id, usertype_id, userstatus_id)
        VALUES (${user.name}, ${user.email}, ${user.password}, ${user.laboratory_id}, ${user.usertype_id}, ${user.userstatus_id})
        RETURNING id
        ;`;
        const id = response.rows[0].id;
        return client.sql`
        INSERT INTO "scholar" (id, dni, file, phone, address, careerlevel, usercareer_id, scholarshiptype_id)
        VALUES (${id}, ${user.dni}, ${user.file}, ${user.phone}, ${user.address}, ${user.careerlevel}, ${user.usercareer_id}, ${user.scholarshiptype_id})
        `;
    } catch(error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo crear el becario");
    }
}

export async function editScholar(user: EditScholar) {
    try {
        await client.sql`
            UPDATE "user"
            SET name = ${user.name}
            WHERE id = ${user.id}
        `;
        await client.sql`
            UPDATE "scholar"
            SET file = ${user.file},
                dni = ${user.dni},
                address = ${user.address},
                phone = ${user.phone},
                careerlevel = ${user.careerlevel},
                scholarshiptype_id = ${user.scholarshiptype_id},
                usercareer_id = ${user.usercareer_id}
            WHERE id = ${user.id}
        `;
        return { success: true, message: "Instancia editada correctamente" };
    } catch(error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo editar el becario");
    }
}   