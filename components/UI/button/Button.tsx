import { ButtonHTMLAttributes, ElementType } from "react";
import style from "./style.module.css";


type buttonProps = {
    text?: string,
    classUi: string,
    color: string,
    theme?: string,
    icon?: ElementType
} & ButtonHTMLAttributes<HTMLButtonElement>

function Button({
    text = "",
    classUi,
    color = "",
    icon: Icon,
    theme,
    ...rest
}: buttonProps) {
    const containerClass = classUi === "glass" ?
        `${style.container_button} ${style[`--${color}`]}` :
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
                <button
                    className={`${style.button} 
                               ${theme ?? style[`--${theme}`]}
                                ${style[`--${color}`]}`}
                    {...rest}>
                    {Icon && (
                        <Icon />
                    )}
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