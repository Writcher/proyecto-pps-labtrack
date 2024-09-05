"use server"

import { createData, editData, fetchData } from "@/app/lib/dtos/scholar"

export async function fetchTableData(data: fetchData) {
    try {    
        const url = new URL(`/api/admin/usermanagement/scholar`, window.location.origin);
        url.searchParams.append('name', data.search);
        url.searchParams.append('labid', data.laboratory_id.toString());
        if (data.scholarshiptype_id !== 0) {
            url.searchParams.append('scholarship', data.scholarshiptype_id.toString());
        }
        if (data.usercareer_id !== 0) {
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
}


export async function createTableData(data: createData) {
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
            throw new Error(error.message);
        } else {
            throw new Error("Error desconocido");
        }
    }
};

export async function editTableData(data: editData) {
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
            throw new Error(error.message);
        } else {
            throw new Error("Error desconocido");
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
            throw new Error(error.message);
        } else {
            throw new Error("Error desconocido");
        }
    }
}