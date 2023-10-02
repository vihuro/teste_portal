import styles from "./style.module.css";


export default function Card({ changeToogle }: { changeToogle: Function }) {
    return (
        <form className={styles.form} action="">
            <div className={styles.container} >
                <button type="button" onClick={() => changeToogle(false)}>
                    FECHAR
                </button>
            </div>
        </form>
    )
}