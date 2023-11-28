import Head from "next/head";
import { Menu, Actions } from "../../../components/menuBar/MenuBar";
import Body from "../../../components/table/Body";
import Table from "../../../components/table/Login/Table";


export default function Login() {

    return (
        <>
            <Head>
                <title>
                    THR | GERENCIAL | LOGIN
                </title>
            </Head>
            <Menu idList={5} />
            <Body changeToogleAlterarSenha={Actions().setToogleValue}
                toogleCardAlterarSenha={Actions().toogleValue} >
                <Table />
            </Body>
        </>

    )
}