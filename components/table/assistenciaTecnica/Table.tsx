import { useState, useEffect } from "react"
import Api from "../../../service/api/assistenciaTecnica/Assistencia"
import style from "./style.module.css";
import { BsInfoCircle } from "react-icons/bs"
import CardAdd from "./cardAdd/Card";
import CardTecnico from "./cardTecnico/Card";

interface ordemServicoProps {
    descricao: string,
    id: number,
    maquinas: maquinaProps[],
    status: string
}
interface maquinaProps {
    maquinaId: string,
    maquina: string
}

const info = []

export default function Table() {
    const [data, setData] = useState<ordemServicoProps[]>([]);
    const [toogleCardAdd, setToogleCardAdd] = useState<boolean>(false);
    const [toogleCarTecnico, setToogleTecnico] = useState<boolean>(false);
    const [dataItemString, setDataItemString] = useState<string>("");

    useEffect(() => {

        Api.get("/ordem-servico")
            .then(res => setData(res.data))
            .catch(err => console.log(err))
    }, [])

    return (
        <main className={style.container_body} >
            <div className={toogleCardAdd ? style.cardAdd : style.cardAdd_close} >
                <CardAdd changeToogle={setToogleCardAdd} />
            </div>
            <div className={toogleCarTecnico ? style.cardTenico : style.cardTecnico_close} >
                <CardTecnico changeToogle={setToogleTecnico} />
            </div>
            <div className={style.container_button} >
                <button onClick={() => setToogleCardAdd(!toogleCardAdd)} style={{
                    padding: 10,
                    width: 250,
                    fontSize: 18,
                    border: "none",
                    background: "rgb(255,192,0)",
                    fontWeight: 800,
                    borderRadius: 10
                }} >
                    Nova OS
                </button>
                <button style={{
                    width: 250,
                    fontSize: 18,
                    padding: 10,
                    border: "none",
                    background: "rgb(255,192,0)",
                    fontWeight: 800,
                    borderRadius: 10
                }} >
                    Filtro
                </button>
            </div>
            <main className={style.container_table} >
                <table className={style.table} >
                    <thead>
                        <tr>
                            <th>
                                ID
                            </th>
                            <th>
                                Descrição
                            </th>
                            <th>
                                Status
                            </th>
                            <th>
                                Maq.
                            </th>
                            <th>
                                Técnico
                            </th>
                            <th>
                                Finalidade
                            </th>
                            <th>
                                DT / Inicio
                            </th>
                            <th>
                                DT / Termino
                            </th>
                            <th>
                                Info
                            </th>
                            <th>

                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.length > 0 && (
                            data.map((item, index) => (
                                <tr>
                                    <td>{item.id}</td>
                                    <td>{item.descricao}</td>
                                    <td>{item.status}</td>
                                    <td>TP - 90</td>
                                    <td>Bruno</td>
                                    <td>Orçamento</td>
                                    <td>01/09 13:00</td>
                                    <td></td>
                                    <td>
                                        <BsInfoCircle />
                                    </td>
                                    <td>
                                        <span onClick={() => setToogleTecnico(!toogleCarTecnico)} style={{
                                            color: "red",
                                        }} >
                                            Atendimento
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </main>
        </main>

    )
}