import Menu from "../../../components/menuBar/MenuBar";
import Body from "../../../components/table/Body";
import Table from "../../../components/table/assistenciaTecnica/orcamento/Table";

export default function Orcamento() {
    const { Page, setToogleValue, toogleValue } = Menu()

    return (
        <main>
            <Page />
            <Body changeToogleAlterarSenha={setToogleValue} toogleCardAlterarSenha={toogleValue} >
                <Table />
            </Body>
        </main>
    )
}