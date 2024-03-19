import { IGetMaquinaEmprestimo } from "../IMaquinaEmprestimo";
import styles from "./style.module.css";

interface CardAtualizarProps {
  changeTooge: Function;
  toogle: boolean;
  maquinaEmEmpresitmo: IGetMaquinaEmprestimo | undefined;
}

export default function CardAtualizar({}: CardAtualizarProps) {
  return (
    <section className={styles.container}>
      <header className={styles.header} >ALTERAR DATA DE EMPRÉSTIMO</header>
      <main className={styles.main}>
        <div>
            <input type="text" />
            <label htmlFor="">DATA RETORNO DIR.</label>
        </div>
      </main>
      <footer className={styles.footer}>
        <button>CONFIRMAR</button>
        <button>FECHAR</button>
      </footer>
    </section>
  );
}
