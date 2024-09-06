import { db } from "@vercel/postgres";
import { getTypeScholar } from "./usertype";
import { editScholarQuery, fetchedScholar, newScholarQuery } from "../dtos/scholar";

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
        return result.rows as fetchedScholar[];
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo obtener el becario");
    }
}

export async function getScholarsByScholarship(labid: number, scholarship: number) {
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
        AND s.scholarshiptype_id = ${scholarship}
        `;
        return result.rows as fetchedScholar[];
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo obtener el becario");
    }
}

export async function getScholarsByUserCareer(labid: number, userCareer: number) {
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
        AND s.usercareer_id = ${userCareer}
        `;
        return result.rows as fetchedScholar[];
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo obtener el becario");
    }
}

export async function getScholarsByScholarshipAndUserCareer(labid: number, scholarship: number, userCareer: number) {
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
        AND s.scholarshiptype_id = ${scholarship}
        AND s.usercareer_id = ${userCareer}
        `;
        return result.rows as fetchedScholar[];
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
        WHERE unaccent(u.name) ILIKE unaccent(${`%${name}%`})
            AND u.usertype_id = ${type}
            AND u.laboratory_id = ${labid}
        `;
        return result.rows as fetchedScholar[];
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo obtener el becario");
    }
}

export async function getScholarByNameAndScholarship(name: string, labid: number, scholarship: number) {
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
        WHERE unaccent(u.name) ILIKE unaccent(${`%${name}%`})
            AND u.usertype_id = ${type}
            AND u.laboratory_id = ${labid}
            AND s.scholarshiptype_id = ${scholarship}
        `;
        return result.rows as fetchedScholar[];
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo obtener el becario");
    } 
}

export async function getScholarByNameAndUserCareer(name: string, labid: number, userCareer: number) {
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
        WHERE unaccent(u.name) ILIKE unaccent(${`%${name}%`})
            AND u.usertype_id = ${type}
            AND u.laboratory_id = ${labid}
            AND s.usercareer_id = ${userCareer}
        `;
        return result.rows as fetchedScholar[];
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo obtener el becario");
    } 
}

export async function getScholarByNameAndScholarshipAndUserCareer(name: string, labid: number, scholarship: number, userCareer: number) {
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
        WHERE unaccent(u.name) ILIKE unaccent(${`%${name}%`})
            AND u.usertype_id = ${type}
            AND u.laboratory_id = ${labid}
            AND s.usercareer_id = ${userCareer}
            AND s.scholarshiptype_id = ${scholarship}
        `;
        return result.rows as fetchedScholar[];
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo obtener el becario");
    } 
}

export async function createScholar(user: newScholarQuery)  {
    try {
        await client.sql`BEGIN`;
        const response = await client.sql`
        INSERT INTO "user" (name, email, password, laboratory_id, usertype_id, userstatus_id)
        VALUES (${user.name}, ${user.email}, ${user.password}, ${user.laboratory_id}, ${user.usertype_id}, ${user.userstatus_id})
        RETURNING id
        ;`;
        const id = response.rows[0].id;
        await client.sql`
        INSERT INTO "scholar" (id, dni, file, phone, address, careerlevel, usercareer_id, scholarshiptype_id)
        VALUES (${id}, ${user.dni}, ${user.file}, ${user.phone}, ${user.address}, ${user.careerlevel}, ${user.usercareer_id}, ${user.scholarshiptype_id})
        `;
        await client.sql`COMMIT`;
        return { success: true, message: "Instancia creada correctamente" };
    } catch(error) {
        console.error("Error de Base de Datos:", error);
        await client.sql`ROLLBACK`;
        throw new Error("No se pudo crear el becario");
    }
}

export async function editScholar(user: editScholarQuery) {
    try {
        await client.sql`BEGIN`;
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
        await client.sql`COMMIT`;
        return { success: true, message: "Instancia editada correctamente" };
    } catch(error) {
        console.error("Error de Base de Datos:", error);
        await client.sql`ROLLBACK`;
        throw new Error("No se pudo editar el becario");
    }
}   