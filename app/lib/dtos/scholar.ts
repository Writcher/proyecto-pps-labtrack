import { newUserQuery, userSchema } from "./user";

export type createScholarData = {
    name: string;
    file: string;
    dni: string;
    careerlevel: number;
    usercareer_id: number;
    scholarshiptype_id: number;
    address: string;
    phone: string;
    email: string;
    password: string;
    laboratory_id: number;
}

export type editScholarData = {
    name: string;
    file: string;
    dni: string;
    careerlevel: number;
    usercareer_id: number;
    scholarshiptype_id: number;
    address: string;
    phone: string;
    id: number;
}

export type fetchScholarData = {
    search: string;
    scholarshiptype_id?: number;
    usercareer_id?: number;
    laboratory_id: number;
    sortColumn: string;
    sortDirection: "ASC" | "DESC";
    page: number;
    rowsPerPage: number;
}

export type fetchScholarQuery = {
    search: string;
    scholarshiptype_id: number;
    usercareer_id: number;
    laboratory_id: number;
    sortColumn: string;
    sortDirection: "ASC" | "DESC";
    page: number;
    rowsPerPage: number;
}

export type Scholar = userSchema & {
    dni: string;
    file: string;
    phone?: string;
    address?: string;
    careerlevel: number;
    usercareer_id: number;
    scholarshiptype_id: number;
}

export type newScholarQuery = newUserQuery & {
    dni: string;
    file: string;
    phone?: string;
    address?: string;
    careerlevel: number;
    usercareer_id: number;
    scholarshiptype_id: number;
}

export type fetchedScholar = {
    id: number;
    name: string;
    email: string;
    created_at: Date;
    dropped_at?: Date;
    userstatus: string;
    file: string;
    dni: string;
    address?: string;
    phone?: string;
    careerlevel: number;
    usercareer_id: number;
    usercareer: string;
    scholarshiptype_id: number;
    scholarshiptype: string;
}

export type editScholarQuery = {
    id: number;
    name: string;
    file: string;
    dni: string;
    address?: string;
    phone?: string;
    careerlevel: number;
    scholarshiptype_id: number;
    usercareer_id: number;
}
