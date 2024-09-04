"use server"

import { createData, editData } from "@/app/lib/dtos/scholar"

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