import InputUi from "../../../UI/input/Input";
import styles from "./style.module.css";

export default function Info({ changeToogle }: { changeToogle: Function }) {

    const { Input } = InputUi();

    return (
        <main className={styles.containerInfo} >
            <header>
                <button onClick={() => changeToogle(false)} >
                    BACK
                </button>
            </header>
            <main className={styles.containerBody} >
                <div className={styles.containerExecucao} >
                    <Input
                        id="txtExecucaoChange"
                        text="EXECUÇÃO"
                        blocked
                    />
                </div>
                <div className={styles.containerTipoServico} >
                    <Input
                        id="txtTipoServicoChange"
                        text="TIPO/SERV."
                        blocked
                    />
                </div>
                <div className={styles.containerCategoriaServico} >
                    <Input
                        id="txtCategoriaServicoChange"
                        text="CATEGORIA/SERV."
                        blocked
                    />
                </div>
                <div className={styles.containerDataIdeal} >
                    <Input
                        id="txtDataIdealServico"
                        type="date"
                    />
                </div>
                <div className={styles.containerPrioridade} >
                    <input type="text" />
                    <label htmlFor=""></label>
                </div>
                <div className={styles.containerTecnico}>
                    <input type="text" />
                    <label htmlFor="">TÉCNICO</label>
                </div>
            </main>
        </main>
    )
}