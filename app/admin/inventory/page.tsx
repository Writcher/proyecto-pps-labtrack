import { auth } from "@/app/lib/auth";
import { getSupplyStatuses } from "@/app/lib/queries/supplystatus";
import { getSupplyTypes } from "@/app/lib/queries/supplytype";
import ABMInventoryTable from "@/app/components/admin/inventory/table";
import { redirect } from "next/navigation";

export default async function Invitados() {
    const session = await auth();
    if (!session?.user) redirect("/");

    const laboratory_id = session?.user?.laboratory_id as number;
    
    const supplytypes = await getSupplyTypes();
    const supplystatus = await getSupplyStatuses();

    return (
        <main className="flex flex-col w-full h-full">
            <div className="flex flex-col text-xl md:text-3xl text-gray-700 text-center font-bold">
                <p className="mt-16">
                    Inventario
                </p>
            </div>
            <div className="flex flex-col min-h-[80%] max-h-[80%] mt-10 md:px-10 items-center justify-center">
                <ABMInventoryTable 
                    laboratory_id={laboratory_id} 
                    supplystatuses={supplystatus} 
                    supplytypes={supplytypes}
                />
            </div>
        </main>
    );
};