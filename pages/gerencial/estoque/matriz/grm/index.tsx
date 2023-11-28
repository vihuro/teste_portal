import Head from "next/head";
import { Actions, Menu } from "../../../../../components/menuBar/MenuBar";
import Body from "../../../../../components/table/Body";
import Table from "../../../../../components/table/EstoqueMatrizGrm/SelectTable";

export default function EstoqueMatrizGerencial() {
    return (
        <>
            <Head>
                <title>
                    THR | GERENCIAL | GRM
                </title>

            </Head>
            <Menu idList={5} />
            <Body
                changeToogleAlterarSenha={Actions().setToogleValue}
                toogleCardAlterarSenha={Actions().toogleValue}
            >
                <Table />
            </Body>
        </>
    )

}