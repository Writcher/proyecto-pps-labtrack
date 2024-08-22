import { auth } from "@/app/lib/auth";
import ChatAdmin from "@/app/components/admin/messages/chat";
import { redirect } from "next/navigation";
import { getTypeAdmin } from "@/app/lib/queries/usertype";

export default async function Home() {
    const adminType = await getTypeAdmin();
    const session = await auth();
    if (!session?.user) redirect("/");
    if (session?.user.usertype_id != adminType) {
        return (
            <div className="flex flex-col text-xl md:text-3xl text-gray-700 text-center font-bold">
                <p className="mt-16">
                    404 Página no Encontrada
                </p>
            </div>
        )
    }

    const usertype_id = session?.user?.usertype_id;
    const laboratory_id = session?.user?.laboratory_id;
    const current_id = session?.user?.id;
    
    return (
        <div>
            <ChatAdmin laboratory_id={laboratory_id} current_id={current_id} usertype_id={usertype_id}/>
        </div>
    )
}