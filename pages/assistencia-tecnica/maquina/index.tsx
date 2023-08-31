import Menu from "../../../components/menuBar/MenuBar";
import Body from "../../../components/table/Body";
import Table from "../../../components/table/assistenciaTecnica/maquina/Table";

export default function Maquina(){
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