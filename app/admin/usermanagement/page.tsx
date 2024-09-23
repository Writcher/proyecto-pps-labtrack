import { auth } from "@/app/lib/auth";
import Button from "@mui/material/Button";
import { redirect } from "next/navigation";


export default async function ABMusuarios() {
    const session = await auth();
    if (!session?.user) redirect("/");
    return (
        <main className="flex flex-col items-center justify-center w-full h-full px-4 md:px-6 md:py-6">
            <div className="flex flex-col items-center justify-center text-3xl text-gray-700 text-center font-bold h-[10%]">
                <p>
                    Gestión de Usuarios
                </p>
            </div>
            <div className="flex flex-col items-center justify-center gap-4 h-[90%] md:w-[30%]">
                <Button variant="outlined" href="/admin/usermanagement/scholar" size="large" color="warning" disableElevation fullWidth>Becarios</Button>
                <Button variant="outlined" href="/admin/usermanagement/guest" size="large" color="warning" disableElevation fullWidth>Invitados</Button>
            </div>
        </main>
    );
};