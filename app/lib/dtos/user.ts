import { laboratory } from "./laboratory";

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
};

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
};

export type newUserQuery = {
    name: string;
    email: string;
    password: string;
    laboratory_id: number;
    usertype_id: number;
    userstatus_id: number;
};

export type registerFormProps = {
    laboratories: laboratory[];
};

export type registerFormData = {
    laboratory_id: number | '';
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    modalOpenCreate: boolean;
};

export type createAdminData = {
    laboratory_id: number;
    name: string;
    email: string;
    password: string;
}; 

export type loginFormProps = {
    admin: number;
    guest: number;
    scholar: number;
};

export type loginFormData = {
    email: string;
    password: string;
};