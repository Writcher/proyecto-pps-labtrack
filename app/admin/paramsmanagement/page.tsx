import { auth } from "@/app/lib/auth";
import Button from "@mui/material/Button";
import { redirect } from "next/navigation";


export default async function ABMinicio() {
    const session = await auth();
    if (!session?.user) redirect("/");
    return (
        <main className="flex flex-col w-full">
            <div className="flex flex-col items-center justify-center mb-4 md:gap-12">
                <div className="flex flex-col text-xl md:text-3xl text-gray-700 text-center font-bold">
                    <p className="mt-16">
                        Gestión de Parametros
                    </p>
                </div>
                <div className="flex flex-col m-6 md:m-12"/>
                <div className="flex flex-col gap-5 md:w-2/6">
                    <Button variant="outlined" href="/admin/paramsmanagement/projecttype" size="large" color="warning" disableElevation fullWidth>ABM Tipo de Proyecto</Button>
                    <Button variant="outlined" href="/admin/paramsmanagement/projectstatus" size="large" color="warning" disableElevation fullWidth>ABM Estado de Proyecto</Button>
                    <Button variant="outlined" href="/admin/paramsmanagement/grade" size="large" color="warning" disableElevation fullWidth>ABM Calificación</Button>
                    <Button variant="outlined" href="/admin/paramsmanagement/supplytype" size="large" color="warning" disableElevation fullWidth>ABM Tipo de Insumo</Button>
                    <Button variant="outlined" href="/admin/paramsmanagement/supplystatus" size="large" color="warning" disableElevation fullWidth>ABM Estado de Insumo</Button>
                    <Button variant="outlined" href="/admin/paramsmanagement/scholarshiptype" size="large" color="warning" disableElevation fullWidth>ABM Tipo de Beca</Button>
                    <Button variant="outlined" href="/admin/paramsmanagement/usercareer" size="large" color="warning" disableElevation fullWidth>ABM Carrera</Button>
                </div>
            </div>
        </main>
    );
}