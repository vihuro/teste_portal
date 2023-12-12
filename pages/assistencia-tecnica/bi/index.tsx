import { useEffect, useState } from "react"
import Api from "../../../service/api/assistenciaTecnica/Assistencia"
import style from "./style.module.css";
import { DateTimeStringFormat } from "../../../components/utils/DateTimeString";
import { GetServerSideProps } from "next";
import { validateToken } from "../../../components/privatePage/PrivatePage";
import { IOrcamentoProps, IStatusSitucaoProps } from "../../../components/table/assistenciaTecnica/orcamento/IOrcamento"


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
    const [data, setData] = useState<IOrcamentoProps[]>([]);
    useEffect(() => {
        Api.get("/orcamento/bi")
            .then(res => {
                setData(res.data)
                console.log(res.data)
            })
            .catch(err => console.log(err))
    }, [])
    function TempoOrcamento(situacao: IStatusSitucaoProps[]) {
        console.log(situacao)
        return "teste"
    }
    return (
        <table className={style.table} >
            <thead>
                <tr>
                    <th>Nº OS</th>
                    <th>MODELO</th>
                    <th>Nº SÉRIE</th>
                    <th>DESCRIÇÃO</th>
                    <th>TÉCNICO ORÇ.</th>
                    <th>TEMPO ORÇ.</th>
                    <th>PERFORMANCE ORÇ.</th>
                    <th>TÉCNICO MANUT.</th>
                    <th>TEMPO MANUT.</th>
                    <th>DATA DE ABERTURA</th>
                    <th>HORARIO INICIO</th>
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
                            <td>{item.tecnicoOrcamento.nome}</td>
                            <td>{item.tempoEstimadoOrcamento}</td>
                            <td>{TempoOrcamento(item.statusSituacao)}</td>
                            <td>{item.tecnicoManutencao?.nome}</td>
                            <td>{item.tempoEstimadoManutencao}</td>
                            {/* <td>{item.}</td>
                            <td>{DateTimeStringFormat(item.cadastro.dataHora)}</td> */}
                            <td></td>
                            <td></td>
                            <td></td>

                            <td>{item.status}</td>

                        </tr>
                    ))
                )}
            </tbody>
        </table>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const info = await validateToken(context);


    if (!info) {
        return {
            props: {}
        }
    }

    return {
        props: {},
        redirect: {
            destination: info.redirect.destination,
            permanent: info.redirect.permanent,
        }
    }
}
