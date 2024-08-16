import { auth } from "@/app/lib/auth";
import { getSupplyStatuses } from "@/app/lib/queries/supplystatus";
import { getSupplyTypes } from "@/app/lib/queries/supplytype";
import ABMInventoryTable from "@/app/ui/dashboard/inventory/abminventorytable";
import { redirect } from "next/navigation";

export default async function Invitados() {
    const session = await auth();
    if (!session?.user) redirect("/");
    if (session?.user.usertype_id != 1) {
        return <div> No sos profesor vos loco, raja de aca</div>
    }
    const laboratory_id = session?.user?.laboratory_id as number;
    
    const supplytypes = await getSupplyTypes();
    const supplystatus = await getSupplyStatuses();

    return (
        <main className="flex flex-col w-full">
            <div className="flex flex-col text-xl md:text-3xl text-gray-700 text-center font-bold">
                <p className="mt-16">
                    Inventario
                </p>
            </div>
            <div className="flex flex-col w-ful items-center justify-center m-4">
                <ABMInventoryTable laboratory_id={laboratory_id}
                    supplystatuses={supplystatus}
                    supplytypes={supplytypes}
                />
            </div>
        </main>
    );
};