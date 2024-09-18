"use server"

import { checkInstanceExistance, createInstance, editInstance, getInstances } from "@/app/lib/abm";
import { createABMQuery, editABMQuery, fetchABMData, fetchABMQuery, fetchedABMItem } from "@/app/lib/dtos/abm";

interface APIError {
    name?: string;
}

export async function fetchTableData(data: fetchABMData) {
    try {
        const params = {
            name: data.search,
            page: data.page,
            rowsPerPage: data.rowsPerPage,
            table: data.table
        } as fetchABMQuery;
        let response: { items: fetchedABMItem[]; totalItems: any; };
        response = await getInstances(params);
        return response;
    } catch (error) {
        console.error("Error en fetchTableData(ABM):", error);
    };
};

export async function createTableData(data: { name: string; table: string }) {
    try {
        if (typeof data.name !== 'string' || typeof data.table !== 'string') {
            return { success: false, error: "Parámetros no válidos" };
        };
        const existingNameInstance = await checkInstanceExistance({ table: data.table, name: data.name });
        if (existingNameInstance.rows.length > 0) {
            return { success: false, error: { name: "Instancia ya existe" } as APIError };
        };
        const query = {
            name: data.name,
            table: data.table
        } as createABMQuery;
        try {
            await createInstance(query);
            return { success: true };
        } catch (error) {
            console.error("Error al crear instancia:", error);
            return { success: false, error: "Error al crear instancia" };
        };
    } catch (error) {
        console.error("Error en createTableData(ABM):", error);
        return { success: false, error: "Error procesando la solicitud" };
    };
};

export async function editTableData(data: { name: string; table: string; id:number }) {
    try {
        if (typeof data.id !== 'number' || typeof data.name !== 'string' || typeof data.table !== 'string') {
            return { success: false, error: "Parámetros no válidos" };
        };
        const existingNameInstance = await checkInstanceExistance({ table: data.table, name: data.name });
        if (existingNameInstance.rows.length > 0) {
            return { success: false, error: { name: "Instancia ya existe" } as APIError };
        };
        const query = {
            name: data.name,
            table: data.table,
            id: data.id
        } as editABMQuery;
        try {
            await editInstance(query);
            return { success: true };
        } catch (error) {
            console.error("Error al editar instancia:", error);
            return { success: false, error: "Error al editar instancia" };
        };
    } catch (error) {
        console.error("Error en editTableData(ABM):", error);
        return { success: false, error: "Error procesando la solicitud" };
    };
};