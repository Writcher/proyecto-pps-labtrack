import { db } from '@vercel/postgres';
import { Projecttype, NewProjecttype } from '../definitions';

const client = db;

export async function getProjectTypes() {
    try {
        const result = await client.sql`
        SELECT * FROM "projecttype"
        `;
        return result.rows as Projecttype[];
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo obtener el projecttype");
    }
}

export async function getProjectTypeByName(name: string) {
    try {
        const result = await client.sql`
        SELECT * FROM "projecttype"
        WHERE name ILIKE ${`%${name}%`}
        `;
        return result;
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo obtener el projecttype");
    }
}

export async function createProjectType(projecttype: NewProjecttype) {
    try {
        return client.sql`
        INSERT INTO "projecttype" (name)
        VALUES (${projecttype.name})
        `;
    } catch(error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo crear el projecttype");
    }
}

export async function dropProjectType(id: number) {
    try {
        return client.sql`
        DELETE FROM "projecttype"
        WHERE id = ${id}
        `;
    } catch(error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo eliminar el projecttype");
    }
}

export async function updateProjectType(projecttype: Projecttype) {
    try {
        return client.sql`
        UPDATE "projecttype"
        SET name = ${projecttype.name}
        WHERE id = ${projecttype.id}
        `;
    } catch(error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo editar el projecttype");
    }
}