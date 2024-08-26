import { auth } from "@/app/lib/auth";
import ChatAdmin from "@/app/components/admin/messages/chat";
import { redirect } from "next/navigation";

export default async function Home() {
    const session = await auth();
    if (!session?.user) redirect("/");

    const usertype_id = session?.user?.usertype_id;
    const laboratory_id = session?.user?.laboratory_id;
    const current_id = session?.user?.id;
    
    return (
        <div>
            <ChatAdmin laboratory_id={laboratory_id} current_id={current_id} usertype_id={usertype_id}/>
        </div>
    )
}