import { createHistoricProject } from "@/app/lib/queries/historicproject";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
    try {
        const { name,
            description,
            year,
            projectstatus_id,
            projecttype_id,
            laboratory_id, 
            scholars } = await request.json();

        if (!name || !description || !year || !projectstatus_id || !laboratory_id || !projecttype_id || !scholars ) {
            return NextResponse.json({ error: 'Faltan datos requeridos.' }, { status: 400 });
        }

        if (typeof year !== 'number' || !Array.isArray(scholars)) {
            return NextResponse.json({ error: 'Tipos de datos incorrectos.' }, { status: 400 });
        }

        const historicproject = {
            name,
            description,
            year,
            projectstatus_id,
            projecttype_id,
            laboratory_id,
            scholars
        }

        try {
            await createHistoricProject(historicproject);
        } catch(error) {
            console.error("Error manejando POST:", error);
            return new NextResponse("Error al crear historicproject", { status: 500 });
        }
    
        return NextResponse.json({ status: 201 });
    } catch (error) {
        console.error("Error manejando POST:", error);
        return new NextResponse("Error al crear historicproject", { status: 500 });
    }
}