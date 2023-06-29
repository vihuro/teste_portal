import MenuBar from "../components/menuBar/MenuBar";
import Table from "../components/table/TabeStorage/Table";
import TableTeste from "../components/table/TabeStorage/newTable";
import style from "./style.module.css";

export default function Home() {
    return (
        <div  >
            <MenuBar />
            <div className={style.body} >
                <TableTeste />
                {/* <Table /> */}
            </div>
        </div>
    )
}