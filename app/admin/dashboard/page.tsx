import { auth } from "@/app/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminHome() {
    const session = await auth();
    if (!session?.user) redirect("/");

    const laboratory_id = session?.user?.laboratory_id;

    return (
        <div>
            proximamente loco
        </div>
    )
}