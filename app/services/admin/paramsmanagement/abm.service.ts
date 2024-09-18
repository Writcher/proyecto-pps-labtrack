

import { fetchABMData } from "@/app/lib/dtos/abm";

export async function fetchTableData(data: fetchABMData) {
    try {
        const url = new URL(`${process.env.BASE_URL}/api/admin/paramsmanagement`);
        url.searchParams.append('name', data.search)
        url.searchParams.append('table', data.table)
        url.searchParams.append('page', data.page.toString());
        url.searchParams.append('rowsPerPage', data.rowsPerPage.toString());
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
    }
};

export async function createTableData(data: { name: string; table: string }) {
    try {
        const response = await fetch(`${process.env.BASE_URL}/api/admin/paramsmanagement`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data),
        })
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

export async function editTableData(data: { name: string; table: string; id:number }) {
    try {
        const response = await fetch(`${process.env.BASE_URL}/api/admin/paramsmanagement`, {
            method: 'PUT',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data),
        })
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
            console.error("Error en editTableData:", error.message);
        } else {
            console.error("Error desconocido");
        }
    }
};