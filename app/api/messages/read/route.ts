import { readMessage } from '@/app/lib/queries/messages';
import { NextResponse } from 'next/server';

export const PUT = async (request: Request) => {
    try {
        const { sender_id, receiver_id } = await request.json();
        if (typeof sender_id !== 'number' || typeof receiver_id !== 'number' ) {
            return new NextResponse("Parametros no validos", {status: 400});
        }
        try {
            await readMessage(sender_id, receiver_id);
        } catch(error) {
            console.error("Error manejando PUT:", error);
            return new NextResponse("Error al editar usuario", { status: 500 });
        } 
        return NextResponse.json({ status: 200 });
    } catch(error) {
        console.error("Error manejando PUT:", error);
        return new NextResponse("Error al editar mensaje", { status: 500 });
    }
}