import NextAuth from "next-auth";
import google from "next-auth/providers/google";
import github from "next-auth/providers/github";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
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
        })
    ]
})