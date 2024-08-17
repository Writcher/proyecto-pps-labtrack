import { NextResponse } from "next/server";
import { GetAdmin, GetScholar } from "@/app/lib/definitions";
import { getScholars } from "@/app/lib/queries/scholar";
import { getTypeAdmin, getTypeScholar } from "@/app/lib/queries/usertype";
import { getAdmins } from "@/app/lib/queries/user";

export const GET = async (request: Request) => {
    try {
        const url = new URL(request.url);
        const labidString = url.searchParams.get('labid');
        const typeidString = url.searchParams.get('typeid');

        const typeid = typeidString ? parseInt(typeidString, 10) : undefined
        const labid = labidString ? parseInt(labidString, 10) : undefined

        if (labid === undefined || typeid === undefined) {
            return new NextResponse("labid is required", { status: 400 });
        }

        const adminType = await getTypeAdmin();
        const scholarType = await getTypeScholar();

        if (typeid === adminType) {
            let scholar: GetScholar[];
            try {
                scholar = await getScholars(labid);
            } catch (error) {
                console.error("Error recuperando instancias:", error);
                return new NextResponse("Error recuperando becarios", { status: 500 });
            }
        return new NextResponse(JSON.stringify(scholar), { status: 200, headers: { 'Content-Type': 'application/json' } });
        } else if (typeid === scholarType) {
            let admin: GetAdmin[];
            try {
                admin = await getAdmins(labid);
            } catch (error) {
                console.error("Error recuperando instancias:", error);
                return new NextResponse("Error recuperando becarios", { status: 500 });
            }
        return new NextResponse(JSON.stringify(admin), { status: 200, headers: { 'Content-Type': 'application/json' } });
        }
        
    } catch (error) {
        console.error("Error manejando GET:", error);
        return new NextResponse("Error manejando GET", { status: 500 });
    }
}