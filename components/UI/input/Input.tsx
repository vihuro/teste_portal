import { InputHTMLAttributes } from "react"
import style from "./style.module.css";

type inputProps = {
    text?: string,
    id: string
} & InputHTMLAttributes<HTMLInputElement>

function Input({ text, id, ...rest }: inputProps) {
    return (
        <section className={style.container_input} >
            <input
                className={style.input}
                id={id}
                required
                {...rest}
            />
            {text && (
                <label className={style.label} htmlFor={id}>{text}</label>
            )}
        </section>
    )
}

export default function InputUi() {
    return {
        Input
    }
}