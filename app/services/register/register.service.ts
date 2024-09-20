"use server"

import { createLabData, createLabQuery, laboratory } from "@/app/lib/dtos/laboratory";
import { createAdminData, newUserQuery } from "@/app/lib/dtos/user";
import { createLab, getLabs } from "@/app/lib/queries/laboratory";
import { createUser } from "@/app/lib/queries/user";
import { getStatusPending } from "@/app/lib/queries/userstatus";
import { getTypeAdmin } from "@/app/lib/queries/usertype";
import { db } from "@vercel/postgres";
import bcrypt from 'bcryptjs';

interface APIErrors {
    email?: string,
    name?: string,
};

export async function createAdmin(data: createAdminData)  {
    try {
        const client = db;
        const text1 = `
                SELECT * FROM "user" WHERE email = $1 LIMIT 1
            `;    
        const values1 = [data.email];
        const existingUserEmail = await client.query(text1, values1);
        const apiErrors: APIErrors = {};
        if (existingUserEmail.rows.length > 0) {
            apiErrors.email = "Email en uso";
        };
        if (Object.keys(apiErrors).length > 0) {
            return { success: false, apiError: apiErrors };
        };
        const hashedPassword = await bcrypt.hash(data.password, 5);
        const userstatus_id = await getStatusPending();
        const usertype_id = await getTypeAdmin();
        const admin =   {
            name: data.name,
            email: data.email,
            password: hashedPassword,
            laboratory_id: data.laboratory_id,
            usertype_id: usertype_id,
            userstatus_id: userstatus_id
        } as newUserQuery;
        try {
            await createUser(admin);
            return { success: true };
        } catch (error) {
            console.error("Error al crear Usuario:", error);
            return { success: false };
        };
    } catch (error) {
        console.error("Error en createAdmin:", error);
        return { success: false };
    };
};

export async function fetchLaboratories() {
    try {
        let response: laboratory[];
        response = await getLabs();
        return response;
    } catch (error) {
        console.error("Error en fetchLaboratories:", error);
    };
};

export async function createLaboratory(data: createLabData) {
    try {
        const client = db;
        const text1 = `
            SELECT * FROM "laboratory" WHERE name = $1 LIMIT 1
        `;    
        const values1 = [data.name];
        const existingLabName = await client.query(text1, values1);
        const apiErrors: APIErrors = {};
        if (existingLabName.rows.length > 0) {
            apiErrors.name = "Laboratorio ya existe";
        };
        if (Object.keys(apiErrors).length > 0) {
            return { success: false, apiError: apiErrors };
        };
        const laboratory = {
            name: data.name,
        } as createLabQuery;
        try {
            await createLab(laboratory);
            return { success: true };
        } catch(error) {
            console.error("Error al crear laboratorio:", error);
            return { success: false };
        };
    } catch (error) {
        console.error("Error en createLaboratory:", error);
        return { success: false };
    };
};