import Head from "next/head";
import { Menu, Actions } from "../../../components/menuBar/MenuBar";
import Body from "../../../components/table/Body";
import Table from "../../../components/table/Login/Table";
import styles from "./style.module.css";

export default function Login() {
  return (
    <main className={styles.body} >
      <Head>
        <title>THR | GERENCIAL | LOGIN</title>
      </Head>
      <section className={styles.header}>
        <Menu idList={5} />
      </section>
      <main className={styles.main}>
        <Body
          changeToogleAlterarSenha={Actions().setToogleValue}
          toogleCardAlterarSenha={Actions().toogleValue}
        >
          <Table />
        </Body>
      </main>
    </main>
  );
}
