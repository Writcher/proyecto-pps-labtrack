import { NextResponse } from "next/server";
import { db } from "@vercel/postgres";
import { createInstance } from "@/app/queries/abm";

export const POST = async (request: Request) => {
    try {
        const { name, table } = await request.json();

        if (typeof name !== 'string' || typeof table !== 'string') {
            return new NextResponse("Invalid request data", { status: 400 });
        }

        await db.connect();

        const query = {
            name,
            table
        }

        try {
            await createInstance(query)
        } catch(error) {
            console.error("Error manejando POST:", error);
            return new NextResponse("Error al crear instancia", { status: 500 });
        } 
        
        return new NextResponse("Instancia creada", { status: 201 });
    } catch(error) {
        console.error("Error manejando POST:", error);
        return new NextResponse("Error al crear instancia", { status: 500 });
    }
};