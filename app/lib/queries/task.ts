import { db } from "@vercel/postgres";
import { calendarTasks, createProjectTaskQuery, deleteTaskQuery, dragTaskQuery, fetchedPageTask } from "../dtos/task";
import { getTaskStatusPending } from "./taskstatus";
import dayjs from "dayjs";

const client = db;

export async function getProjectTasks(project_id: number, page: number) {
    try {
        const limit = 5;
        const offset = (page - 1) * limit;
        const text1 = `
        SELECT
            t.id,
            t.name,
            t.description,
            t.created_at,
            t.start_date AS "start",
            t.end_date AS "end",
            ts.name AS taskstatusname
        FROM "task" t
        JOIN "taskstatus" ts ON t.taskstatus_id = ts.id
        WHERE t.project_id = $1
        ORDER BY created_at DESC
        LIMIT $2 OFFSET $3
        `;
        const values1 = [project_id, limit, offset];
        const result = await client.query(text1, values1);
        const text2 = `
        SELECT COUNT(*) AS total
        FROM "task"
        WHERE project_id = $1
        `;
        const values2 = [project_id];
        const count = await client.query(text2, values2);
        return {
            tasks: result.rows as fetchedPageTask[],
            totalTasks: count.rows[0].total as number,
        };
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo obtener la tarea");
    };
};

export async function getCalendarTasks(id: number, start_date: Date, end_date: Date) {
    try {
        const formatedstart = new Date(start_date).toISOString().split('T')[0];
        const formatedend = new Date(end_date).toISOString().split('T')[0];
        const text = `
        SELECT
            t.id,
            t.name AS title,
            t.start_date AS "start",
            t.end_date AS "end",
            t.description,
            ts.name AS taskstatusname,
            t.created_at
        FROM "task" t
        JOIN "taskstatus" ts ON t.taskstatus_id = ts.id
        WHERE t.project_id = $1
            AND t.start_date BETWEEN $2 AND $3
        `;
        const values = [id, formatedstart, formatedend];
        const result = await client.query(text, values);
        return result.rows as calendarTasks[];
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo obtener la tarea");
    };
};

export async function createTaskProject(params: createProjectTaskQuery) {
    try {
        const statusPending = await getTaskStatusPending() as number;
        const start = dayjs(params.start).tz('America/Argentina/Buenos_Aires').format();
        const end = dayjs(params.end).tz('America/Argentina/Buenos_Aires').format();
        const text = `
        INSERT INTO "task" (name, description, start_date, end_date, project_id, taskstatus_id)
        VALUES ($1, $2, $3, $4, $5, $6)
        `;
        const values = [params.name, params.description, start, end, params.project_id, statusPending];
        await client.query(text, values);
        return { success: true, message: "Instancia creada correctamente" };
    } catch(error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo crear la observacion");
    };
};

export async function dropTask(params: deleteTaskQuery) {
    try {
        const text = `
        DELETE FROM "task" WHERE id = $1
        `;
        const values = [params.id];
        await client.query(text, values);
        return { success: true, message: "Instancia eliminada correctamente" };
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo eliminar la observacion");
    };
};

export async function editDragTask(params: dragTaskQuery) {
    try {
        const startDate = new Date(params.start).toISOString();
        const endDate = new Date(params.end).toISOString();
        const text = `
        UPDATE "task" 
        SET start_date = $2,
            end_date = $3
        WHERE id = $1
        `;
        const values = [params.id, startDate, endDate];
        await client.query(text, values);
        return { success: true, message: "Instancia editada correctamente" };
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo editar la observacion");
    };
};