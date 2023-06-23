import MenuBar from "../components/menuBar/MenuBar";
import Table from "../components/table/TabeStorage/Table";
import style from "./style.module.css";

export default function Home() {
    return (
        <div  >
            <MenuBar />
            <div className={style.body} >
                <Table />
            </div>
        </div>
    )
}