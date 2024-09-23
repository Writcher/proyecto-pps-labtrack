import { auth } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import ChatQuery from "@/app/components/admin/messages/chatQuery";

export default async function MessagesPageAdmin() {
    const session = await auth();
    if (!session?.user) redirect("/");
    const usertype_id = session?.user?.usertype_id;
    const laboratory_id = session?.user?.laboratory_id;
    const current_id = session?.user?.id;
    return (
        <main className="flex flex-col w-full h-full">
            <ChatQuery laboratory_id={laboratory_id} current_id={current_id} usertype_id={usertype_id}/>
        </main>
    );
};