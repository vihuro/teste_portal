import { Menu, Actions } from "../../components/menuBar/MenuBar"
import Body from "../../components/table/Body"
import Table from "../../components/table/storageFabrica/Table"

export default function Estoque() {
    return (
        <>
            <Menu />
            <Body changeToogleAlterarSenha={Actions().setToogleValue} toogleCardAlterarSenha={Actions().toogleValue}>
                <Table />
            </Body>

        </>
    )
}