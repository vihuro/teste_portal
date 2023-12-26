import { GetServerSideProps } from "next";
import { Menu, Actions } from "../../../components/menuBar/MenuBar";
import { validateToken } from "../../../components/privatePage/PrivatePage";
import Body from "../../../components/table/Body";
import Table from "../../../components/table/assistenciaTecnica/clientAssistencia/Table";
import styles from "./style.module.css"

export default function Cliente() {
  return (
    <section className={styles.body}  >
      <header className={styles.header} >
        <Menu idList={4} />
      </header>
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
