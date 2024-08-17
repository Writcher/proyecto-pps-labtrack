import { GetMessages } from "@/app/lib/definitions";
import { createMessage, getMessages } from "@/app/lib/queries/messages";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
    try {
        const url = new URL(request.url);
        const senderidString = url.searchParams.get('senderid');
        const receiveridString = url.searchParams.get('receiverid');

        const sender_id = senderidString ? parseInt(senderidString, 10) : undefined;
        const receiver_id = receiveridString ? parseInt(receiveridString, 10) : undefined;

        if (typeof sender_id !== 'number' || typeof receiver_id !== 'number') {
            return new NextResponse("Mandaste cualquier parametro loco", { status: 400 });
        }

        let data: GetMessages[];

        try {
            data = await getMessages(sender_id, receiver_id);
        } catch (error) {
            console.error("Error recuperando instancias:", error);
            return new NextResponse("Error recuperando becarios", { status: 500 });
        }

        return new NextResponse(JSON.stringify(data), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error("Error manejando GET:", error);
        return new NextResponse("Error manejando GET", { status: 500 });
    }
}

export const POST = async (request: Request) => {
    try {
        const { content,
                receiver_id,
                sender_id } = await request.json();

        if (!content || !receiver_id || !sender_id ) {
            return NextResponse.json({ error: 'Faltan datos requeridos.' }, { status: 400 });
        }
    
        const message = {
            content,
            receiver_id,
            sender_id
        }

        try {
            await createMessage(message);
        } catch(error) {
            console.error("Error manejando POST:", error);
            return new NextResponse("Error al crear supply", { status: 500 });
        }
    
        return NextResponse.json({ status: 201 });
    } catch (error) {
        console.error("Error manejando POST:", error);
        return new NextResponse("Error al crear supply", { status: 500 });
    }
}