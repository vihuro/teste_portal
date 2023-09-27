import { useEffect, useState } from "react";
import style from "./style.module.css";
import Api from "../../../../service/api/assistenciaTecnica/Assistencia";
import Info from "./info/Info";
import { Icons } from "../../../utils/IconDefault";
import Filter from "../../filterColunaTable/CardFilterColuna";



interface dataProps {
    numeroOrcamento: number,
    descricaoServico: string,
    status: statusProps[],
    cliente: clienteProps,
    maquina: maquinaProps,
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
    contatoNomeCliente: string,
    contatoTelefoneCliente: string,
    codigoRadar: string,
    estado: string,
    nomeCliente: string,
    numeroEstabelecimento: string,
    regiao: string,
    rua: string
}
interface maquinaProps {
    maquinaId: string,
    codigoMaquina: string,
    descricaoMaquina: string,
    numeroSerie: string,
    pecas: pecasProps[]
}
interface pecasProps {
    pecaId: string,
    conserto: boolean,
    descricaoPeca: string,
    codigoPeca: string,
    enderecoImagem: string,
    preco: number,
    troca: boolean
}

export default function Table() {

    const [data, setData] = useState<dataProps[]>([]);
    const [dataInfo, setDataInfo] = useState<dataProps>();
    const [toogleInfo, setToogleInfo] = useState<boolean>(false);
    const [toogleFilterNumeroOrcamento, setToogleFilterNumeroOrcamento] = useState<boolean>(false);
    const [toogleFilterCodigoCliente, setToogleFilterCodigoCliente] = useState<boolean>(false);
    const [toogleFilterNomeCliente, setToogleFilterNomeCliente] = useState<boolean>(false);
    const [toogleFilterNumeroSerie, setToogleFilterNumeroSerie] = useState<boolean>(false);

    useEffect(() => {
        Api.get("/orcamento")
            .then(res => {
                setData(res.data);
                console.log(res)
            })
            .catch(err => console.log(err))
    }, [])

    const { CardFilterColunaTable: FilterNumeroOrcamento, filteredData: filteredNumeroOrcamento, refresList: refreshListNumeroOrcamento } = Filter({
        list: data.map(item => ({
            id: item.numeroOrcamento.toString(),
            text: item.numeroOrcamento.toString()
        })),
    })
    const { CardFilterColunaTable: FilterCodigoCliente, filteredData: filteredCodigoCliente, refresList: refreshListCodigoCliente } = Filter({
        list: data.map(item => ({
            id: item.cliente.codigoRadar,
            text: item.cliente.codigoRadar
        }))
    })
    const { CardFilterColunaTable: FilterNomeCliente, filteredData: filteredNomeCliente } = Filter({
        list: data.map(item => ({
            id: item.cliente.nomeCliente,
            text: item.cliente.nomeCliente
        }))
    })
    const { CardFilterColunaTable: FilterNumeroSerie, filteredData: filteredNumeroSerie, refresList: refreshListNumeroSerie } = Filter({
        list: data.map(item => ({
            id: item.maquina.numeroSerie,
            text: item.maquina.numeroSerie
        }))
    })

    const filtered = data.filter(item => (
        filteredNumeroOrcamento.some(numeroOrcamento => item.numeroOrcamento.toString() === numeroOrcamento.text && numeroOrcamento.visible) &&
        filteredCodigoCliente.some(codigoCliente => item.cliente.codigoRadar === codigoCliente.text && codigoCliente.visible) &&
        filteredNomeCliente.some(nomeCliente => item.cliente.nomeCliente === nomeCliente.text && nomeCliente.visible) &&
        filteredNumeroSerie.some(numeroSerie => item.maquina.numeroSerie === numeroSerie.text && numeroSerie.visible)
    ))

    const { FetchData: FetchDataOrcamentoId, InfoForm } = Info({
        changeToogle: setToogleInfo,
        numeroOrcamento: dataInfo ? dataInfo.numeroOrcamento : 0
    });


    return (
        <div className={style.container} >
            {data && dataInfo && (

                <div className={toogleInfo ?
                    style.container_info :
                    style.container_info_close} >
                    <InfoForm />
                </div>
            )}
            <section className={!toogleInfo ?
                style.container_table :
                style.container_table_close} >
                <section className={style.wrap_container_table} >
                    <table className={style.table} >
                        <thead>
                            <tr>
                                <th></th>
                                <th onClick={() => {
                                    setToogleFilterNumeroOrcamento(!toogleFilterNumeroOrcamento)
                                    setToogleFilterCodigoCliente(false);
                                    setToogleFilterNomeCliente(false);
                                    setToogleFilterNumeroSerie(false);
                                }} >
                                    Nº ORÇAMENTO
                                    <div onClick={e => e.stopPropagation()} className={toogleFilterNumeroOrcamento ?
                                        style.containerFilterNumeroOrcamento :
                                        style.containerFilterNumeroOrcamento_close} >
                                        <FilterNumeroOrcamento
                                            idRadioButton="rdbNumeroOrcamento"
                                            input
                                            radioButton
                                        />
                                    </div>
                                </th>
                                <th onClick={() => {
                                    setToogleFilterNumeroOrcamento(false)
                                    setToogleFilterCodigoCliente(!toogleFilterCodigoCliente);
                                    setToogleFilterNomeCliente(false);
                                    setToogleFilterNumeroSerie(false);
                                }} >
                                    CÓDIGO / CLIENTE
                                    <div onClick={e => e.stopPropagation()} className={toogleFilterCodigoCliente ?
                                        style.containerFilterCodigoCliente :
                                        style.containerFilterCodigoCliente_close} >
                                        <FilterCodigoCliente
                                            idRadioButton="rdbCodigoCliente"
                                            input
                                            radioButton
                                        />
                                    </div>
                                </th>
                                <th onClick={() => {
                                    setToogleFilterNumeroOrcamento(false)
                                    setToogleFilterCodigoCliente(false);
                                    setToogleFilterNomeCliente(!toogleFilterNomeCliente);
                                    setToogleFilterNumeroSerie(false);
                                }} >
                                    NOME / CLIENTE
                                    <div onClick={e => e.stopPropagation()} className={toogleFilterNomeCliente ?
                                        style.containerFilterNomeCliente :
                                        style.containerFilterNomeCliente_close} >
                                        <FilterNomeCliente
                                            idRadioButton="rdbNomeCliente"
                                            input
                                            radioButton
                                        />
                                    </div>
                                </th>
                                <th>STATUS</th>
                                <th onClick={() => {
                                    setToogleFilterNumeroOrcamento(false)
                                    setToogleFilterCodigoCliente(false);
                                    setToogleFilterNomeCliente(false);
                                    setToogleFilterNumeroSerie(!toogleFilterNumeroSerie);
                                }} >
                                    Nº SÉRIE
                                    <div onClick={e => e.stopPropagation()} className={toogleFilterNumeroSerie ?
                                        style.containerFilterNumeroSerie :
                                        style.containerFilterNumeroSerie_close} >
                                        <FilterNumeroSerie
                                            idRadioButton="rdbNumeroSerie"
                                            input
                                            radioButton
                                        />
                                    </div>
                                </th>
                                <th>INFO</th>
                            </tr>
                        </thead>
                        <tbody className={style.table_body} >
                            {filtered && (
                                filtered.map((item, index) => (
                                    <tr key={index} >
                                        <td className={style.containerInfoPlusRow} >
                                            <Icons.ArrowFromTop />
                                        </td>
                                        <td>{item.numeroOrcamento}</td>
                                        <td>{item.cliente.codigoRadar}</td>
                                        <td>{item.cliente.nomeCliente}</td>
                                        <td>AGUARDANDO ORÇAMENTO</td>
                                        <td>{item.maquina.numeroSerie}</td>
                                        <td className={style.infoPlus} onClick={() => {
                                            FetchDataOrcamentoId(item.numeroOrcamento)
                                            setDataInfo(item)
                                            setToogleInfo(true)
                                        }} >
                                            <Icons.Information />
                                        </td>
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