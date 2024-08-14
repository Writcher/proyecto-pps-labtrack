export type ABMcreate = {
    name: string;
    table: string;
}

export type ABMdelete = {
    id: number;
    table: string;
}

export type ABMedit = {
    name: string;
    id: number;
    table: string;
}

export type Supplystatus = {
    id: number;
    name: string;
}

export type NewSupplystatus = {
    name: string;
}

export type Supplytype = {
    id: number;
    name: string;
}

export type NewSupplytype = {
    name: string;
}

export type Projectstatus = {
    id: number;
    name: string;
}

export type NewProjectstatus = {
    name: string;
}

export type Projecttype = {
    id: number;
    name: string;
}

export type NewProjecttype = {
    name: string;
}

export type Scolarshiptype = {
    id: number;
    name: string;
}

export type NewScolarchiptype = {
    name: string;
}

export type Grade = {
    id: number;
    name: string;
}

export type NewGrade = {
    name: string;
}

export type Usercareer = {
    id: number;
    name: string;
}

export type NewUsercareer = {
    name: string;
}

export type Usertype = {
    id: number;
    name: string;
}

export type User = {
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

export type UserSchema = {
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

export type NewUser = {
    name: string;
    email: string;
    password: string;
    laboratory_id: number;
    usertype_id: number;
    userstatus_id: number;
}

export type Scholar = UserSchema & {
    dni: string;
    file: string;
    phone?: string;
    address?: string;
    careerlevel: number;
    usercareer_id: number;
    scholarshiptype_id: number;
}

export type NewScholar = NewUser & {
    dni: string;
    file: string;
    phone?: string;
    address?: string;
    careerlevel: number;
    usercareer_id: number;
    scholarshiptype_id: number;
}

export type GetScholar = {
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

export type EditScholar = {
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

export type GetGuest = {
    id: number;
    name: string;
    created_at: Date;
    dropped_at: Date | null;
    expires_at: Date;
    email: string;
    userstatus: string;
}

export type Laboratory = {
    id: number;
    name: string;
}