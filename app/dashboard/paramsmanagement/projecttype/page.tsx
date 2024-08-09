import ABMTable from "@/app/ui/dashboard/paramsmanagement/abmtable";

export default function ABMtipoProyecto() {
    return (
            <div className="flex flex-col w-ful items-center justify-center">
                <ABMTable 
                    table="proyecttype"   
                />
            </div>
    );
};