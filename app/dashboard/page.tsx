import { auth } from "@/app/lib/auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
    const session = await auth();
    if (!session?.user) redirect("/");
    return (
        <div> Aca va el dashboard principal</div>
    )
}