import { Supplytype } from "@/app/lib/definitions";
import { getSupplyTypes } from "@/app/queries/supplytype";
import ABMTable from "@/app/ui/paramsmanagement/abmtable";

export default async function ABMtipoInsumo() {
    const supplytypes = await getSupplyTypes();
    const supplytypesArray: Supplytype[] = supplytypes.map((row: { id: any; name: any; }) => ({
        id: row.id,
        name: row.name
    }));
    
    console.log(supplytypes)

    return (
        <div>
            <h1>Supply Types</h1>
            <ABMTable items={supplytypesArray}/>
        </div>
    );
};
