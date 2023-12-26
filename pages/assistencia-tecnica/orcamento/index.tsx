import { GetServerSideProps } from "next";
import { Actions, Menu } from "../../../components/menuBar/MenuBar";
import Body from "../../../components/table/Body";
import Table from "../../../components/table/assistenciaTecnica/orcamento/Table";
import { validateToken } from "../../../components/privatePage/PrivatePage";
import styles from "./style.module.css";

export default function Orcamento() {
  return (
    <main className={styles.body}>
      <section className={styles.header} >
        <Menu idList={4} />
      </section>
      <main className={styles.main} >
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
