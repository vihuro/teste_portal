import style from "./style.module.css";

function Card({ toogle, changeToogle }:
    { toogle: boolean, changeToogle: Function }) {
    return (
        <form className={style.card} action="">

        </form>
    )
}

export default function CardEdit() {
    return {
        Card
    }
}