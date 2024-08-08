import { NextResponse } from "next/server";
import { db } from "@vercel/postgres";
import { createInstance, getAllInstances, searchInstance } from "@/app/queries/abm";

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

export const GET = async (request: Request) => {
    try {
        const url = new URL(request.url);
        const name = url.searchParams.get('name');
        const table = url.searchParams.get('table');

        if (typeof name !== 'string' || typeof table !== 'string') {
            return new NextResponse("Mandastte cualquier parametro loco", { status: 400 });
        }

        await db.connect();

        const query = {
            name,
            table
        };

        let data;

        if (name.trim() === "") {
            try {
                data = await getAllInstances(table);
            } catch (error) {
                console.error("Error recuperando instancias:", error);
                return new NextResponse("Error recuperando instancias", { status: 500 });
            }
        } else {
            try {
                data = await  searchInstance(query)
            } catch (error) {
                console.error("Error buscando datos:", error);
                return new NextResponse("Error buscando datos", { status: 500 });
            }
        } 

        return new NextResponse(JSON.stringify(data), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error("Error manejando GET:", error);
        return new NextResponse("Error manejando GET", { status: 500 });
    }
};