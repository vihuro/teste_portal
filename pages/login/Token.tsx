"use server"
import { cookies } from "next/headers";



interface tokenProps {
    value: string,
    name: string
}

async function CadastrarToken(data: tokenProps) {
    cookies().set({
        name: data.name,
        value: data.value,
        httpOnly: true,
        path: "/"
    })

}

export async function Token() {
    return {
        CadastrarToken
    }
}