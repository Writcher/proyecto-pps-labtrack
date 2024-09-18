import { userChangeStatus } from "@/app/lib/queries/user";
import { getStatusDeactivated } from "@/app/lib/queries/userstatus";
import { NextResponse } from "next/server";

export const PUT = async (request: Request) => {
    try {
        const id = await request.json();
        const newStatus = await getStatusDeactivated();
        if (typeof id !== 'number' || typeof newStatus !== 'number') {
            return new NextResponse("Parametros no validos", { status: 400 });
        }
        try {
            await userChangeStatus(id, newStatus);
            return NextResponse.json({ status: 200 });
        } catch(error) {
            console.error("Error al editar Becario:", error);
            return NextResponse.json({ message: "Error al editar becario" }, { status: 500 })
        } 
    } catch(error) {
        console.error("Error manejando PUT:", error);
        return new NextResponse("Error al editar usuario", { status: 500 });
    }
};

//añadir para revisar si el becario esta en algun proyecto antes de deshabilitar