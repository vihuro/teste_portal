import { Fragment, useEffect, useState } from "react"
import Api from "../../../../service/api/assistenciaTecnica/Assistencia";
import style from "./style.module.css";
import { BiArrowFromTop } from "react-icons/bi";
import { CiMenuKebab } from "react-icons/ci";
import FormAdd from "./add/Card";
import FilterCodigo from "./filterCodigo/Card";
import FilterNome from './filterNome/Card';
import FilterCNPJ from "./filterCnpj/Card";
import { DateTimeStringFormat } from "../../../utils/DateTimeString";

interface dataProps {
    idCliente: string,
    cnpj: string,
    codigoRadar: string,
    contatoTelefone: string,
    endereco: string,
    nome: string,
    cadastro: userProps,
    alteracao: userProps
}

interface userProps {
    usuarioId: string,
    nome: string,
    apelido: string,
    dataHora: Date
}

export default function Table() {
    const [data, setData] = useState<dataProps[]>([]);
    const [toogleFormAdd, setToogleFormAdd] = useState<boolean>(false);
    const [toogleInfoPlus, setToogleInfoPlus] = useState<boolean>(false);
    const [toogleFiterCodigo, setToogleFilterCodigo] = useState<boolean>(false);
    const [toogleFilterNome, setToogleFilterNome] = useState<boolean>(false);
    const [toogleFilterCNPJ, setToogleCNPJ] = useState<boolean>(false);
    const [indiceInfoPlus, setIndiceInfoPlus] = useState<number>();

    useEffect(() => {
        FecthData()
    }, [])

    const { CardFilter, data: filterCodigoRadar } = FilterCodigo({
        list: data ? data.map(item => ({
            codigo: item.codigoRadar
        })) : []
    })
    const { CardFilterNome, filteredNomeCliente } = FilterNome({
        list: data ? data.map(item => ({
            nomeCliente: item.nome
        })) : []
    })
    const { CardFilterCNPJ, filterCNPJ } = FilterCNPJ({
        list: data ? data.map(item => ({
            cnpj: item.cnpj
        })) : []
    })

    async function FecthData() {
        await Api.get("/cliente")
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }
    const filter = data.filter(item => {
        return (
            filterCodigoRadar.some(codigo => codigo.codigo === item.codigoRadar && codigo.visible) &&
            filteredNomeCliente.some(nomeCliente => nomeCliente.nomeCliente === item.nome && nomeCliente.visible) &&
            filterCNPJ.some(cnpj => cnpj.cnpj === item.cnpj && cnpj.visible)
        )

})
return (
    <main className={style.container} >
        <div className={toogleFormAdd ?
            style.container_novoProduto :
            style.container_novoProduto_close} >
            <FormAdd changeToogleCard={setToogleFormAdd} refreshTable={FecthData} />
        </div>
        <section className={style.container_button} >
            <button onClick={() => setToogleFormAdd(true)} >
                Novo Cliente
            </button>
        </section>
        <section className={style.container_table} >
            <div className={style.wrap_table} >
                <table className={style.table} >
                    <thead>
                        <tr>
                            <th>+</th>
                            <th>
                                CÓD./ RADAR
                                <CiMenuKebab
                                    onClick={e => {
                                        e.stopPropagation()
                                        setToogleFilterCodigo(!toogleFiterCodigo)
                                    }}
                                />
                                <div onClick={e => {
                                    e.stopPropagation()
                                }}
                                    className={toogleFiterCodigo ?
                                        style.container_codigo :
                                        style.container_codigo_close}
                                >
                                    <CardFilter />
                                </div>
                            </th>
                            <th>NOME/ CLIENTE
                                <CiMenuKebab
                                    onClick={e => {
                                        e.stopPropagation()
                                        setToogleFilterNome(!toogleFilterNome)
                                    }}
                                />
                                <div onClick={(e) => {
                                    e.stopPropagation()
                                }}
                                    className={toogleFilterNome ?
                                        style.container_nome :
                                        style.container_nome_close}
                                >
                                    <CardFilterNome />
                                </div>
                            </th>
                            <th>
                                CNPJ
                                <CiMenuKebab
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setToogleCNPJ(!toogleFilterCNPJ)
                                    }}
                                />
                                <div className={toogleFilterCNPJ ?
                                    style.container_CNPJ :
                                    style.container_CNPJ_close} >
                                    <CardFilterCNPJ />
                                </div>
                            </th>
                            <th>Endereço</th>
                        </tr>
                    </thead>
                    <tbody className={style.table_body} >
                        {data && (
                            filter.map((item, index) => (
                                <Fragment key={index}>
                                    <tr key={index} className={style.row} >
                                        <td onClick={() => {
                                            setIndiceInfoPlus(index)
                                            setToogleInfoPlus(!toogleInfoPlus)
                                        }} >
                                            <BiArrowFromTop
                                                className={toogleInfoPlus && index === indiceInfoPlus ?
                                                    style.down :
                                                    style.top}
                                            />
                                        </td>
                                        <td>{item.codigoRadar}</td>
                                        <td>{item.nome}</td>
                                        <td>{
                                            `${item.cnpj.slice(0, 2)}
                                                .${item.cnpj.slice(2, 5)}
                                                .${item.cnpj.slice(5, 8)}
                                                /${item.cnpj.slice(8, 12)}
                                                -${item.cnpj.slice(12)}`
                                        }</td>
                                        <td>{item.endereco}</td>
                                    </tr>
                                    {toogleInfoPlus && indiceInfoPlus === index && (
                                        <>
                                            <tr className={style.row_plus}>
                                                <td colSpan={5} >
                                                    {`Data/Hora Cadastro: 
                                                        ${DateTimeStringFormat(item.cadastro.dataHora)}`}
                                                </td>
                                            </tr>
                                            <tr className={style.row_plus}>
                                                <td colSpan={5} >
                                                    {`Usuário Cadastro: 
                                                        ${item.cadastro.nome}`}
                                                </td>
                                            </tr>
                                            <tr className={style.row_plus}>
                                                <td colSpan={5} >
                                                    {`Data/Hora Alteração: 
                                                        ${DateTimeStringFormat(item.alteracao.dataHora)}`}
                                                </td>
                                            </tr>
                                            <tr className={style.row_plus}>
                                                <td colSpan={5} >
                                                    {`Usuário Cadastro: 
                                                        ${item.alteracao.nome}`}
                                                </td>
                                            </tr>
                                        </>
                                    )}
                                </Fragment>
                            ))
                        )}
                    </tbody>
                </table>

            </div>

        </section>
    </main>
)
}