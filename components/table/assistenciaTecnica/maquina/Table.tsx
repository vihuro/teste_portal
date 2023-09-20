import { Fragment, useEffect, useState } from "react"
import Api from "../../../../service/api/assistenciaTecnica/Assistencia";
import style from "./style.module.css";
import { FiEdit } from "react-icons/fi"
import Card from "./cardAdd/Card";
import { BiArrowFromTop } from "react-icons/bi";
import { DateTimeStringFormat } from "../../../utils/DateTimeString";
import FilterColuna from "../../filterColunaTable/CardFilterColuna";

interface maquinaProps {
    ativo: boolean,
    codigo: string,
    atribuida: boolean,
    id: string,
    pecas: string[],
    tipoMaquina: string,
    numeroSerie: string,
    cadastro: userProps,
    alteracao: userProps
}
interface userProps {
    apelido: string,
    nome: string,
    dataHora: Date,
    id: string
}

export default function Table() {
    const [data, setData] = useState<maquinaProps[]>([]);
    const [filter, setFilter] = useState<maquinaProps[]>([]);
    const [toogleAdd, setToogleAdd] = useState<boolean>(false);

    const [toogleInfoPlus, setToogleInfoPlus] = useState<boolean>(false);
    const [indiceInfoPlus, setIndiceInfoPlus] = useState<number>();
    const [toogleCodigo, setToogleCodigo] = useState<boolean>(false);
    const [toogleMaquina, setToogleMaquina] = useState<boolean>(false);
    const [toogleAtribuida, setToogleAtribuida] = useState<boolean>(false);
    const [toogleStatus, setToogleStatus] = useState<boolean>(false);
    const [toogleNumeroSerie, setToogleNumeroSerie] = useState<boolean>(false);

    useEffect(() => {
        FechData()
    }, [])


    const { CardFilterColunaTable: CardFilterCodigo, filteredData: filteredCodigo, refresList: refreshListCodigo } = FilterColuna({
        list: data.map(item => ({
            id: item.id,
            text: item.codigo
        }))
    })
    const { CardFilterColunaTable: CardFilterMaquina, filteredData: filteredMaquina, refresList: refreshListMaquina } = FilterColuna({
        list: data.map(item => ({
            id: item.id,
            text: item.tipoMaquina
        }))
    })
    const { CardFilterColunaTable: CardFilterAtribuida, filteredData: filteredAtribuida, refresList: refreshListAtribuida } = FilterColuna({
        list: data.map(item => ({
            id: item.id,
            text: item.atribuida ? "ATRIBUÍDA" : "DISPONÍVEL"
        })),
        searchColor: getColor
    })
    const { CardFilterColunaTable: CardFilterStatus, filteredData: filteredStatus, refresList: refreshListStatus } = FilterColuna({
        list: data.map(item => ({
            id: item.id,
            text: item.ativo ? "ATIVO" : "INATIVO"
        })),
        searchColor: getColor
    })
    const { CardFilterColunaTable: CardFilterNumeroSerie, filteredData: filteredNumeroSerie, refresList: refreshListNumeroSerie } = FilterColuna({
        list: data.map(item => ({
            id: item.id,
            text: item.numeroSerie
        }))
    })

    async function FechData() {
        await Api.get("maquina")
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }
    useEffect(() => {
        ChangeFilter();
    }, [filteredCodigo, filteredMaquina, filteredAtribuida, filteredStatus, filteredNumeroSerie])

    // function ChangeFilter() {
    //     const filtered = data.filter(item => (
    //         filteredCodigo.some(codigo => codigo.text === item.codigo && codigo.visible) &&
    //         filteredMaquina.some(maquina => maquina.text === item.tipoMaquina && maquina.visible) &&
    //         filteredAtribuida.some(atribuida => atribuida.text === (item.atribuida ? "ATRIBUÍDA" : "DISPONÍVEL") && atribuida.visible) &&
    //         filteredStatus.some(status => status.text === (item.ativo ? "ATIVO" : "INATIVO") && status.visible) &&
    //         filteredNumeroSerie.some(numeroSerie => numeroSerie.text === item.numeroSerie && numeroSerie.visible)
    //     ))

    //     setFilter(filtered);
    // }
    function ChangeFilter() {
        const filtered = data.filter(item => (
            filteredCodigo.some(codigo => codigo.text === item.codigo && codigo.visible) &&
            filteredMaquina.some(descricao => descricao.text === item.tipoMaquina && descricao.visible) &&
            filteredAtribuida.some(atribuida => atribuida.text === (item.atribuida ? "ATRIBUÍDA" : "DISPONÍVEL") && atribuida.visible) &&
            filteredStatus.some(status => status.text === (item.ativo ? "ATIVO" : "INATIVO") && status.visible) &&
            filteredNumeroSerie.some(numeroSerie => numeroSerie.text === item.numeroSerie && numeroSerie.visible)
        ))

        setFilter(filtered);
    }

    const listColor = [
        {
            text: "DISPONÍVEL",
            background: "#12d9b2",
            color: "#00654e"
        },
        {
            text: "ATRIBUÍDA",
            background: "#340971",
            color: "#9c59f9"
        },
        {
            text: "ATIVO",
            background: "#54d173",
            color: "#096d22"
        },
        {
            text: "INATIVO",
            background: "#d15454",
            color: "#6d0909"
        }
    ]

    function getColor(text: string) {
        const style = listColor.find(color => color.text === text);

        return {
            background: style ? style.background : "",
            color: style ? style.color : ""
        }
    }




    return (
        <main className={style.container} >
            <section className={style.container_button} >
                <button onClick={() => setToogleAdd(true)} >
                    Nova Maquina
                </button>
            </section>
            <section className={toogleAdd ? style.cardAdd : style.cardAdd_close} >
                <Card changeToogle={setToogleAdd} refreshTable={FechData} />
            </section>
            <section className={style.container_table} >
                <section className={style.wrap_container_table} >
                    <table className={style.table} >
                        <thead>
                            <tr>
                                <th>
                                    +
                                </th>
                                <th onClick={() => {
                                    setToogleCodigo(!toogleCodigo)
                                    setToogleMaquina(false);
                                    setToogleAtribuida(false);
                                    setToogleStatus(false);
                                    setToogleNumeroSerie(false);
                                }} >
                                    CÓDIGO
                                    <div onClick={e => e.stopPropagation()} className={toogleCodigo ?
                                        style.filterCodigo :
                                        style.filterCodigo_close}>
                                        <CardFilterCodigo
                                            input
                                            radioButton
                                            idRadioButton="rdbCodigoMaquina"
                                        />
                                    </div>
                                </th>
                                <th onClick={() => {
                                    setToogleCodigo(false)
                                    setToogleMaquina(!toogleMaquina);
                                    setToogleAtribuida(false);
                                    setToogleStatus(false);
                                    setToogleNumeroSerie(false);
                                }}>
                                    MÁQUINA
                                    <div onClick={e => e.stopPropagation()} className={toogleMaquina ?
                                        style.filterMaquina :
                                        style.filterMaquina_close}>
                                        <CardFilterMaquina
                                            input
                                            radioButton
                                            idRadioButton="rdbDescricaoMaquina"
                                        />
                                    </div>
                                </th>
                                <th onClick={() => {
                                    setToogleCodigo(false)
                                    setToogleMaquina(false);
                                    setToogleAtribuida(!toogleAtribuida);
                                    setToogleStatus(false);
                                    setToogleNumeroSerie(false);
                                }}>
                                    ATRIBUIDA
                                    <div onClick={e => e.stopPropagation()} className={toogleAtribuida ?
                                        style.filterAtribuida :
                                        style.filterAtribuida_close} >
                                        <CardFilterAtribuida />
                                    </div>
                                </th>
                                <th onClick={() => {
                                    setToogleCodigo(false)
                                    setToogleMaquina(false);
                                    setToogleAtribuida(false);
                                    setToogleStatus(!toogleStatus);
                                    setToogleNumeroSerie(false);
                                }} >
                                    STATUS
                                    <div onClick={e => e.stopPropagation()} className={toogleStatus ?
                                        style.filterStatus :
                                        style.filterStatus_close} >
                                        <CardFilterStatus />
                                    </div>
                                </th>
                                <th onClick={() => {
                                    setToogleCodigo(false)
                                    setToogleMaquina(false);
                                    setToogleAtribuida(false);
                                    setToogleStatus(false);
                                    setToogleNumeroSerie(!toogleNumeroSerie);
                                }} >
                                    Nº SÉRIE
                                    <div onClick={e => e.stopPropagation()} className={toogleNumeroSerie ?
                                        style.filterNumeroSerie :
                                        style.filterNumeroSerie_close} >
                                        <CardFilterNumeroSerie
                                            radioButton
                                            input
                                            idRadioButton="rdbNumeroSerieMaquina"
                                        />
                                    </div>
                                </th>
                                <th>EDIT.</th>
                            </tr>
                        </thead>
                        <tbody className={style.table_body} >
                            {data && (
                                filter.map((item, index) => (
                                    <Fragment key={index}>
                                        <tr >
                                            <td onClick={() => {
                                                setIndiceInfoPlus(index)
                                                setToogleInfoPlus(!toogleInfoPlus)
                                            }}>
                                                <BiArrowFromTop
                                                    className={toogleInfoPlus && index === indiceInfoPlus ?
                                                        style.down :
                                                        style.top}
                                                />
                                            </td>
                                            <td>{item.codigo}</td>
                                            <td>{item.tipoMaquina}</td>
                                            <td>
                                                <p className={style.tagAtribuida} style={getColor((item.atribuida ? "ATRIBUÍDA" : "DISPONÍVEL"))} >
                                                    {item.atribuida ? "ATRIBUÍDA" : "DISPONÍVEL"}
                                                </p>
                                            </td>
                                            <td>
                                                <p className={style.tagStatus} style={getColor((item.ativo ? "ATIVO" : "INATIVO"))} >
                                                    {
                                                        item.ativo ? "ATIVO" : "INATIVO"
                                                    }
                                                </p>
                                            </td>
                                            <td>
                                                {item.numeroSerie}
                                            </td>
                                            <td>
                                                <FiEdit />
                                            </td>
                                        </tr>
                                        {toogleInfoPlus && indiceInfoPlus === index && (
                                            <>
                                                <tr className={style.row_plus}>
                                                    <td colSpan={7}>
                                                        {`Data/Hora Cadastro: 
                                                        ${DateTimeStringFormat(item.cadastro.dataHora)}`}
                                                    </td>
                                                </tr>
                                                <tr className={style.row_plus}>
                                                    <td colSpan={7}>
                                                        {`Usuário Cadastro: 
                                                        ${item.cadastro.nome}`}
                                                    </td>
                                                </tr>
                                                <tr className={style.row_plus}>
                                                    <td colSpan={7}>
                                                        {`Data/Hora Alteração: 
                                                        ${DateTimeStringFormat(item.alteracao.dataHora)}`}
                                                    </td>
                                                </tr>
                                                <tr className={style.row_plus}>
                                                    <td colSpan={7}>
                                                        {`Usuário Alteração: 
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
                </section>

            </section>
        </main>
    )
}