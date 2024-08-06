"use client"

import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { FormEvent, use, useState } from "react";
import { useRouter } from "next/navigation";
import { Laboratory } from "../lib/definitions";

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
            const file = formData.get("file");
            const laboratory_id = formData.get("lab");
            const email = formData.get("email") as string;
            const password = formData.get("password") as string;
            const confPassword = formData.get("confirmPassword");

            if (password !== confPassword) {
                setError("Las contraseñas no coinciden");
                return; // Salir de la función si las contraseñas no coinciden
            }

            const emailDomainRegexDocente = /@docentes\.frm\.utn\.edu\.ar$/;
            const emailDomainRegexAlumno = /@alumnos\.frm\.utn\.edu\.ar$/;
            let usertype_id: number;

            if (emailDomainRegexDocente.test(email)) {
                usertype_id = 2; // ID correspondiente para docentes
            } else if (emailDomainRegexAlumno.test(email)) {
                usertype_id = 3; // ID correspondiente para alumnos
            } else {
                setError("Debes utilizar tu correo institucional");
                return;
            }

            const passwordValidationRegex = /^(?=.*\d).{12,}$/;
            if (!passwordValidationRegex.test(password)) {
                setError("La contraseña debe tener al menos 12 caracteres y contener al menos un número.");
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
        <div className="flex flex-col gap-5 justify-center">
            <div className="flex items-end items-center justify-center text-center text-red-500 p-2">{error}</div>
            <form className="flex flex-col justify-center" onSubmit={handleRegisterFormSubmit}>
                <div className="flex flex-row gap-5 justify-center">
                    <div className="mb-4">
                        <label htmlFor="name" className="block font-medium text-gray-700 text-center mb-2">Nombre y Apellido</label>
                        <input
                            type="string"
                            id="name"
                            name="name"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-center"
                            placeholder="Ingresa tu nombre y apellido"
                            required
                            autoComplete="on"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="file" className="block font-medium text-gray-700 text-center mb-2">Legajo</label>
                        <input
                            type="string"
                            id="file"
                            name="file"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-center"
                            placeholder="Ingresa tu legajo"
                            required
                            autoComplete="on"
                        />
                    </div>
                </div>
                <div className="flex flex-col justify-center">
                    <div className="mb-4">
                        <label htmlFor="lab" className="block font-medium text-gray-700 text-center mb-2">Laboratorio</label>
                        <select id="lab" name="lab" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-center" required>
                            <option value="" className="sm:text-sm text-center">Seleciona un laboratorio</option>
                            {laboratories.map(Laboratory => (
                                <option key={Laboratory.id} value={Laboratory.id}>
                                    {Laboratory.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block font-medium text-gray-700 text-center mb-2">Correo Electronico</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-center"
                            placeholder="Ingressa tu email"
                            autoComplete="on"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block font-medium text-gray-700 text-center mb-2">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-center"
                            placeholder="Ingresa tu contraseña"
                            required
                            autoComplete="off"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="confirmPassword" className="block font-medium text-gray-700 text-center mb-2">Confirmar Contraseña</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-center"
                            placeholder="Repite tu contraseña"
                            required
                            autoComplete="off"
                        />
                    </div>
                    <button type="submit" className="flex flex-1 self-start justify-center items-center gap-5 rounded-lg bg-orange-400 px-6 py-3 h-[75px] text-sm font-medium text-white transition-colors hover:bg-orange-300 md:text-base w-full">
                        <span>
                            Registrarse
                        </span>
                        <ArrowRightIcon className="w-5 h-5 shrink-0"/>
                    </button>
                </div>
            </form>
        </div>
    )
}