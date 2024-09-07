"use server"

import { createScholarData, editScholarData, fetchScholarData } from "@/app/lib/dtos/scholar"

export async function fetchTableData(data: fetchScholarData) {
    try {    
        const url = new URL(`${process.env.BASE_URL}/api/admin/usermanagement/scholar`);
        url.searchParams.append('name', data.search);
        url.searchParams.append('sortcolumn', data.sortColumn);
        url.searchParams.append('sortdirection', data.sortDirection);
        url.searchParams.append('page', data.page.toString());
        url.searchParams.append('rowsPerPage', data.rowsPerPage.toString());
        url.searchParams.append('labid', data.laboratory_id.toString());
        console.log(url.toString())
        if (data.scholarshiptype_id !== 0 && data.scholarshiptype_id !== undefined) {
            url.searchParams.append('scholarship', data.scholarshiptype_id.toString());
        }
        if (data.usercareer_id !== 0 && data.usercareer_id !== undefined) {
            url.searchParams.append('usercareer', data.usercareer_id.toString());
        }
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

export async function createTableData(data: createScholarData) {
    try {
        const response = await fetch(`${process.env.BASE_URL}/api/admin/usermanagement/scholar`, {
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

export async function editTableData(data: editScholarData) {
    try {
        const response = await fetch(`${process.env.BASE_URL}/api/admin/usermanagement/scholar`, {
            method: 'PUT',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
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

export async function deactivateTableData(id: number) {
    try {
        const response = await fetch(`${process.env.BASE_URL}/api/admin/usermanagement/scholar/status`, {
            method: 'PUT',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(id)
        });
        return { success: true };
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error en deactivateTableData:", error.message);
        } else {
            console.error("Error desconocido");
        }
    }
};