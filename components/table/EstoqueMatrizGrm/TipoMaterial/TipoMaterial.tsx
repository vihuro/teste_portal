"use client"
import { useEffect, useState } from "react"
import Api from "../../../../service/api/matriz/estoque-grm";
import style from "./style.module.css";
import ButtonUi from "../../../UI/button/Button";
import CardNovo from "./CardNovo/Card";

interface tipoProps {
    alteracao: userProps,
    cadastro: userProps,
    id: string,
    tipo: string
}
interface userProps {
    apelido: string,
    dataHora: Date,
    id: string,
    nome: string
}
export default function Table() {
    const [data, setData] = useState<tipoProps[]>([]);
    const [toogleCardNovo, setToogleNovo] = useState<boolean>(false);

    const { Button } = ButtonUi();
    useEffect(() => {
        FecthData();
    }, []);
    async function FecthData() {
        Api.get("/tipo-material")
            .then(res => setData(res.data))
            .catch(err => console.log(err))
    }
    return (
        <main className={style.container} >
            <div className={
                toogleCardNovo ?
                    style.cardNovo :
                    style.cardNovo_close} >
                <CardNovo
                    changeToogle={setToogleNovo}
                    refreshTable={FecthData}
                />

            </div>
            <header className={style.title} >
                <h3>Tipo de material</h3>
                <section>
                    <Button
                        classUi="default"
                        color="blue"
                        text="Adicionar novo tipo"
                        onClick={() => setToogleNovo(true)}
                    />
                </section>
            </header>
            <section className={style.containerTable} >
                <div className={style.wrapContainerTable} >
                    <table className={style.table} >
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tipo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && (
                                data.map((item, index) => (
                                    <tr key={index}>
                                        <td>
                                            {item.id}
                                        </td>
                                        <td>
                                            {item.tipo}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    )
}