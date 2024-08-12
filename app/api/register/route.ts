import { NextResponse } from "next/server";
import { createUser } from "@/app/lib/queries/user";
import bcrypt from 'bcryptjs';
import { db } from "@vercel/postgres";

export const POST = async (request: Request) => {
    try {
        const { name, file, email, password, laboratory_id, usertype_id } = await request.json();

        const hashedPassword = await bcrypt.hash(password, 5);
        const userstatus = 2;

        const user = {
            name,
            file,
            email,
            password: hashedPassword,
            laboratory_id,
            usertype_id,
            userstatus_id: userstatus,
        }

        const client = db;
        const existingUserEmail = await client.sql`
        SELECT * FROM "user" WHERE email = ${email} LIMIT 1
        `;    

        if (existingUserEmail.rows.length > 0) {
            return NextResponse.json({ error: 'El correo electrónico ya está en uso.' }, { status: 400 });
        }

        const existingUserFile = await client.sql`
        SELECT * FROM "user" WHERE file = ${file} LIMIT 1
        `;    

        if (existingUserFile.rows.length > 0) {
            return NextResponse.json({ error: 'Ya existe una cuenta con este legajo.' }, { status: 400 });
        }

        try {
            await createUser(user)
        } catch(error) {
            console.error("Error manejando POST:", error);
            return new NextResponse("Error al crear usuario", { status: 500 });
        }

        return NextResponse.json({ status: 201 });
    } catch (error) {
        console.error("Error manejando POST:", error);
        return new NextResponse("Error al crear usuario", { status: 500 });
    }
};