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



export type Usertype = {
    id: number;
    name: string;
}

export type Laboratory = {
    id: number;
    name: string;
}

export type User = {   //Usuarios
    id: number;
    name: string;
    email: string;
    password: string;
    file: string;
    usertype_id: number;
    laboratory_id: number;
}

export type NewUser = {   //Usuarios
    name: string;
    email: string;
    password: string;
    file: string;
    usertype_id: number;
    laboratory_id: number;
}