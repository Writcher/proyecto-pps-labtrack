import { db } from "@vercel/postgres";
import { fetchedMessages, newMessageQuery } from "../dtos/message";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

const client = db;

export async function getMessages(sender_id: number, receiver_id: number) {
    try {
        const result = await client.sql`
        SELECT content, timestamp, sender_id, receiver_id, is_read
        FROM "message"
        WHERE (sender_id = ${sender_id} AND receiver_id = ${receiver_id})
            OR (sender_id = ${receiver_id} AND receiver_id = ${sender_id})
        ORDER BY timestamp ASC
        `;
        return result.rows as fetchedMessages[];
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo obtener el message");
    }
}

export async function createMessage(message: newMessageQuery) {
    try {
        const argentinaTimestamp = dayjs().tz('America/Argentina/Buenos_Aires').format();
        await client.sql`
        INSERT INTO "message" (content, sender_id, receiver_id, timestamp)
        VALUES (${message.content}, ${message.sender_id}, ${message.receiver_id}, ${argentinaTimestamp})
        `;
        return { success: true, message: "Instancia creada correctamente" };
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo crear el message");
    }    
}

export async function readMessage(sender_id: number, receiver_id: number) {
    try {
        await client.sql`
        UPDATE "message"
        SET is_read = true
        WHERE sender_id = ${sender_id} AND receiver_id = ${receiver_id} AND is_read = false
        `;
        return { success: true, message: "Instancia modificada correctamente" };
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo modificar el message");
    }    
}

export async function countUnreadMessages(sender_id: number, receiver_id: number) {
    try {
        const count = await client.sql`
        SELECT COUNT(*) FROM message
        WHERE sender_id = ${sender_id} AND receiver_id = ${receiver_id} AND is_read = false
        `;
        return parseInt(count.rows[0].count, 10);
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo contar los message");
    }    
}

export async function countAllUnreadMessages(receiver_id: number) {
    try {
        const count = await client.sql`
        SELECT COUNT(*) FROM message
        WHERE receiver_id = ${receiver_id} AND is_read = false
        `;
        return parseInt(count.rows[0].count, 10);
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo contar los message");
    }    
}