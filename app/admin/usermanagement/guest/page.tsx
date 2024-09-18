import Button from "@mui/material/Button";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { auth } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import ABMGuestTable from "@/app/components/admin/usermanagement/guest/table";

export default async function Invitados() {
    const session = await auth();
    if (!session?.user) redirect("/");
    
    const laboratory_id = session?.user?.laboratory_id as number;
    
    return (
        <main className="flex flex-col w-full h-full">
            <div className="flex flex-row h-[8%] bg-gray-700 md:bg-gradient-to-l md:from-gray-800 md:to-gray-700 border-b-4 border-orange-500 md:border-transparent md:hover:bg-gradient-to-r md:hover:from-orange-500 md:hover:to-gray-800 text-white items-center">
                <Button variant="text" href="/admin/usermanagement" size="large" color="inherit" disableElevation startIcon={<KeyboardArrowLeftIcon />}> ATRAS </Button>
            </div>
            <div className="flex flex-col mt-10 text-xl md:text-3xl text-gray-700 text-center font-bold">
                <p className="">
                    Gestión de Invitados
                </p>
            </div>
            <div className="flex flex-col h-[80%] mt-10 md:px-10 items-center justify-center">
                <ABMGuestTable  
                    laboratory_id={laboratory_id}
                />
            </div>
        </main>
    );
};
