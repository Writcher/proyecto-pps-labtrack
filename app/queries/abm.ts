import { ABMcreate, NewSupplytype } from '../lib/definitions';
import { createSupplyType } from './supplytype';

export async function createInstance(query: ABMcreate) {
    try {
        const allowedTables = ["supplytype", "projecttype", "anotherType"]; // Adjust this list based on your actual tables
        if (!allowedTables.includes(query.table)) {
            throw new Error(`Invalid table name: ${query.table}`);
        }

        switch (query.table) {
            case "supplytype":
                const newSupplyType: NewSupplytype = {
                    name: query.name,
                };
                await createSupplyType(newSupplyType);
                break;
            // Add more cases as needed for other table types
            default:
                throw new Error(`No se puede manejar la tabla: ${query.table}`);
        }

        return { success: true };

    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo crear instancia (profundo)");
    }
}