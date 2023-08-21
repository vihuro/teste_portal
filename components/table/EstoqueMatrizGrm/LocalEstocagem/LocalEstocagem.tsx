import Api from "../../../../service/api/matriz/estoque-grm";
import ButtonUi from "../../../UI/button/Button";
import style from "./style.module.css";
import { useState, useEffect } from "react";
import CardNovo from "./CardNovo/Card";

interface resultProps {
    totalItems: number,
    data: localProps[]
}
interface localProps {
    id: string,
    ativo: boolean,
    cadastro: userProps,
    local: string
}
interface userProps {
    apelido: string,
    dataHora: Date,
    id: string,
    nome: string
}


export default function Table() {
    const [data, setData] = useState<localProps[]>([]);
    const [toogleCardNovo, setToogleNovo] = useState<boolean>(false);
    const { Button } = ButtonUi();
    useEffect(() => {
        FechData();
    }, [])
    async function FechData() {
        await Api.get("/local")
            .then(res => setData(res.data.data))
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
                    refreshTable={FechData}
                />
            </div>
            <header className={style.title} >
                <h3>
                    Adicionar novo local
                    <Button
                        classUi="defaut"
                        color="blue"
                        text="Adicionar novo local"
                        onClick={() => setToogleNovo(true)}
                    />
                </h3>
            </header>
            <section className={style.containerTable} >
                <div className={style.wrapContainerTable} >
                    <table className={style.table} >
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Local</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && (
                                data.map((item, index) => (
                                    <tr key={index} >
                                        <td>{item.id}</td>
                                        <td>{item.local}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>

                    </table>

                </div>

            </section>
        </main >
    )
}