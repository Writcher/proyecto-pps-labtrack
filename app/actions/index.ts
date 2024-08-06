"use server"

import { signIn, signOut } from "../lib/auth";

export async function doLogin(formData: FormData) {
    const action = formData.get("action");
    // Ensure action is a string and not null
    if (typeof action === "string") {
        await signIn(action, { redirectTo: "/dashboard" });
    } else {
        console.error("La accion no es valida perro");
    }
    console.log(action);
}
export async function doLogout() {
    await signOut({ redirectTo: "/" });
}

export async function doCredentialLogin(formData: FormData) {
    try{
        const response = await signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
            redirect: false
        });
        return response;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error("Error desconocido, la cagaste");
        }
    } 
}