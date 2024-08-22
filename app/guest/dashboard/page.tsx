import { auth } from "@/app/lib/auth";
import { getTypeGuest } from "@/app/lib/queries/usertype";
import { redirect } from "next/navigation";

export default async function Home() {
    const guestType = await getTypeGuest();
    const session = await auth();
    if (!session?.user) redirect("/");
    if (session?.user.usertype_id != guestType) {
        return (
            <div className="flex flex-col text-xl md:text-3xl text-gray-700 text-center font-bold">
                <p className="mt-16">
                    404 Página no Encontrada
                </p>
            </div>
        )
    }

    const laboratory_id = session?.user?.laboratory_id;

    return (
        <div>
            proximamente loco
        </div>
    )
}