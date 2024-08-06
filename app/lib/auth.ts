import NextAuth from "next-auth";
import google from "next-auth/providers/google";
import github from "next-auth/providers/github";
import credentials from "next-auth/providers/credentials";

import { getUserByEmail } from "./data";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    session: {
        strategy: "jwt",
    },
    providers: [
        google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,

            authorization: {
                prompt: "consent",
                acces_type: "offline",
                ressponse_type: "code",
            }
        }),
        github({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,

            authorization: {
                prompt: "consent",
                acces_type: "offline",
                ressponse_type: "code",
            }
        }),
        credentials({
            async authorize(credentials) {
                if(credentials === null) return null;
                try {
                    const user = getUserByEmail(credentials?.email);
                    if (user) {
                        const isMatch = user?.password === credentials?.password;
                        if (isMatch) {
                            return user;
                        } else {
                            throw new Error("Contraseña incorrecta");
                        }
                    } else {
                        throw new Error("Usuario no encontrado");
                    }
                } catch (error) {
                    if (error instanceof Error) {
                        throw new Error(error.message);
                    } else {
                        throw new Error("Error desconocido, la cagaste");
                    }
                }
            }
        }),
    ]
})