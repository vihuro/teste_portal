import { cookies } from "next/headers";


var myCokies = cookies();

async function GetAll() {
    const teste = myCokies.getAll();

    return teste;
}


export function Cookies() {
    return {
        GetAll
    }
}