import { countAllUnreadMessages } from "@/app/lib/queries/messages";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
    try {
        const url = new URL(request.url);
        const currentidString = url.searchParams.get('id');
        const currentid = currentidString ? parseInt(currentidString, 10) : undefined;
        if (currentid === undefined) {
            return new NextResponse("currentid es requerido", { status: 400 });
        }
        let data: number;
        data = await countAllUnreadMessages(currentid);
        return new NextResponse(JSON.stringify(data), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error("Error recuperando conteo:", error);
        return new NextResponse("Error recuperando conteo", { status: 500 });
    };
};