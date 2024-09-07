"use server"

import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import { db } from "@vercel/postgres";
import { getStatusPending } from "@/app/lib/queries/userstatus";
import { getTypeScholar } from "@/app/lib/queries/usertype";
import { editScholarQuery, fetchedScholar, fetchScholarQuery, newScholarQuery } from "@/app/lib/dtos/scholar";
import { createScholar, editScholar, getScholarsTable } from "@/app/lib/queries/scholar";

interface APIErrors {
    dni?: string,
    file?: string,
    email?: string,
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
        const scholarshipString = url.searchParams.get('scholarship') as string;
        const userCareerString = url.searchParams.get('usercareer') as string;
        const page = parseInt(pageString, 10);
        const rowsPerPage = parseInt(rowsPerPageString, 10);
        const labid = parseInt(labidString, 10);
        const scholarship = scholarshipString ? parseInt(scholarshipString, 10) : undefined;
        const userCareer = userCareerString ? parseInt(userCareerString, 10) : undefined;
        if (typeof name !== 'string') {
            return new NextResponse("Mandaste cualquier parametro loco", { status: 400 });
        }
        if (labid === undefined) {
            return new NextResponse("labid is required", { status: 400 });
        }
        const params = {
            search: name,
            scholarshiptype_id: scholarship,
            usercareer_id: userCareer,
            laboratory_id: labid,
            sortColumn: sortcolumn,
            sortDirection: sortdirection,
            page: page,
            rowsPerPage: rowsPerPage,
        } as fetchScholarQuery;
        let data: { scholars: fetchedScholar[]; totalScholars: any; };
        data = await getScholarsTable(params);
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
        } as newScholarQuery;
        const client = db;
        const text1 = `
            SELECT * FROM "user" WHERE email = $1 LIMIT 1
        `;    
        const values1 = [email];
        const existingUserEmail = await client.query(text1, values1);
        const text2 = `
            SELECT * FROM "scholar" WHERE file = $1 LIMIT 1
        `;
        const values2 = [file];
        const existingScholarFile = await client.query(text2, values2);
        const text3 = `
            SELECT * FROM "scholar" WHERE dni = ${dni} LIMIT 1
        `; 
        const values3 = [dni] ;
        const existingScholarDNI = await client.query(text3, values3);
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
        const text1 = `
            SELECT * FROM "scholar" WHERE file = $1 AND id != 2 LIMIT 1
        `;
        const values1 = [file, id];
        const existingScholarFile = await client.query(text1, values1);
        const text2 = `
            SELECT * FROM "scholar" WHERE dni = $1 AND id != $2 LIMIT 1
        `;    
        const values2 = [dni, id];
        const existingScholarDNI = await client.query(text2, values2);
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
        } as editScholarQuery; 
        try {
            await editScholar(editUser);
            return NextResponse.json({ status: 200 });
        } catch(error) {
            console.error("Error al editar Becario:", error);
            return NextResponse.json({ message: "Error al editar becario" }, { status: 500 })
        }
    } catch (error) {
        console.error("Error manejando PUT:", error);
        return NextResponse.json({ message: "Error procesando la solicitud" }, { status: 500 });
    }
}