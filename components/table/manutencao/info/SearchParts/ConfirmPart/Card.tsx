import { IParts } from "../IParts";
import styles from "./styles.module.css";

interface Props {
    parts: undefined | IParts,
    changeToogle: Function,
    toogle: boolean
}

export default function Card({ changeToogle, parts, toogle }: Props) {
    return (
        <div className={styles.container} >
            <section className={styles.text} >
                <span>
                    Deseja solicitar o código
                    <strong> {parts?.code}</strong> ({parts?.description})
                </span>
            </section>
            <section className={styles.input} >
                <div className={styles.wrapInput} >
                    <input required type="text" />
                    <label htmlFor="">QUANTIDADE</label>
                </div>
            </section>
            <footer className={styles.footer} >
                <button>SOLICITAR</button>
                <button onClick={() => changeToogle(false)} >CANCELAR</button>
            </footer>
        </div>
    )
}