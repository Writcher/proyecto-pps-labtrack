import { db } from '@vercel/postgres';
import { projectStatus, newProjectStatus } from '../dtos/projectstatus';

const client = db;

export async function getProjectStatuses() {
    try {
        const result = await client.sql`
        SELECT * FROM "projectstatus"
        `;
        return result.rows as projectStatus[];
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo obtener el projectstatus");
    }
}

export async function getProjectStatusByName(name: string) {
    try {
        const result = await client.sql`
        SELECT * FROM "projectstatus"
        WHERE name ILIKE ${`%${name}%`}
        `;
        return result;
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo obtener el projectstatus");
    }
}

export async function createProjectStatus(projectstatus: newProjectStatus) {
    try {
        return client.sql`
        INSERT INTO "projectstatus" (name)
        VALUES (${projectstatus.name})
        `;
    } catch(error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo crear el projectstatus");
    }
}

export async function dropProjectStatus(id: number) {
    try {
        return client.sql`
        DELETE FROM "projectstatus"
        WHERE id = ${id}
        `;
    } catch(error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo eliminar el projectstatus");
    }
}

export async function updateProjectStatus(projectstatus: projectStatus) {
    try {
        return client.sql`
        UPDATE "projectstatus"
        SET name = ${projectstatus.name}
        WHERE id = ${projectstatus.id}
        `;
    } catch(error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo editar el projectstatus");
    }
}