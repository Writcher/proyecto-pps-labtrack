import { auth } from "@/app/lib/auth";
import ChatScholar from "@/app/components/scholar/messages/chat";
import { redirect } from "next/navigation";

export default async function Home() {
    const session = await auth();
    if (!session?.user) redirect("/");

    const usertype_id = session?.user?.usertype_id;
    const laboratory_id = session?.user?.laboratory_id;
    const current_id = session?.user?.id;
    
    return (
        <div>
            <ChatScholar laboratory_id={laboratory_id} current_id={current_id} usertype_id={usertype_id}/>
        </div>
    )
}