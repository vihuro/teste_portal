"use client"
import TokenDrecriptor from "../../../service/DecriptorToken";
import style from "./style.module.css";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { BiUser } from "react-icons/bi";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import path from "path";

interface tokenProps {
    Nome: string,
    active: boolean,
    idUser: string,
    unique_name: string
}

export default function TopBarSide() {
    const [valueToken, setValueToken] = useState<tokenProps>();
    const [toogleValue, setToogleValue] = useState<boolean>(true);


    useEffect(() => {
        const token = parseCookies().ACCESS_TOKEN;
        setValueToken(TokenDrecriptor(token));

    }, [])

    const navigation = useRouter();

    function TopBar() {
        return (
            <div className={style.header} >
                <div className={style.iconUser} onClick={e => { }} >
                    <div className={toogleValue ? style.card : style.card_close}
                    >
                        <ul  >
                            <li onClickCapture={e => console.log("Alterar senha")} >Alterar senha</li>
                            <li onClickCapture={e => {
                                destroyCookie(null,"ACCESS_TOKEN",{
                                    path:"/"
                                })
                                navigation.push("/login")

                            }}>
                                Sair

                            </li>
                        </ul>
                    </div>
                    <div><BiUser /></div>
                    {valueToken && (
                        valueToken.Nome && (
                            <div>
                                <label htmlFor="">{valueToken.Nome}</label>
                            </div>
                        )

                    )}

                </div>
            </div>
        )

    }

    return {
        TopBar,
        toogleValue,
        setToogleValue
    }

}

