import NextAuth from "next-auth";
import google from "next-auth/providers/google";
import github from "next-auth/providers/github";
import credentials from "next-auth/providers/credentials";
import { getUserByEmail } from "../queries/user";
import bcrypt from 'bcryptjs';

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
                access_type: "offline",
                response_type: "code",
            }
        }),
        github({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,

            authorization: {
                prompt: "consent",
                access_type: "offline",
                response_type: "code",
            }
        }),
        credentials({
            async authorize(credentials) {
                if(credentials === null) return null;
                try {
                    const user = await getUserByEmail(credentials?.email as string);
                    if (user) {
                        const hashedPassword = user.password;

                        const isMatch = await bcrypt.compare(
                            credentials.password as string,
                            hashedPassword
                        );
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