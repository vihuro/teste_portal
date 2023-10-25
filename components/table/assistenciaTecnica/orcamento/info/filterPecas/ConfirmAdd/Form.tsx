import styles from "./style.module.css";

import { IPecaProps } from "../../../../pecas/IPeca";
import RadioButton from "../../../../../../UI/input/radio/RadioButton";
import { handleNumericDecimal } from "../../../../../../utils/HandleNumericDecimal"
import { useState } from "react";

interface Props {
    peca?: IPecaProps,
    changeToogle: Function,
    refreshBudget: Function
}

function Form({ peca, changeToogle }: { peca?: IPecaProps, changeToogle: Function }) {
    const { Radio } = RadioButton()

    const [textQuantity, setTextQuantity] = useState<string>("");

    const hadleChangeTextNumeric = (text: string) => {
        const value = handleNumericDecimal(text);

        setTextQuantity(() => value);
    }


    return (
        <div className={styles.containerForm} >
            <header>
            </header>
            <main>
                <span>
                    Deseja adicionar o código
                    <strong>
                        {peca?.codigoRadar}
                    </strong> a esse orçamento?
                </span>
                <div className={styles.containerQuantidade} >
                    <div>
                        <input
                            required
                            id="txtQuantidade"
                            type="text"
                            value={textQuantity}
                            onChange={(e) => hadleChangeTextNumeric(e.target.value)}
                            autoComplete="off" />
                        <label htmlFor="txtQuantidade">QUANTIDADE</label>
                    </div>
                </div>
                <div className={styles.containerRadio} >
                    <div>
                        <Radio
                            color="green"
                            id="tipoUsoTroca"
                            name="tipoUso"
                            text="TROCA" />
                    </div>
                    <div>
                        <Radio
                            color="green"
                            id="tipoUsoReuso"
                            name="tipoUso"
                            text="TR/RU" />
                    </div>
                </div>
            </main>
            <footer className={styles.footer} >
                <div>
                    <button>
                        ADICIONAR
                    </button>
                </div>
                <div>
                    <button onClick={() => changeToogle((current: boolean) => !current)}>
                        FECHAR
                    </button>
                </div>
            </footer>
        </div>
    )
}


export { Form }