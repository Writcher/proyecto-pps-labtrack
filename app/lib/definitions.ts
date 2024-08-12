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

export type User = {
    id: string;
    name: string;
    file?: string;
    dni?: string;
    address?: string;
    phone?: string;
    careerlevel?: number;
    created_at: Date;
    email: string;
    password: string;
    laboratory_id?: number;
    usertype_id: number;
    userstatus_id: number;
    validitytime_id?: number;
    scholarshiptype_id?: number;
    usercareer_id?: number;
    emailVerified: Date | null;
}

export type UserSchema = {
    id: number;
    name: string;
    file?: string;
    dni?: string;
    address?: string;
    phone?: string;
    careerlevel?: number;
    created_at: Date;
    email: string;
    password: string;
    laboratory_id?: number;
    usertype_id: number;
    userstatus_id: number;
    validitytime_id?: number;
    scholarshiptype_id?: number;
    usercareer_id?: number;
    emailVerified: Date | null;
}

export type UserGetScholar = {
    id: number;
    name: string;
    file?: string;
    dni?: string;
    address?: string;
    phone?: string;
    careerlevel?: number;
    created_at: Date;
    email: string;
    password: string;
    laboratory_id?: number;
    usertype_id: number;
    userstatus_id: number;
    validitytime_id?: number;
    scholarshiptype_id?: number;
    usercareer_id?: number;
    emailVerified: Date | null;
    usercareer: string;
    userstatus: string;
    scholarshiptype: string;
}

export type NewUser = {
    name: string;
    file?: string;
    dni?: string;
    address?: string;
    phone?: string;
    careerlevel?: string;
    email: string;
    password: string;
    laboratory_id?: number;
    usertype_id: number;
    userstatus_id: number;
    validitytime_id?: number;
    scholarshiptype_id?: number;
    usercareer_id?: number;
}

export type Usertype = {
    id: number;
    name: string;
}

export type Laboratory = {
    id: number;
    name: string;
}