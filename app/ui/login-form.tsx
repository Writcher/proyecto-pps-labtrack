"use client"

import Button from "@mui/material/Button";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { doCredentialLogin } from "../actions";
import { useRouter } from "next/navigation"; 
import { FormEvent, useState } from "react";
import TextField from "@mui/material/TextField";

export default function LoginForm() {
    const [error, setError] = useState("");
    const router = useRouter();
    
    async function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError("");
        try {
            const formData = new FormData(event.currentTarget);
            const email = formData.get("email")?.toString() ?? "";
            const password = formData.get("password")?.toString() ?? "";
            const result = await doCredentialLogin({ email, password });
    
            if (result.error) {
                setError(result.error || "Error desconocido, la cagaste");
            } else {
                router.push("/dashboard/home");
            }
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message || "Error desconocido, la cagaste");
            } else {
                setError("Error desconocido, la cagaste");
            }
        }
    }
    
    return (
        <div className="flex flex-col w-64 md:w-2/5 gap-12">
            <form className="flex flex-col" onSubmit={handleFormSubmit}>
                <div className="mb-6">
                    <TextField id="email" name="email" label="Email" helperText="Ingresa tu Email" type="email" variant="outlined" color="warning" fullWidth/>
                </div>
                <div className="mb-6">
                    <TextField id="password" name="password" label="Contraseña" helperText="Ingresa tu Contraseña" type="password" variant="outlined" color="warning" fullWidth/>
                </div>
                <Button variant="contained" size="large" color="warning" disableElevation endIcon={<KeyboardArrowRightIcon />} fullWidth type="submit">
                    INICIAR SESIÓN
                </Button>
            </form>
            <div className='text-center tex-xl font-medium text-red-700'>{error}</div>
        </div>
    )
}