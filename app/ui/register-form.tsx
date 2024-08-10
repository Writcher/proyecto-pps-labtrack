"use client"

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { FormEvent, use, useState } from "react";
import { useRouter } from "next/navigation";
import { Laboratory } from "../lib/definitions";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import React from 'react';

interface RegisterFormProps {
    laboratories: Laboratory[];
}

export default function RegisterForm({ laboratories }: RegisterFormProps) {
    const [error, setError] = useState("");
    const router = useRouter();
    async function handleRegisterFormSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        try {
            const formData = new FormData(event.currentTarget);
            const name = formData.get("name");
            const file = formData.get("file") as string;
            const laboratory_id = formData.get("lab");
            const email = formData.get("email") as string;
            const password = formData.get("password") as string;
            const confPassword = formData.get("confirmPassword");

            const emailDomainRegexDocente = /@docentes\.frm\.utn\.edu\.ar$/;
            const emailDomainRegexAlumno = /@alumnos\.frm\.utn\.edu\.ar$/;
            let usertype_id: number;

            if (emailDomainRegexDocente.test(email)) {
                usertype_id = 1; // ID correspondiente para docentes
            } else if (emailDomainRegexAlumno.test(email)) {
                setError("Debes ser un docente");
                return;
            } else {
                setError("Debes utilizar tu correo institucional");
                return;
            }

            const passwordValidationRegex = /^(?=.*\d).{12,}$/;
            if (!passwordValidationRegex.test(password)) {
                setError("La contraseña debe tener al menos 12 caracteres y contener al menos un número");
                return;
            }

            if (password !== confPassword) {
                setError("Las contraseñas no coinciden");
                return;
            }

            const response = await fetch("/api/register", {
                method: 'POST',
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    file,
                    email,
                    password,
                    laboratory_id,
                    usertype_id
                })
            })
    
            response.status === 201 && router.push("/login")
    
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error("Error desconocido, la cagaste");
            }
        }
    }

    return (
        <div className="flex flex-col w-64 md:w-2/5 gap-12">
            <form className="flex flex-col" onSubmit={handleRegisterFormSubmit}>
                <div className="flex flex-row gap-16 justify-center">
                    <div className="mb-4">
                        <TextField id="name" name="name" label="Nombre y Apellido" helperText="Ingresa tu Nombre y Apellido" type="text" variant="outlined" color="warning" fullWidth required/>
                    </div>
                    <div className="mb-4">
                        <TextField id="file" name="file" label="Legajo" helperText="Ingresa tu Legajo" type="text" variant="outlined" color="warning" fullWidth required/>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="mb-4">
                        <TextField id="lab" name="lab" label="Laboratorio" helperText="Selecciona tu Laboratorio" type="text" variant="outlined" color="warning" select fullWidth required>
                            {laboratories.map(Laboratory => (
                                <MenuItem key={Laboratory.id} value={Laboratory.id}>{Laboratory.name}</MenuItem>
                            ))}
                        </TextField>
                    </div>
                    <div className="mb-4">
                        <TextField id="email" name="email" label="Email" helperText="Ingresa tu Email" type="email" variant="outlined" color="warning" fullWidth required/>
                    </div>
                    <div className="mb-6">
                        <TextField id="password" name="password" label="Contraseña" helperText="Ingresa tu Contraseña" type="password" variant="outlined" color="warning" fullWidth required/>
                    </div>
                    <div className="mb-6">
                        <TextField id="confirmPassword" name="confirmPassword" label="Confirmar Contraseña" helperText="Ingresa tu Contraseña" type="password" variant="outlined" color="warning" fullWidth required/>
                    </div>
                    <Button variant="contained" size="large" color="warning" disableElevation endIcon={<KeyboardArrowRightIcon />} fullWidth type='submit'>
                        REGISTRARSE
                    </Button>
                </div>
            </form>
            <div className='text-center tex-xl font-medium text-red-700'>{error}</div>
        </div>
    )
}