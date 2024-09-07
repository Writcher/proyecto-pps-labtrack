import { Dayjs } from "dayjs";
import { newUserQuery, userSchema } from "./user";

export type guest = userSchema & {
    expires_at: Date;
};

export type newGuestQuery = newUserQuery & {
    expires_at: Date;
};

export type fetchedGuest = {
    id: number;
    name: string;
    created_at: Date;
    dropped_at: Date | null;
    expires_at: Date;
    email: string;
    userstatus: string;
};

export type fetchGuestData = {
    search: string;
    laboratory_id: number; 
    sortColumn: string;
    sortDirection: "ASC" | "DESC";
    page: number; 
    rowsPerPage: number;
};

export type fetchGuestQuery = {
    search: string;
    laboratory_id: number;
    sortColumn: string;
    sortDirection: "ASC" | "DESC";
    page: number;
    rowsPerPage: number;
}

export type createGuestData = {
    name: string;
    email: string;
    password: string;
    expires_at: Dayjs | null;
    laboratory_id:number;
}