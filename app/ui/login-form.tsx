"use client"

import { doLogin, doCredentialLogin } from "../actions";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation"; 
import { FormEvent, useState } from "react";

export default function LoginForm() {
    const [error, setError] = useState("");
    const router = useRouter();
    async function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault ();
        try {
            const formData = new FormData(event.currentTarget);
            const response = await doCredentialLogin(formData);
            if (!!response.error) {
                setError(response.error.message);
            } else {
                router.push("/dashboard");
            }
        } catch(error) {
            if (error instanceof Error) {
                setError("Correo o contraseña equivocados");
            } else {
                setError("Error desconocido, la cagaste");
            }
        }
    }
    return (
        <div className="flex flex-col gap-5 justify-center">
            <div className="flex items-end items-center justify-center text-red-500 p-6">{error}</div>
            <form className="flex flex-col justify-center" onSubmit={handleFormSubmit}>
                <div className="mb-4">
                    <label htmlFor="email" className="block font-medium text-gray-700 text-center mb-2">Correo Electronico</label>
                    <input type="email" id="email" name="email" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-center" placeholder="Ingresa tu email" required></input>                   </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block font-medium text-gray-700 text-center mb-2">Contraseña</label>
                    <input type="password" id="password" name="password" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-center" placeholder="Ingresa tu contraseña" required></input>
                </div>
                <button type="submit" className="flex flex-1 self-start justify-center items-center gap-5 rounded-lg bg-orange-400 px-6 py-3 h-[75px] text-sm font-medium text-white transition-colors hover:bg-orange-300 md:text-base w-full">
                    <span>
                        Iniciar Sesión
                    </span>
                    <ArrowRightIcon className="w-5 h-5 shrink-0"/>
                </button>
            </form>
            <p className="block font-medium text-gray-700 text-center mb-2">O inicia sesión con:</p>
            <form action={doLogin} className="flex gap-5">
                <button type="submit" name="action" value="google" className="flex flex-1 self-start justify-center items-center gap-5 rounded-lg bg-gray-100 border-2 border-orange-400 px-6 py-3 h-[75px] text-sm font-medium text-gray-600 transition-colors hover:bg-orange-300 md:text-base">
                    <span>
                        Google
                    </span>
                    <ArrowRightIcon className="w-5 h-5 shrink-0"/>
                </button>
                <button type="submit" name="action" value="github" className="flex flex-1 self-start justify-center items-center gap-5 rounded-lg bg-purple-400 border-2 border-purple-500 px-6 py-3 h-[75px] text-sm font-medium text-white transition-colors hover:bg-purple-300 md:text-base">
                    <span>
                        Github 
                    </span>
                    <ArrowRightIcon className="w-5 h-5 shrink-0"/>
                </button>
            </form>
        </div>
    )
}