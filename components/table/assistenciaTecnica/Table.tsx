import { useState, useEffect } from "react"
import Api from "../../../service/api/assistenciaTecnica/Assistencia"
import style from "./style.module.css";
import { BsInfoCircle } from "react-icons/bs"

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

export default function Table() {
    const [data, setData] = useState<ordemServicoProps[]>([]);
    useEffect(() => {

        Api.get("/ordem-servico")
            .then(res => setData(res.data))
            .catch(err => console.log(err))
    }, [])
    return (
        <main className={style.container_body} >
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
                                Info
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
                                    <td>{item.maquinas.length}</td>
                                    <td>
                                        <BsInfoCircle />
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