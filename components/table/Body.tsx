import { ReactNode } from "react";
import style from "./style.module.css";

type BodyProps = {
    children: ReactNode
}

export default function Body({ children }: BodyProps) {
    return (
        <div className={style.body} >
            {children}
        </div>
    )
}