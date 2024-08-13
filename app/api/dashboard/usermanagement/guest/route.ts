import { UserGetGuest } from "@/app/lib/definitions";
import { getGuests, getGuestsByName } from "@/app/lib/queries/user";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
    try {
        const url = new URL(request.url);
        const name = url.searchParams.get('name');
        const labidString = url.searchParams.get('labid');

        const labid = labidString ? parseInt(labidString, 10) : undefined

        if (typeof name !== 'string') {
            return new NextResponse("Mandaste cualquier parametro loco", { status: 400 });
        }

        if (labid === undefined) {
            return new NextResponse("labid is required", { status: 400 });
        }

        let data: UserGetGuest[];

        if (name.trim() === "") {
            try {
                data = await getGuests(labid);
            } catch (error) {
                console.error("Error recuperando instancias:", error);
                return new NextResponse("Error recuperando invitados", { status: 500 });
            }
        } else {
            try {
                data = await  getGuestsByName(name, labid)
            } catch (error) {
                console.error("Error buscando datos:", error);
                return new NextResponse("Error buscando datos", { status: 500 });
            }
        } 

        return new NextResponse(JSON.stringify(data), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error("Error manejando GET:", error);
        return new NextResponse("Error manejando GET", { status: 500 });
    }
}