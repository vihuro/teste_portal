import MenuBar from "../../../../../components/menuBar/MenuBar";
import Body from "../../../../../components/table/Body";
import  Table from "../../../../../components/table/EstoqueMatrizGrm/SelectTable";

export default function EstoqueMatrizGerencial() {
    const { Page, setToogleValue, toogleValue } = MenuBar();
    return (
        <>
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