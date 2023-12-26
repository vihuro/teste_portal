"use cliente";

import styles from "./style.module.css";
import { Menu, Actions } from "../../components/menuBar/MenuBar";
import Body from "../../components/table/Body";
import { useState } from "react";

export default function Teste() {
  const [toogle, setToogle] = useState<boolean>(false);
  return (
    <main className={styles.main}>
      <section>
        <Menu />
      </section>
      <body className={styles.body}>
        <Body
          changeToogleAlterarSenha={Actions().setToogleValue}
          toogleCardAlterarSenha={Actions().toogleValue}
        >
          <section
            className={`${styles.card} ${!toogle && styles["--close"]}`}
          >
            <div className={styles.wrap_card} >

            </div>
          </section>
          <span>Olá mundo</span>
        </Body>
      </body>
    </main>
  );
}
