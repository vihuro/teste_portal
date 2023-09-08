import Head from "next/head";
import MenuBar from "../../../components/menuBar/MenuBar";
import Body from "../../../components/table/Body";
import Table from "../../../components/table/Login/Table";


export default function Login() {
    const { Page, setToogleValue, toogleValue } = MenuBar();
    return (
        <>
            <Head>
                <title>
                    THR | GERENCIAL | LOGIN
                </title>
            </Head>
            <Page />
            <Body changeToogleAlterarSenha={setToogleValue} toogleCardAlterarSenha={toogleValue} >
                <Table />
            </Body>
        </>

    )
}