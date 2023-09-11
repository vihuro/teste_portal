import { GetServerSideProps } from "next";
import MenuBar from "../../../../components/menuBar/MenuBar";
import Body from "../../../../components/table/Body";
import Table from "../../../../components/table/tabeStorageMatrizGrm/Table";
import SecondTable from "../../../../components/table/tabeStorageMatrizGrm/Table";
import { validateToken } from "../../../../components/privatePage/PrivatePage";
import Head from "next/head";

export default function Estoque() {
    const { Page, setToogleValue, toogleValue } = MenuBar();
    return (
        <section >
            <Head>
                <title>
                    THR | MATRIZ | GRM
                </title>
            </Head>
            <Page />
            <Body changeToogleAlterarSenha={setToogleValue} toogleCardAlterarSenha={toogleValue ?? false}>
                <SecondTable />
            </Body>
        </section>
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
