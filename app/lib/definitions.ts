export type ABMcreate = {
    name: string;
    table: string;
}

export type ABMdelete = {
    id: number;
    table: string;
}

export type Supplytype = {
    id: number;
    name: string;
}

export type NewSupplytype = {
    name: string;
}

export type Proyecttype = {
    id: number;
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