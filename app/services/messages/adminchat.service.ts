"use server"

import { fetchChatUsersData, fetchMessagesData, newMessageQuery, readMessagesData } from "@/app/lib/dtos/message";

export async function fetchChatUsers(data: fetchChatUsersData) {
    try {
        const url = new URL(`${process.env.BASE_URL}/api/messages`);
        url.searchParams.append('labid', data.laboratory_id.toString());
        url.searchParams.append('typeid', data.usertype_id.toString());
        url.searchParams.append('currentid', data.current_id.toString());
        const response = await fetch(url.toString(), {
            method: 'GET',
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const fetchedData = await response.json();
        return fetchedData;
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error en fetchChatData:", error.message);
        } else {
            console.error("Error desconocido");
        }
        return [];
    };
};

export async function fetchChatMessages(data: fetchMessagesData) {
    try {
        const url = new URL(`${process.env.BASE_URL}/api/messages/chat`);
        url.searchParams.append('senderid', data.sender_id.toString());
        url.searchParams.append('receiverid', data.receiver_id.toString());
        const response = await fetch(url.toString(), {
            method: 'GET',
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const fetchedData = await response.json();
        return fetchedData;
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error en fetchChatMessages:", error.message);
        } else {
            console.error("Error desconocido");
        }
        return [];
    };
};

export async function setMessagesAsRead(data: readMessagesData) {
    try {
        const response = await fetch(`${process.env.BASE_URL}/api/messages/read`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error("Error al actualizar los mensajes como leídos");
        }
        return { success: true };
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error en setMessagesAsRead:", error.message);
        } else {
            console.error("Error desconocido");
        }
    };
};

export async function sendMessage(data: newMessageQuery) {
    try {  
        const response = await fetch(`${process.env.BASE_URL}/api/messages/chat`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error("Error al enviar el mensaje");
        }
        return { success: true };
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error en sendMessage:", error.message);
        } else {
            console.error("Error desconocido");
        }
    };
};