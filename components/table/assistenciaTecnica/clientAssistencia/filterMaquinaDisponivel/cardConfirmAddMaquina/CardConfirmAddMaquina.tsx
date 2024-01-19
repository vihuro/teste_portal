import { useState } from "react";
import RadioButton from "../../../../../UI/input/radio/RadioButton";
import styles from "./style.module.css";

interface CardConfirmAddMaquinaProps {
  changeToogle: Function;
  toogle: boolean;
  addMaquinaInCliente: Function;
}
export default function CardConfirmAddMaquina({}: CardConfirmAddMaquinaProps) {
  const { Radio } = RadioButton();
  enum TipoAquisicao {
    VENDA = 1,
    EMPRESTIVO = 2,
  }
  const [valueTipoAquisicao, setValueTipoAquisicao] = useState<TipoAquisicao>(
    TipoAquisicao.VENDA
  );

  const blockedInputDataSugerida =
    valueTipoAquisicao === TipoAquisicao.EMPRESTIVO ? false : true;

  return (
    <div className={styles.container}>
      <div className={styles.wrapContainer}>
        <header className={styles.header}>
          Deseja adicionar essa máquina para o cliente?
        </header>
        <main className={styles.body}>
          <div className={styles.wrapBody}>
            <div className={styles.containerRadioButton}>
              <Radio
                color="green"
                name="tipoAquisicao"
                id="rdbVenda"
                text="VENDA"
                checked={valueTipoAquisicao === TipoAquisicao.VENDA ?? true}
                onChange={() => setValueTipoAquisicao(TipoAquisicao.VENDA)}
              />
              <Radio
                color="green"
                name="tipoAquisicao"
                id="rdbEmprestimo"
                text="EMPRÉSTIMO"
                checked={
                  valueTipoAquisicao === TipoAquisicao.EMPRESTIVO ?? true
                }
                onChange={() => setValueTipoAquisicao(TipoAquisicao.EMPRESTIVO)}
              />
            </div>
            <div
              className={`${styles.inputDataSugerida} ${
                blockedInputDataSugerida && styles["--block"]
              }`}
            >
              <input
                readOnly={blockedInputDataSugerida}
                id="txtDataSugerida"
                title="Data sugerida de retorno"
                type="date"
              />
              <label htmlFor="txtDataSugerida">DATA SUGERIDA</label>
            </div>
          </div>
        </main>
        <footer className={styles.footer}>
          <button>ADICIONAR</button>
          <button>CANCELAR</button>
        </footer>
      </div>
    </div>
  );
}
