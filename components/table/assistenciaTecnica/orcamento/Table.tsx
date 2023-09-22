import { useEffect, useState } from "react";
import style from "./style.module.css";
import Api from "../../../../service/api/assistenciaTecnica/Assistencia";


interface dataProps {
    numeroOrcamento: number,
    descricaoServico: string,
    status: statusProps[],
    cliente: clienteProps
}
interface statusProps {
    dataHoraFim: Date
    dataHoraInicio: Date,
    status: string
}
interface clienteProps {
    cep: string,
    cidade: string,
    cnpj: string,
    codigoRadar: string,
    estado: string,
    nomeCliente: string,
    numeroEstabelecimento: string,
    regiao: string,
    rua: string
}

export default function Table() {

    const [data, setData] = useState<dataProps[]>([]);

    useEffect(() => {
        Api.get("/orcamento")
            .then(res => {
                setData(res.data);
                console.log(res)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div className={style.container} >
            <section>
            </section>
            <section className={style.container_table} >
                <section className={style.wrap_container_table} >
                    <table className={style.table} >
                        <thead>
                            <tr>
                                <th>+</th>
                                <th>Nº ORÇAMENTO</th>
                                <th>CÓDIGO / CLIENTE</th>
                                <th>NOME / CLIENTE</th>
                                <th>DESCRIÇÃO SERVIÇO</th>
                                <th>MÁQUINA</th>
                                <th>DATA/HORA AGUARD. / ORÇ.</th>
                                <th>DATA/HORA AGUARD. / APROV. ORÇ.</th>
                                <th>DATA/HORA LIB. / APROV. ORÇ.</th>
                                <th>DATA/HORA MANUT. / INI</th>
                                <th>DATA/HORA MANUT. / FIM</th>
                            </tr>
                        </thead>
                        <tbody className={style.table_body} >
                            {data && (
                                data.map((item, index) => (
                                    <tr>
                                        <td>+</td>
                                        <td>{item.numeroOrcamento}</td>
                                        <td>{item.cliente.codigoRadar}</td>
                                        <td>{item.cliente.nomeCliente}</td>
                                        <td>{item.descricaoServico}</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                ))
                            )}
                        </tbody>

                    </table>
                </section>
            </section>
        </div>
    )
}