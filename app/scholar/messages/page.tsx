import { auth } from "@/app/lib/auth";
import ChatScholar from "@/app/components/scholar/messages/chat";
import { redirect } from "next/navigation";
import { getTypeScholar } from "@/app/lib/queries/usertype";

export default async function Home() {
    const scholarType = await getTypeScholar();
    const session = await auth();
    if (!session?.user) redirect("/");
    if (session?.user.usertype_id != scholarType) {
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
            <ChatScholar laboratory_id={laboratory_id} current_id={current_id} usertype_id={usertype_id}/>
        </div>
    )
}