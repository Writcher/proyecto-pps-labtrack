import { auth } from "@/app/lib/auth";
import InventoryTable from "@/app/components/guest/inventory/table";
import { redirect } from "next/navigation";

export default async function Invitados() {
    const session = await auth();
    if (!session?.user) redirect("/");
    
    const laboratory_id = session?.user?.laboratory_id as number;

    return (
        <main className="flex flex-col w-full h-full">
            <div className="flex flex-col mt-10 text-xl md:text-3xl text-gray-700 text-center font-bold">
                <p className="">
                    Inventario
                </p>
            </div>
            <div className="flex flex-col min-h-[80%] max-h-[80%] mt-10 md:px-10 items-center justify-center">
                <InventoryTable 
                    laboratory_id={laboratory_id} 
                />
            </div>
        </main>
    );
};