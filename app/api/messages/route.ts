import { NextResponse } from "next/server";
import { getScholars } from "@/app/lib/queries/scholar";
import { getTypeAdmin, getTypeScholar } from "@/app/lib/queries/usertype";
import { getAdmins } from "@/app/lib/queries/user";
import { countUnreadMessages } from "@/app/lib/queries/messages";

export const GET = async (request: Request) => {
    try {
        const url = new URL(request.url);
        const labidString = url.searchParams.get('labid');
        const typeidString = url.searchParams.get('typeid');
        const currentidString = url.searchParams.get('currentid');

        const labid = labidString ? parseInt(labidString, 10) : undefined;
        const typeid = typeidString ? parseInt(typeidString, 10) : undefined;
        const currentid = currentidString ? parseInt(currentidString, 10) : undefined;

        if (labid === undefined || typeid === undefined || currentid === undefined) {
            return new NextResponse("labid, typeid, y currentid son requeridos", { status: 400 });
        }

        const adminType = await getTypeAdmin();
        const scholarType = await getTypeScholar();

        if (typeid === adminType) {
            try {
                const scholars = await getScholars(labid);
                const scholarsWithUnreadCount = await Promise.all(scholars.map(async (scholar) => {
                    const unreadCount = await countUnreadMessages(scholar.id, currentid);
                    return { ...scholar, unreadCount };
                }));
                return new NextResponse(JSON.stringify(scholarsWithUnreadCount), { status: 200, headers: { 'Content-Type': 'application/json' } });
            } catch (error) {
                console.error("Error recuperando becarios:", error);
                return new NextResponse("Error recuperando becarios", { status: 500 });
            }
        } else if (typeid === scholarType) {
            try {
                const admins = await getAdmins(labid);
                const adminsWithUnreadCount = await Promise.all(admins.map(async (admin) => {
                    const unreadCount = await countUnreadMessages(admin.id, currentid);
                    return { ...admin, unreadCount };
                }));
                return new NextResponse(JSON.stringify(adminsWithUnreadCount), { status: 200, headers: { 'Content-Type': 'application/json' } });
            } catch (error) {
                console.error("Error recuperando administradores:", error);
                return new NextResponse("Error recuperando administradores", { status: 500 });
            }
        } else {
            return new NextResponse("Tipo de usuario no reconocido", { status: 400 });
        }
        
    } catch (error) {
        console.error("Error manejando GET:", error);
        return new NextResponse("Error manejando GET", { status: 500 });
    }
}