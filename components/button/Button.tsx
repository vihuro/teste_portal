import { ButtonHTMLAttributes } from "react";


type buttonProps = {
    text: string,
    classUi: string,
    color: string,
} & ButtonHTMLAttributes<HTMLButtonElement>

function Button({
    text = "",
    classUi,
    color,
    ...rest
}: buttonProps) {

    return (
        <button  {...rest} >
            {text}
        </button>
    )
}

export default function ButtonUi() {
    return {
        Button
    }
}