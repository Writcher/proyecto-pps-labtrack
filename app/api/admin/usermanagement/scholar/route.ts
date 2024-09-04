import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import { db } from "@vercel/postgres";
import { getStatusPending } from "@/app/lib/queries/userstatus";
import { getTypeScholar } from "@/app/lib/queries/usertype";
import { GetScholar } from "@/app/lib/definitions";
import { createScholar, editScholar, getScholarByName, getScholarByNameAndScholarship, getScholarByNameAndScholarshipAndUserCareer, getScholarByNameAndUserCareer, getScholars, getScholarsByScholarship, getScholarsByScholarshipAndUserCareer, getScholarsByUserCareer } from "@/app/lib/queries/scholar";

interface APIErrors {
    dni?: string,
    file?: string,
    email?: string,
}

export const GET = async (request: Request) => {
    try {
        const url = new URL(request.url);
        const name = url.searchParams.get('name');
        const labidString = url.searchParams.get('labid');
        const scholarshipString = url.searchParams.get('scholarship');
        const userCareerString = url.searchParams.get('usercareer');

        const labid = labidString ? parseInt(labidString, 10) : undefined;
        const scholarship = scholarshipString ? parseInt(scholarshipString, 10) : undefined;
        const userCareer = userCareerString ? parseInt(userCareerString, 10) : undefined;

        if (typeof name !== 'string') {
            return new NextResponse("Mandaste cualquier parametro loco", { status: 400 });
        }

        if (labid === undefined) {
            return new NextResponse("labid is required", { status: 400 });
        }

        let data: GetScholar[];

        if (name.trim() === "") {
            if (scholarship !== undefined && userCareer !== undefined) {
                data = await getScholarsByScholarshipAndUserCareer(labid, scholarship, userCareer);
            } else if (scholarship !== undefined) {
                data = await getScholarsByScholarship(labid, scholarship);
            } else if (userCareer !== undefined) {
                data = await getScholarsByUserCareer(labid, userCareer);
            } else {
                data = await getScholars(labid);
            }
        } else {
            if (scholarship !== undefined && userCareer !== undefined) {
                data = await getScholarByNameAndScholarshipAndUserCareer(name, labid, scholarship, userCareer);
            } else if (scholarship !== undefined) {
                data = await getScholarByNameAndScholarship(name, labid, scholarship);
            } else if (userCareer !== undefined) {
                data = await getScholarByNameAndUserCareer(name, labid, userCareer);
            } else {
                data = await getScholarByName(name, labid);
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
        const { 
            name,
            file,
            dni,
            address,
            phone,
            careerlevel,
            email,
            password,
            laboratory_id,
            scholarshiptype_id,
            usercareer_id 
        } = await request.json();   
        const hashedPassword = await bcrypt.hash(password, 5);
        const userstatus = await getStatusPending();
        const usertype = await getTypeScholar();
        const user = {
                name,
                file,
                dni,
                address,
                phone,
                careerlevel,
                email,
                password: hashedPassword,
                laboratory_id,
                usertype_id: usertype,
                userstatus_id: userstatus,
                scholarshiptype_id,
                usercareer_id,
        }
        const client = db;
        const existingUserEmail = await client.sql`
            SELECT * FROM "user" WHERE email = ${email} LIMIT 1
        `;    
        const existingScholarFile = await client.sql`
            SELECT * FROM "scholar" WHERE file = ${file} LIMIT 1
        `;    
        const existingScholarDNI = await client.sql`
            SELECT * FROM "scholar" WHERE dni = ${dni} LIMIT 1
        `;    
        const apiErrors: APIErrors = {};
        if (existingUserEmail.rows.length > 0) {
            apiErrors.email = "Email en uso";
        }
        if (existingScholarFile.rows.length > 0) {
            apiErrors.file = "Legajo ya existe";
        }
        if (existingScholarDNI.rows.length > 0) {
            apiErrors.dni = "DNI ya existe";
        }
        if (Object.keys(apiErrors).length > 0) {
            return NextResponse.json(
                { apiError: apiErrors }, 
                { status: 400 }
            );
        }
        try {
            await createScholar(user);
            return NextResponse.json({ status: 201 });
        } catch(error) {
            console.error("Error al crear Becario:", error);
            return NextResponse.json({ message: "Error al crear becario" }, { status: 500 })
        }
    } catch (error) {
        console.error("Error manejando POST:", error);
        return NextResponse.json({ message: "Error procesando la solicitud" }, { status: 500 });
    }
}

export const PUT = async (request: Request) => {
    try {
        const { 
            id,
            name,
            file,
            dni,
            address,
            phone,
            careerlevel,
            scholarshiptype_id,
            usercareer_id 
        } = await request.json();
        if (typeof id !== 'number' || typeof name !== 'string' || typeof file !== 'string' || typeof dni !== 'string' || typeof address !== 'string' || typeof phone !== 'string' || typeof careerlevel !== 'number' || typeof scholarshiptype_id !== 'number' || typeof usercareer_id !== 'number') {
            return new NextResponse("Parametros no válidos", {status: 400});
        }
        const client = db;
        const existingScholarFile = await client.sql`
            SELECT * FROM "scholar" WHERE file = ${file} AND id != ${id} LIMIT 1
        `;    
        const existingScholarDNI = await client.sql`
            SELECT * FROM "scholar" WHERE dni = ${dni} AND id != ${id} LIMIT 1
        `;    
        const apiErrors: APIErrors = {};
        if (existingScholarFile.rows.length > 0) {
            apiErrors.file = "Legajo ya existe";
        }
        if (existingScholarDNI.rows.length > 0) {
            apiErrors.dni = "DNI ya existe";
        }
        if (Object.keys(apiErrors).length > 0) {
            return NextResponse.json(
                { apiError: apiErrors }, 
                { status: 400 }
            );
        }
        const editUser = {
            id,
            name,
            file,
            dni,
            address,
            phone,
            careerlevel,
            scholarshiptype_id,
            usercareer_id
        };
        try {
            await editScholar(editUser);
            return NextResponse.json({ status: 201 });
        } catch(error) {
            console.error("Error al editar Becario:", error);
            return NextResponse.json({ message: "Error al editar becario" }, { status: 500 })
        }
    } catch (error) {
        console.error("Error manejando PUT:", error);
        return NextResponse.json({ message: "Error procesando la solicitud" }, { status: 500 });
    }
}