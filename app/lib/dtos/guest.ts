import { newUserQuery, userSchema } from "./user";

export type guest = userSchema & {
    expires_at: Date;
}

export type newGuestQuery = newUserQuery & {
    expires_at: Date;
}

export type fetchedGuest = {
    id: number;
    name: string;
    created_at: Date;
    dropped_at: Date | null;
    expires_at: Date;
    email: string;
    userstatus: string;
}