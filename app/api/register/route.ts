import { NextResponse } from "next/server";
import { createUser } from "@/app/queries/user";
import bcrypt from "bcrypt";
import { NewUser } from "@/app/lib/definitions";
import { db } from "@vercel/postgres";

export const POST = async (request: Request) => {
    try {
        const { name, file, email, password, laboratory_id, usertype_id } = await request.json();

        await db.connect();

        const hashedPassword = await bcrypt.hash(password, 5);

        const user = {
            name,
            file,
            email,
            password: hashedPassword,
            laboratory_id,
            usertype_id
        }

        try {
            await createUser(user)
        } catch(error) {
            console.error("Error handling POST request:", error);
            return new NextResponse("Error al crear usuario", { status: 500 });
        }

        return new NextResponse("Usuario creado", { status: 201 });
    } catch (error) {
        console.error("Error handling POST request:", error);
        return new NextResponse("Error al crear usuario", { status: 500 });
    }
};