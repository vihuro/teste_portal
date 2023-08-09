import { ReactNode, useEffect } from "react";
import style from "./style.module.css";

type BodyProps = {
    children: ReactNode,
    changeToogleAlterarSenha: Function
}

export default function Body({ children, changeToogleAlterarSenha, toogleCardAlterarSenha }: {
    children: ReactNode,
    changeToogleAlterarSenha: Function,
    toogleCardAlterarSenha: boolean
}) {


    return (
        <div className={style.body} onClick={() => changeToogleAlterarSenha()} >
            {children}
        </div>
        // <div className={style.body} >
        //     {children}
        // </div>
    )
}