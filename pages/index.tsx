import MenuBar from "../components/menuBar/MenuBar";
import Body from "../components/table/Body";

import Table from "../components/table/TabeStorage/Table";

export default function Home() {
    return (
        <section>
            <MenuBar />
            <Body>
                <Table />
            </Body>
        </section>
    )
}