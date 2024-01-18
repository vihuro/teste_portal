import styles from "./style.module.css";

interface CardConfirmAddMaquinaProps {
  changeToogle: Function;
  toogle: boolean;
  addMaquinaInCliente: Function;
}
export default function CardConfirmAddMaquina({}: CardConfirmAddMaquinaProps) {
  return (
    <div className={styles.container}>
      <div className={styles.wrapContainer}>
        <header className={styles.header}>
          Deseja adicionar essa máquina para o cliente?
        </header>
        <main className={styles.body}>
          <div className={styles.wrapBody}>
            <div className={styles.inputDataSugerida}>
              <input title="Data sugerida de retorno" type="date" />
              <label htmlFor="">DATA SUGERIDA</label>
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
