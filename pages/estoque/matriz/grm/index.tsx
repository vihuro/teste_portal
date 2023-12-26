import { GetServerSideProps } from "next";
import { Menu, Actions } from "../../../../components/menuBar/MenuBar";
import Body from "../../../../components/table/Body";
import SecondTable from "../../../../components/table/tabeStorageMatrizGrm/Table";
import { validateToken } from "../../../../components/privatePage/PrivatePage";
import Head from "next/head";
import styles from "./style.module.css";

export default function Estoque() {
  return (
    <main className={styles.body}>
      <Head>
        <title>THR | MATRIZ | GRM</title>
      </Head>
      <section className={styles.header}>
        <Menu />
      </section>
      <main className={styles.main}>
        <Body
          changeToogleAlterarSenha={Actions().setToogleValue}
          toogleCardAlterarSenha={Actions().toogleValue ?? false}
        >
          <SecondTable />
        </Body>
      </main>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const info = await validateToken(context);

  if (!info) {
    return {
      props: {},
    };
  }

  return {
    props: {},
    redirect: {
      destination: info.redirect.destination,
      permanent: info.redirect.permanent,
    },
  };
};
