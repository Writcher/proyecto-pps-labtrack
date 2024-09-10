"use server"

import { createGuestData, fetchGuestData } from "@/app/lib/dtos/guest"

export async function fetchTableData(data: fetchGuestData) {
    try {
        const url = new URL(`${process.env.BASE_URL}/api/admin/usermanagement/guest`);
        url.searchParams.append('name', data.search);
        url.searchParams.append('sortcolumn', data.sortColumn);
        url.searchParams.append('sortdirection', data.sortDirection);
        url.searchParams.append('page', data.page.toString());
        url.searchParams.append('rowsPerPage', data.rowsPerPage.toString());
        url.searchParams.append('labid', data.laboratory_id.toString());
        const response = await fetch(url.toString(), {
            method: 'GET',
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const fetchedData = await response.json();
        return fetchedData;
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error en fetchTableData:", error.message);
        } else {
            console.error("Error desconocido");
        }
        return [];
    }
};

export async function createTableData(data: createGuestData) {
    try {
        const response = await fetch(`${process.env.BASE_URL}/api/admin/usermanagement/guest`, {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            const errorData = await response.json();
            if (!!errorData.apiError) {
                return { success: false, error: errorData.apiError };
            } else {
                return { success: false, error: `HTTP error! status: ${response.status}` };
            }
        }
        return { success: true };
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error en createTableData:", error.message);
        } else {
            console.error("Error desconocido");
        }
    }  
};

export async function deleteTableData(id: number) {
    try {
        const url = new URL(`${process.env.BASE_URL}/api/admin/usermanagement/guest`);
        url.searchParams.append('id', id.toString());
        const response = await fetch(url.toString(), {
            method: 'DELETE',
        });
        if (!response.ok) {
            const errorData = await response.json();
            if (!!errorData.apiError) {
                return { success: false, error: errorData.apiError };
            } else {
                return { success: false, error: `HTTP error! status: ${response.status}` };
            }
        }
        return { success: true };
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error en createTableData:", error.message);
        } else {
            console.error("Error desconocido");
        }
    }   
};