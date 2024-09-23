import { auth } from "@/app/lib/auth";
import Button from "@mui/material/Button";
import { redirect } from "next/navigation";


export default async function ABMinicio() {
    const session = await auth();
    if (!session?.user) redirect("/");
    return (
        <main className="flex flex-col items-center justify-center w-full h-full px-4 md:px-6 md:py-6">
            <div className="flex flex-col items-center justify-center text-3xl text-gray-700 text-center font-bold h-[10%]">
                <p>
                    Gestión de Parametros
                </p>
            </div>
            <div className="flex flex-col items-center justify-center gap-4 h-[90%] md:w-[30%]">
                <Button variant="outlined" href="/admin/paramsmanagement/projecttype" size="large" color="warning" disableElevation fullWidth>ABM Tipo de Proyecto</Button>
                <Button variant="outlined" href="/admin/paramsmanagement/projectstatus" size="large" color="warning" disableElevation fullWidth>ABM Estado de Proyecto</Button>
                <Button variant="outlined" href="/admin/paramsmanagement/grade" size="large" color="warning" disableElevation fullWidth>ABM Calificación</Button>
                <Button variant="outlined" href="/admin/paramsmanagement/supplytype" size="large" color="warning" disableElevation fullWidth>ABM Tipo de Insumo</Button>
                <Button variant="outlined" href="/admin/paramsmanagement/supplystatus" size="large" color="warning" disableElevation fullWidth>ABM Estado de Insumo</Button>
                <Button variant="outlined" href="/admin/paramsmanagement/scholarshiptype" size="large" color="warning" disableElevation fullWidth>ABM Tipo de Beca</Button>
                <Button variant="outlined" href="/admin/paramsmanagement/usercareer" size="large" color="warning" disableElevation fullWidth>ABM Carrera</Button>
            </div>        
        </main>
    );
};