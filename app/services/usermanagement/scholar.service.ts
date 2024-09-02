import { createData, editData } from "@/app/lib/dtos/scholar"

export async function createTableData(data: createData) {
    try {
        const response = await fetch("/api/admin/usermanagement/scholar", {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            const errorData = await response.json();
            if (!!errorData.apiError) {
                return Promise.reject(errorData.apiError);
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        }
        return response;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error("Error desconocido");
        }
    }
}

export async function editTableData(data: editData) {
    try {
        const response = await fetch("/api/admin/usermanagement/scholar", {
            method: 'PUT',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
        if (!response.ok) {
            const errorData = await response.json();
            if (!!errorData.apiError) {
                return Promise.reject(errorData.apiError);
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        }
        return response;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error("Error desconocido");
        }
    }
}