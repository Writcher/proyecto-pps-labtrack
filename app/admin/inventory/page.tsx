import { auth } from "@/app/lib/auth";
import { getSupplyStatuses } from "@/app/lib/queries/supplystatus";
import { getSupplyTypes } from "@/app/lib/queries/supplytype";
import { getTypeAdmin, getTypeGuest } from "@/app/lib/queries/usertype";
import ABMInventoryTable from "@/app/components/admin/inventory/abminventorytable";
import InventoryTable from "@/app/components/admin/inventory/inventorytable";
import { redirect } from "next/navigation";

export default async function Invitados() {
    const adminType = await getTypeAdmin();
    const guestType = await getTypeGuest();
    const session = await auth();
    if (!session?.user) redirect("/");
    if (session?.user.usertype_id != adminType && session?.user.usertype_id != guestType) {
        return (
            <div className="flex flex-col text-xl md:text-3xl text-gray-700 text-center font-bold">
                <p className="mt-16">
                    Becarios no pueden acceder a esta página.
                </p>
            </div>
        )
    }
    const laboratory_id = session?.user?.laboratory_id as number;
    
    const supplytypes = await getSupplyTypes();
    const supplystatus = await getSupplyStatuses();

    let table;
    if (session?.user?.usertype_id === adminType) {
        table = <ABMInventoryTable laboratory_id={laboratory_id} supplystatuses={supplystatus} supplytypes={supplytypes}/>;
    } else if (session?.user?.usertype_id === guestType) {
        table = <InventoryTable laboratory_id={laboratory_id}/>;
    }

    return (
        <main className="flex flex-col w-full">
            <div className="flex flex-col text-xl md:text-3xl text-gray-700 text-center font-bold">
                <p className="mt-16">
                    Inventario
                </p>
            </div>
            <div className="flex flex-col w-ful items-center justify-center m-4">
                {table}
            </div>
        </main>
    );
};