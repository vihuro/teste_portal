import { ElementType, InputHTMLAttributes } from "react"
import style from "./style.module.css";

type inputProps = {
    text?: string,
    id: string,
    iconLeft?: iconProps,
    iconRight?: iconProps,
    blocked?: boolean,
} & InputHTMLAttributes<HTMLInputElement>

interface iconProps {
    icon: ElementType,
    action: Function
}

function Input({
    text,
    id,
    iconLeft: IconLeft,
    iconRight: IconRight,
    blocked,
    ...rest }: inputProps) {


    return (
        <section className={
            IconLeft || IconRight ?
                style.container_input_icon :
                style.container_input} >
            {IconLeft && (
                <button className={style.button} type="button" onClick={() => IconLeft.action()} >
                    <IconLeft.icon />
                </button>
            )}
            <input
                className={style.input}
                id={id}
                required
                style={{
                    background: blocked ? "#8080804f" : "transparent",
                    color: blocked ? "gray" : "black"
                }}
                {...rest}
            />
            {text && (
                <label className={style.label} htmlFor={id}>{text}</label>
            )}
            {IconRight && (
                <button className={style.button} type="button" onClick={() => IconRight.action()} >
                    <IconRight.icon />
                </button>
            )}
        </section>
    )
}

export default function InputUi() {
    return {
        Input
    }
}