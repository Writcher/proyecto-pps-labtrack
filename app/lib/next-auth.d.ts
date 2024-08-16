import NextAuth from "next-auth";
import { User as NextAuthUser } from "next-auth";
import { User } from "./definitions";

declare module "next-auth" {
    interface Session {
        user: User;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        user?: User;
    }
}