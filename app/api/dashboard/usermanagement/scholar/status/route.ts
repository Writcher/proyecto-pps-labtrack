import { userChangeStatus } from "@/app/lib/queries/user";
import { NextResponse } from "next/server";

export const PUT = async (request: Request) => {
    try {
        const { id, newStatus } = await request.json();

        if (typeof id !== 'number' || typeof newStatus !== 'number') {
            return new NextResponse("Parametros no validos", { status: 400 });
        }

        try {
            await userChangeStatus(id, newStatus);
        } catch(error) {
            console.error("Error manejando PUT:", error);
            return new NextResponse("Error al editar usuario", { status: 500 });
        } 
        
        return new NextResponse("Instancia editada", { status: 200 });
    } catch(error) {
        console.error("Error manejando PUT:", error);
        return new NextResponse("Error al editar usuario", { status: 500 });
    }
};