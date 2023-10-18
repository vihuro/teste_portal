import { useState } from "react";
import styles from "./style.module.css";
import Api from "../../../../../service/api/assistenciaTecnica/Assistencia";
import ButtonUi from "../../../../UI/button/Button";
import TokenDrecriptor from "../../../../../service/DecriptorToken";
import { tokenProps } from "../../../../utils/infoToken";
import { parseCookies } from "nookies";

interface Props {
    changeToogle: Function
}

interface ResponseProps {
    total: number,
    data: dataProps[]
}
interface dataProps {
    codigoRadar: string,
    descricao: string,
    familia: string,
    unidade: string
}

export default function Card({ fetchData }: { fetchData: Function }) {


    const [data, setData] = useState<ResponseProps>();
    const tokenInfo: tokenProps = TokenDrecriptor(parseCookies().ACCESS_TOKEN)

    async function FetchData() {
        await Api.get("assistencia-tecnica/pecas/nao-cadastrados")
            .then(res => setData(res.data))
            .catch(err => console.log(err))
    }
    const { Button } = ButtonUi();
    async function AtualizarTabela() {
        await Api.post(`assistencia-tecnica/pecas/${tokenInfo.idUser}`)
            .then(res => {
                FetchData()
                fetchData()
            })
            .catch(err => console.log(err))
    }

    function Form({ changeToogle }: Props) {
        return (

            <form className={styles.card} action="">
                <header>
                    <h3>PEÇAS RADAR</h3>
                </header>
                <main className={styles.container_body} >
                    <label htmlFor="">PEÇAS NÃO CADASTRADAS: {data?.total}</label>
                    <section className={styles.container_table} >
                        <table className={styles.table} >
                            <thead>
                                <tr>
                                    <th>CÓDIGO</th>
                                    <th>DESCRIÇÃO</th>
                                    <th>UNIDADE</th>
                                    <th>FAMÍLIA</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data && (
                                    data.data.map((item, index) => (
                                        <tr key={index} >
                                            <td>{item.codigoRadar}</td>
                                            <td>{item.descricao}</td>
                                            <td>{item.unidade}</td>
                                            <td>{item.familia}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </section>
                </main>
                <footer className={styles.footer} >
                    <div>
                        <Button
                            classUi="glass"
                            color="green"
                            text="ATUALIZAR LISTA"
                            onClick={() => AtualizarTabela()}
                            type="button"
                        />
                    </div>
                    <div>
                        <Button
                            classUi="glass"
                            color="red"
                            text="FECHAR"
                            type="button"
                            onClick={() => changeToogle(false)}
                        />
                    </div>
                </footer>
            </form>
        )
    }

    return {
        Form,
        FetchData
    }
}