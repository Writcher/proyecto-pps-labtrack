"use server"

import { signIn, signOut } from "../lib/auth";
import { getUserByEmail, userChangeStatus } from "../lib/queries/user";
import bcrypt from 'bcryptjs';
import { createVerificationToken, deleteVerificationToken, getVerificationTokenByEmail } from "../lib/queries/validationtoken";
import { nanoid } from "nanoid";
import sendVerificationEmail from "../lib/verificationemail";
import { getStatusDeactivated, getStatusExpired, getStatusPending } from "../lib/queries/userstatus";
import { getTypeGuest } from "../lib/queries/usertype";
import { getGuestExpirationDate } from "../lib/queries/guest";

export async function doLogout() {
    await signOut({ redirectTo: "/" });
}

export async function doCredentialLogin({ email, password }: { email: string; password: string }) {
    try {
        const user = await getUserByEmail(email as string);
        if (user) {
            const hashedPassword = user.password;
            const isMatch = await bcrypt.compare(password as string, hashedPassword);
            if (isMatch) {
                // Verifico si la cuenta de invitado se ha pasado de su fecha de vencimiento.
                const userTypeGuest = await getTypeGuest();
                const statusExpired = await getStatusExpired();
                if (user.usertype_id === userTypeGuest) {
                    const idnumber = Number(user.id);
                    const expirationdate = await getGuestExpirationDate(idnumber);
                    if (expirationdate < new Date()) {
                        await userChangeStatus(idnumber, statusExpired);
                        return { error: "Usuario expirado, contacte a un administrador." };
                    }
                }
                const statusDeactivated = await getStatusDeactivated();
                // Verificación de estado de usuario
                if (user.userstatus_id === statusDeactivated || user.userstatus_id === statusExpired) {
                    return { error: "La cuenta ha expirado o ha sido deshabiltada, contacte a un administrador." };
                }
                // Verificación de email
                const statusPending = await getStatusPending();
                if (user.userstatus_id === statusPending) {
                    const verificationTokenExists = await getVerificationTokenByEmail(user.email);
                    if (verificationTokenExists?.email) {
                        await deleteVerificationToken(user.email);
                    }
                    const token = nanoid();
                    const expirationdate = new Date(Date.now() + 24 * 60 * 60 * 1000);
                    await createVerificationToken(token, user.email, expirationdate);
                    await sendVerificationEmail(user.email, token);
                    return { error: "Se envió un email de verificación, por favor, revisa tu bandeja de entrada." };
                }
                const response = await signIn("credentials", {
                    email,
                    password,
                    redirect: false
                });
                console.log("auth",response)
                return { ...response, usertype_id: user.usertype_id };
            } else {
                return { error: "Contraseña incorrecta." };
            }
        } else {
            return { error: "Usuario no encontrado." };
        }
    } catch (error) {
        if (error instanceof Error) {
            return { error: error.message };
        } else {
            return { error: "Error desconocido" };
        }
    }
}