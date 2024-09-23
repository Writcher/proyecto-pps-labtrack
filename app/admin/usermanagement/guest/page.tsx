import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { auth } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import GuestQuery from "@/app/components/admin/usermanagement/guest/guestQuery";
import Link from "next/link";

export default async function Invitados() {
    const session = await auth();
    if (!session?.user) redirect("/");
    const laboratory_id = session?.user?.laboratory_id as number;
    return (
        <main className="flex flex-col w-full h-full">
            <Link href={"/admin/usermanagement"} className="flex flex-row h-[10%] bg-gray-700 md:bg-gradient-to-l md:from-gray-800 md:to-gray-700 border-b-4 border-orange-500 md:border-transparent md:hover:bg-gradient-to-r md:hover:from-orange-500 md:hover:to-gray-800 text-white items-center">
                <KeyboardArrowLeftIcon className="ml-4"/>
                <p className="ml-2">
                    ATRAS
                </p>
            </Link>
            <div className="flex flex-col w-full px-4 md:px-6 md:py-6 h-[90%]">
                <div className="flex flex-col items-center justify-center text-3xl text-gray-700 text-center font-bold h-[10%]">
                    <p>
                        Gestión de Invitados
                    </p>
                </div>
                <div className="flex flex-col items-center justify-center h-[90%]">
                    <GuestQuery
                        laboratory_id={laboratory_id}
                    />
                </div>
            </div>
        </main>
    );
};