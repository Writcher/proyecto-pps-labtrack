import { getSupplyTypes } from "@/app/queries/supplytype";
import ABMTable from "@/app/ui/paramsmanagement/abmtable";

export default async function ABMtipoInsumo() {
    const supplytypes = await getSupplyTypes();
    console.log(supplytypes)
    return (
        <div>
            <h1>Supply Types</h1>
            <ABMTable items={supplytypes}/>
        </div>
    );
};
