import { auth } from "@/app/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminHome() {
    const session = await auth();
    if (!session?.user) redirect("/");

    const laboratory_id = session?.user?.laboratory_id;

    return (
        <main className="flex flex-col w-full">
            <div className="flex flex-col text-xl md:text-3xl text-gray-700 text-center font-bold">
                <p className="mt-16">
                    Inicio
                </p>
            </div>
            <div className="flex flex-col w-ful items-center justify-center m-4">
                Todavia no hago esta pantalla
            </div>
        </main>
    );
};