import { auth } from "@/app/lib/auth";
import { getTypeScholar } from "@/app/lib/queries/usertype";
import { redirect } from "next/navigation";

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

    const laboratory_id = session?.user?.laboratory_id;

    return (
        <div>
            proximamente loco
        </div>
    )
}