import Head from "next/head";
import MenuBar from "../../../../../components/menuBar/MenuBar";
import Body from "../../../../../components/table/Body";
import Table from "../../../../../components/table/EstoqueMatrizGrm/SelectTable";

export default function EstoqueMatrizGerencial() {
    const { Page, setToogleValue, toogleValue } = MenuBar();
    return (
        <>
            <Head>
                <title>
                    THR | GERENCIAL | GRM
                </title>

            </Head>
            <Page />
            <Body
                changeToogleAlterarSenha={setToogleValue}
                toogleCardAlterarSenha={toogleValue}
            >
                <Table />
            </Body>
        </>
    )

}