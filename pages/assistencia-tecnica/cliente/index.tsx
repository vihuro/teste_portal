import { GetServerSideProps } from "next";
import { Menu, Actions } from "../../../components/menuBar/MenuBar";
import { validateToken } from "../../../components/privatePage/PrivatePage";
import Body from "../../../components/table/Body";
import Table from "../../../components/table/assistenciaTecnica/clientAssistencia/Table";

export default function Cliente() {

    return (
        <main>
            <Menu idList={4} />
            <Body changeToogleAlterarSenha={Actions().setToogleValue} toogleCardAlterarSenha={Actions().toogleValue} >
                <Table />
            </Body>
        </main>
    )
}
export const getServerSideProps: GetServerSideProps = async (context) => {
    const info = await validateToken(context);


    if (!info) {
        return {
            props: {}
        }
    }

    return {
        props: {},
        redirect: {
            destination: info.redirect.destination,
            permanent: info.redirect.permanent,
        }
    }
}
