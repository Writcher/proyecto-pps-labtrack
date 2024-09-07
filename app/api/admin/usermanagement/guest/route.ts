"use server"

import { fetchedGuest, fetchGuestQuery, newGuestQuery } from "@/app/lib/dtos/guest";
import { createGuest, dropGuest, getGuestsTable, getGuestStatus } from "@/app/lib/queries/guest";
import { getStatusExpired, getStatusPending } from "@/app/lib/queries/userstatus";
import { getTypeGuest } from "@/app/lib/queries/usertype";
import { db } from "@vercel/postgres";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';

interface APIError {
    email?: string;
    message?: string;
}

export const GET = async (request: Request) => {
    try {
        const url = new URL(request.url);
        const name = url.searchParams.get('name');
        const sortcolumn = url.searchParams.get('sortcolumn') as string;
        const sortdirection = url.searchParams.get('sortdirection') as string;
        const pageString = url.searchParams.get('page') as string;
        const rowsPerPageString = url.searchParams.get('rowsPerPage') as string;
        const labidString = url.searchParams.get('labid') as string;
        const page = parseInt(pageString, 10);
        const rowsPerPage = parseInt(rowsPerPageString, 10);
        const labid = parseInt(labidString, 10);
        if (typeof name !== 'string') {
            return new NextResponse("Mandaste cualquier parametro loco", { status: 400 });
        }
        if (labid === undefined) {
            return new NextResponse("labid es necesario.", { status: 400 });
        }
        const params = {
            search: name,
            laboratory_id: labid,
            sortColumn: sortcolumn,
            sortDirection: sortdirection,
            page: page,
            rowsPerPage: rowsPerPage,
        } as fetchGuestQuery;
        let data: { guests: fetchedGuest[]; totalGuests: any; };
        data = await getGuestsTable(params);
        return new NextResponse(JSON.stringify(data), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error("Error manejando GET:", error);
        return new NextResponse("Error manejando GET", { status: 500 });
    }
};

export const POST = async (request: Request) => {
    try {
        const {
            name,
            email,
            expires_at,
            password,
            laboratory_id
        } = await request.json();
        if (!name || !email || !expires_at || !password || !laboratory_id) {
            return NextResponse.json({ error: 'Faltan datos requeridos.' }, { status: 400 });
        }  
        const hashedPassword = await bcrypt.hash(password, 5);
        const userstatus = await getStatusPending() as number;
        const usertype = await getTypeGuest() as number;
        const user = {
            name,
            email,
            expires_at,
            password: hashedPassword,
            laboratory_id,
            usertype_id: usertype,
            userstatus_id: userstatus,
        } as newGuestQuery;
        const client = db;
        const text1 = `
            SELECT * FROM "user" WHERE email = $1 LIMIT 1
        `;    
        const values1 = [email];
        const existingUserEmail = await client.query(text1, values1);
        const apiError: APIError = {};
        if (existingUserEmail.rows.length > 0) {
            apiError.email = "Email en uso";
        }
        if (Object.keys(apiError).length > 0) {
            return NextResponse.json(
                { apiError: apiError }, 
                { status: 400 }
            );
        }
        try {
            await createGuest(user);
            return NextResponse.json({ status: 201 });
        } catch(error) {
            console.error("Error al crear Invitado:", error);
            return NextResponse.json({ message: "Error al crear invitado" }, { status: 500 })
        }
    } catch (error) {
        console.error("Error manejando POST:", error);
        return NextResponse.json({ message: "Error procesando la solicitud" }, { status: 500 });
    }
};

export const DELETE = async (request: Request) => {
    try {
        const url = new URL(request.url);
        const idStr = url.searchParams.get('id');
        const id = idStr ? parseInt(idStr, 10) : null;
        if (typeof id !== 'number') {
            return NextResponse.json({ error: "Mandaste cualquier parametro loco"}, { status: 400 });
        }
        const isExpired = await getStatusExpired();
        const guestStatus = await getGuestStatus(id);
        const apiError: APIError = {};
        if (isExpired !== guestStatus) {
            apiError.message = "El invitado no ha expirado";
        }
        if (Object.keys(apiError).length > 0) {
            return NextResponse.json(
                { apiError: apiError }, 
                { status: 400 }
            );
        }
        try {
            await dropGuest(id);
            return NextResponse.json({ status: 200 });
        } catch(error) {
            console.error("Error al eliminar Invitado:", error);
            return NextResponse.json({ message: "Error al eliminar invitado" }, { status: 500 })
        }
    } catch (error) {
        console.error("Error manejando DELETE:", error);
        return NextResponse.json({ error: "Error manejando DELETE." }, { status: 500 });
    }
};
