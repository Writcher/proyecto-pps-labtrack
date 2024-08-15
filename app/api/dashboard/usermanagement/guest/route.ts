import { GetGuest } from "@/app/lib/definitions";
import { createGuest, dropGuest, getGuests, getGuestsByName, getGuestStatus } from "@/app/lib/queries/guest";
import { getStatusExpired, getStatusPending } from "@/app/lib/queries/userstatus";
import { getTypeGuest } from "@/app/lib/queries/usertype";
import { db } from "@vercel/postgres";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';

export const GET = async (request: Request) => {
    try {
        const url = new URL(request.url);
        const name = url.searchParams.get('name');
        const labidString = url.searchParams.get('labid');

        const labid = labidString ? parseInt(labidString, 10) : undefined

        if (typeof name !== 'string') {
            return new NextResponse("Mandaste cualquier parametro loco", { status: 400 });
        }

        if (labid === undefined) {
            return new NextResponse("labid is required", { status: 400 });
        }

        let data: GetGuest[];

        if (name.trim() === "") {
            try {
                data = await getGuests(labid);
            } catch (error) {
                console.error("Error recuperando instancias:", error);
                return new NextResponse("Error recuperando invitados", { status: 500 });
            }
        } else {
            try {
                data = await  getGuestsByName(name, labid)
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
}

export const POST = async (request: Request) => {
    try {
        const { name,
                email,
                expires_at,
                password,
                laboratory_id } = await request.json();

        if (!name || !email || !expires_at || !password || !laboratory_id) {
            return NextResponse.json({ error: 'Faltan datos requeridos.' }, { status: 400 });
        }
                
        const hashedPassword = await bcrypt.hash(password, 5);

        const userstatus = await getStatusPending() as number;  //cambiar aca si quiero que el estado inicial sea pendiente
        const usertype = await getTypeGuest() as number;

        const client = db;
        const existingUserEmail = await client.sql`
        SELECT * FROM "user" WHERE email = ${email} LIMIT 1
        `;  

        if (existingUserEmail.rows.length > 0) {
            return NextResponse.json({ error: 'El correo electrónico ya está en uso.' }, { status: 400 });
        }

        const user = {
                name,
                email,
                expires_at,
                password: hashedPassword,
                laboratory_id,
                usertype_id: usertype,
                userstatus_id: userstatus,
        }

        try {
            await createGuest(user);
        } catch(error) {
            console.error("Error manejando POST:", error);
            return new NextResponse("Error al crear usuario", { status: 500 });
        }
    
        return NextResponse.json({ status: 201 });
    } catch (error) {
        console.error("Error manejando POST:", error);
        return new NextResponse("Error al crear becario", { status: 500 });
    }
}

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

        if (isExpired === guestStatus) {
            try {
                await dropGuest(id);
                return NextResponse.json({ status: 200 });
            } catch(error) {
                console.error("Error manejando DELETE:", error);
                return NextResponse.json({ error: "Error al eliminar instancia"}, { status: 500 });
            } 
        }
        return NextResponse.json({ error: 'La cuenta no ha expirado.' }, { status: 400 });
    } catch (error) {
        console.error("Error manejando DELETE:", error);
        return NextResponse.json({ error: "Error manejando DELETE." }, { status: 500 });
    }
}
