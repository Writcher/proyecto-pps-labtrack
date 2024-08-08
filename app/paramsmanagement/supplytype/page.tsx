import ABMTable from "@/app/ui/paramsmanagement/abmtable";

export default async function ABMtipoInsumo() {
    return (
        <main className="flex flex-col w-full">
            <div className="flex flex-col items-center justify-center mb-8">
                <p className="text-xl md:text-3xl text-gray-700 text-center font-medium">
                    <strong className="text-gray-700">
                        ABM Tipos de Insumos
                    </strong>
                </p>
            </div>
            <div className="flex flex-col w-ful items-center justify-center">
                <ABMTable 
                    table="supplytype"   
                />
            </div>
        </main>
    );
};
