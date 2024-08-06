import { sql } from '@vercel/postgres';
import {
    Usertype,
    Laboratory,
    User
} from './definitions';

export async function fetchUserType() {
    try {
        const data = await sql<Usertype>`SELECT * FROM usertype`;
        return data.rows;
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo obtener usertype");
    }
}

export async function fetchLab() {
    try {
        const data = await sql<Laboratory>`SELECT * FROM laboratory`;
        return data.rows;
    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo obtener laboratory");
    }
}

const users = [
    {
        email: "joaquingim77@gmail.com",
        password: "123456",
        name: "Joaquin Gimenez"  
    }
]


export const getUserByEmail = (email: string) => {
    const found = users.find(user => user.email === email);
    return found;
}