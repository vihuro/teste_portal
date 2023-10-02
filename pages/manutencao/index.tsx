import Menu from "../../components/menuBar/MenuBar";
import Body from "../../components/table/Body";
import Table from "../../components/table/manutencao/Table";



export default function Manutencao() {
    const { Page, setToogleValue, toogleValue } = Menu();
    return (
        <main>
            <Page />
            <Body changeToogleAlterarSenha={setToogleValue} toogleCardAlterarSenha={toogleValue} >
                <Table />
            </Body>
        </main>
    )
}