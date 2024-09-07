"use server"

import { NextResponse } from "next/server";
import { checkInstanceExistance, createInstance, editInstance, getInstances } from "@/app/lib/abm";
import { createABMQuery, editABMQuery, fetchABMQuery, fetchedABMItem } from "@/app/lib/dtos/abm";

interface APIError {
    name?: string
}

export const POST = async (request: Request) => {
    try {
        const { 
            name,
            table 
        } = await request.json();
        if (typeof name !== 'string' || typeof table !== 'string') {
            return new NextResponse("Parametros no validos", { status: 400 });
        }
        const existingNameInstance = await checkInstanceExistance({table, name});
        const apiError: APIError = {};
        if (existingNameInstance.rows.length > 0) {
            apiError.name = "Instancia ya existe";
        }
        console.log(apiError)
        if (Object.keys(apiError).length > 0) {
            return NextResponse.json(
                { apiError: apiError }, 
                { status: 400 }
            );
        }
        const query = {
            name,
            table
        } as createABMQuery;
        try {
            await createInstance(query)
            return NextResponse.json({ status: 201 });
        } catch(error) {
            console.error("Error al crear instancia:", error);
            return NextResponse.json({ message: "Error al crear instancia" }, { status: 500 })
        } 
    } catch(error) {
        console.error("Error manejando POST:", error);
        return NextResponse.json({ message: "Error procesando la solicitud" }, { status: 500 });
    }
};

export const PUT = async (request: Request) => {
    try {
        const { 
            name,
            id, 
            table 
        } = await request.json();
        if (typeof id !== 'number' || typeof name !== 'string' || typeof table !== 'string') {
            return new NextResponse("Parametros no validos", { status: 400 });
        }
        const existingNameInstance = await checkInstanceExistance({table, name});
        const apiError: APIError = {};
        if (existingNameInstance.rows.length > 0) {
            apiError.name = "Instancia ya existe";
        }
        console.log(apiError)
        if (Object.keys(apiError).length > 0) {
            return NextResponse.json(
                { apiError: apiError }, 
                { status: 400 }
            );
        }
        const query = {
            name,
            id,
            table
        } as editABMQuery;
        try {
            await editInstance(query);
            return NextResponse.json({ status: 200 });
        } catch(error) {
            console.error("Error al editar instancia:", error);
            return NextResponse.json({ message: "Error al editar instancia" }, { status: 500 })
        } 
    } catch(error) {
        console.error("Error manejando PUT:", error);
        return NextResponse.json({ message: "Error procesando la solicitud" }, { status: 500 });
    }
};

export const GET = async (request: Request) => {
    try {
        const url = new URL(request.url);
        const name = url.searchParams.get('name');
        const table = url.searchParams.get('table');
        const pageString = url.searchParams.get('page') as string;
        const rowsPerPageString = url.searchParams.get('rowsPerPage') as string;
        const page = parseInt(pageString, 10);
        const rowsPerPage = parseInt(rowsPerPageString, 10);
        if (typeof name !== 'string' || typeof table !== 'string') {
            return new NextResponse("Parametros no validos", { status: 400 });
        }
        const params = {
            name: name,
            page: page,
            rowsPerPage: rowsPerPage,
            table: table
        } as fetchABMQuery;
        let data: { items: fetchedABMItem[]; totalItems: any; };
        data = await getInstances(params)
        return new NextResponse(JSON.stringify(data), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error("Error manejando GET:", error);
        return new NextResponse("Error manejando GET", { status: 500 });
    }
};