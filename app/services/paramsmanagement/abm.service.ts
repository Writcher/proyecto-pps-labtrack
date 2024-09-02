export async function fetchTableData(searchTerm: string, table: string) {
    try {
        const response = await fetch(`/api/admin/paramsmanagement?name=${encodeURIComponent(searchTerm)}&table=${encodeURIComponent(table)}`, {
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

export async function createTableData(data: { name: string; table: string }) {
    try {
        const response = await fetch("/api/admin/paramsmanagement", {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data),
        })
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
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

export async function editTableData(data: { name: string; table: string; id:number }) {
    try {
        const response = await fetch("/api/admin/paramsmanagement", {
            method: 'PUT',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data),
        })
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
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