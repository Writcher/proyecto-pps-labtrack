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
    nombre: string;
    email: string;
    password: string;
    legajo: string;
    usertype_id: number;
    laboratory_id: number;
}