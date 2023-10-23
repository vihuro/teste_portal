import { useEffect, useState } from "react"
import Api from "../../../service/api/assistenciaTecnica/Assistencia"
import style from "./style.module.css";
import { DateTimeStringFormat } from "../../../components/utils/DateTimeString";

interface dataProps {
    numeroOrcamento: number,
    maquina: maquinaProps,
    cadastro: userProps,
    alteracao: userProps,
    descricaoServico: string
}
interface maquinaProps {
    codigoMaquina: string,
    descricaoMaquina: string,
    maquinaId: string,
    numeroSerie: string
}
interface userProps {
    apelido: string,
    dataHora: Date,
    nome: string,
    userId: string
}

export default function Bi() {
    const [data, setData] = useState<dataProps[]>([]);
    useEffect(() => {
        Api.get("/orcamento")
            .then(res => {
                setData(res.data)
                console.log(res.data)
            })
            .catch(err => console.log(err))
    }, [])
    return (
        <table className={style.table} >
            <thead>
                <tr>
                    <th>Nº OS</th>
                    <th>MODELO</th>
                    <th>Nº SÉRIE</th>
                    <th>DESCRIÇÃO</th>
                    <th>TÉCNICO</th>
                    <th>DATA DE ABERTURA</th>
                    <th>HORARIO INICIO</th>
                    <th>TEMPO MAXIMO</th>
                    <th>PERFORMANCE TECNICO</th>
                    <th>STATUS</th>
                </tr>
            </thead>
            <tbody className={style.tableBody} >
                {data && (
                    data.map((item, index) => (
                        <tr key={index} >
                            <td>{item.numeroOrcamento}</td>
                            <td>{item.maquina.descricaoMaquina}</td>
                            <td>{item.maquina.numeroSerie}</td>
                            <td>{item.descricaoServico}</td>
                            <td>VITOR HUGO</td>
                            <td>{DateTimeStringFormat(item.cadastro.dataHora)}</td>
                            <td></td>
                            <td></td>
                            <td>AGUARDANDO ORÇAMENTO</td>

                        </tr>
                    ))
                )}
            </tbody>
        </table>
    )
}