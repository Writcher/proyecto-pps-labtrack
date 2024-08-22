import { auth } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import ABMProjectTable from "@/app/components/admin/projects/table";

export default async function Invitados() {
    const session = await auth();
    if (!session?.user) redirect("/");

    const laboratory_id = session?.user?.laboratory_id as number;
    
    return (
        <main className="flex flex-col w-full">
            <div className="flex flex-col text-xl md:text-3xl text-gray-700 text-center font-bold">
                <p className="mt-16">
                    Proyectos
                </p>
            </div>
            <div className="flex flex-col w-ful items-center justify-center m-4">
                Todavia no hago esta tabla
                {/*<ABMProjectTable laboratory_id={laboratory_id}/>*/}
            </div>
        </main>
    );
};