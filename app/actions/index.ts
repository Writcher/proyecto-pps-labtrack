"use server"

import { signIn, signOut } from "../lib/auth";

export async function doLogin(formData) {
    const action = formData.get("action");
    await signIn(action, { redirectTo: "/dashboard" });
    console.log(action);
}

export async function doLogout() {
    await signOut({ redirectTo: "/"});
}