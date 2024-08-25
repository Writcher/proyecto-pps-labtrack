import ABMTable from "@/app/components/admin/paramsmanagement/table";
import Button from "@mui/material/Button";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { auth } from "@/app/lib/auth";
import { redirect } from "next/navigation";

export default async function ABMtipoProyecto() {
    const session = await auth();
    if (!session?.user) redirect("/");
    return (
        <main className="flex flex-col w-full h-full">
            <div className="flex flex-row h-16 md:h-20 bg-gray-700 md:bg-gradient-to-l md:from-gray-800 md:to-gray-700 border-b-4 border-orange-500 md:border-transparent md:hover:bg-gradient-to-r md:hover:from-orange-500 md:hover:to-gray-800 text-white items-center">
                <Button variant="text" href="/admin/paramsmanagement" size="large" color="inherit" disableElevation startIcon={<KeyboardArrowLeftIcon />}> ATRAS </Button>
            </div>
            <div className="flex flex-col mt-10 text-xl md:text-3xl text-gray-700 text-center font-bold">
                <p className="">
                    ABM Tipo de Proyecto
                </p>
            </div>
            <div className="flex flex-col min-h-[80%] max-h-[80%] mt-10 md:px-10 items-center justify-center">
                <ABMTable 
                    table="projecttype"   
                />
            </div>
        </main>
    );
};