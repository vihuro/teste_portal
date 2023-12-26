import { GetServerSideProps } from "next";
import { Actions, Menu } from "../../../components/menuBar/MenuBar";
import Body from "../../../components/table/Body";
import Table from "../../../components/table/assistenciaTecnica/maquina/Table";
import { validateToken } from "../../../components/privatePage/PrivatePage";
import styles from "./style.module.css";

export default function Maquina() {
  return (
    <section className={styles.body}>
      <section>
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
    </section>
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
