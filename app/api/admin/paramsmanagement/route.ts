import { NextResponse } from "next/server";
import { createInstance, editInstance, getAllInstances, searchInstance } from "@/app/lib/abm";

export const POST = async (request: Request) => {
    try {
        const { 
            name,
            table 
        } = await request.json();
        if (typeof name !== 'string' || typeof table !== 'string') {
            return new NextResponse("Parametros no validos", { status: 400 });
        }
        const query = {
            name,
            table
        }
        try {
            await createInstance(query)
            return NextResponse.json({ status: 201 });
        } catch(error) {
            console.error("Error al crear Item:", error);
            return new NextResponse("Error al crear Item", { status: 500 });
        } 
    } catch(error) {
        console.error("Error manejando POST:", error);
        return new NextResponse("Error al crear instancia", { status: 500 });
    }
};

export const PUT = async (request: Request) => {
    try {
        const { name, id, table } = await request.json();

        if (typeof id !== 'number' || typeof name !== 'string' || typeof table !== 'string') {
            return new NextResponse("Parametros no validos", { status: 400 });
        }

        const query = {
            name,
            id,
            table
        }

        try {
            await editInstance(query)
        } catch(error) {
            console.error("Error manejando PUT:", error);
            return new NextResponse("Error al editar instancia", { status: 500 });
        } 
        
        return new NextResponse("Instancia editada", { status: 200 });
    } catch(error) {
        console.error("Error manejando PUT:", error);
        return new NextResponse("Error al editar instancia", { status: 500 });
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