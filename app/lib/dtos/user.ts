export type user = {
    id: string;
    name: string;
    email: string;
    password: string;
    created_at: Date;
    dropped_at?: Date;
    laboratory_id: number;
    usertype_id: number;
    userstatus_id: number;
    emailVerified: Date | null;
}

export type userSchema = {
    id: number;
    name: string;
    email: string;
    password: string;
    created_at: Date;
    deactivated_at?: Date;
    laboratory_id: number;
    usertype_id: number;
    userstatus_id: number;
    emailVerified: Date | null;
}

export type newUserQuery = {
    name: string;
    email: string;
    password: string;
    laboratory_id: number;
    usertype_id: number;
    userstatus_id: number;
}

export type fetchedAdmin = {
    id: number;
    name: string;
}