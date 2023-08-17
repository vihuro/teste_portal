import { ButtonHTMLAttributes } from "react";
import style from "./style.module.css";


type buttonProps = {
    text: string,
    classUi: string,
    color: string,
} & ButtonHTMLAttributes<HTMLButtonElement>

function Button({
    text = "",
    classUi,
    color = "",
    ...rest
}: buttonProps) {
    const containerClass = classUi === "glass" ?
        `${style.container_button} ${style[`--${color}`] }` :
        style.container_button;

    return (
        <>
            {classUi === "glass" ?
                <section className={containerClass} >
                    <button  {...rest} >
                        <span>
                            {text}
                        </span>
                    </button>
                </section>
                :
                <button {...rest}>
                    {text}
                </button>
            }

        </>
    )
}

export default function ButtonUi() {
    return {
        Button
    }
}