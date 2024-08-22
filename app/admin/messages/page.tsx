import { auth } from "@/app/lib/auth";
import { getTypeAdmin, getTypeScholar } from "@/app/lib/queries/usertype";
import ChatAdmin from "@/app/components/admin/messages/chatadmin";
import ChatScholar from "@/app/components/admin/messages/chatscholar";
import { redirect } from "next/navigation";

export default async function Home() {
    const adminType = await getTypeAdmin();
    const scholarType = await getTypeScholar();
    const session = await auth();
    if (!session?.user) redirect("/");

    const usertype_id = session?.user?.usertype_id;
    const laboratory_id = session?.user?.laboratory_id;
    const current_id = session?.user?.id;

    let chat;
    if (usertype_id === adminType) {
        chat = <ChatAdmin laboratory_id={laboratory_id} current_id={current_id} usertype_id={usertype_id}/>
    } else if (session?.user?.usertype_id === scholarType) {
        chat = <ChatScholar laboratory_id={laboratory_id} current_id={current_id} usertype_id={usertype_id}/>;
    }
    
    return (
        <div>
            {chat}
        </div>
    )
}