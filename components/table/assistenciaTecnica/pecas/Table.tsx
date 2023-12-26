import { Fragment, useEffect, useState } from "react";
import Api from "../../../../service/api/assistenciaTecnica/Assistencia";
import style from "./style.module.css";
import { Icons } from "../../../utils/IconDefault";
import CardAdd from "./add/Card";
import CardChange from "./change/Card";
import CardRadar from "./addForRadar/Card";

import FilteredColuna from "../../filterColunaTable/CardFilterColuna";
import Visualizador from "./visualizadorImagem/Card";
import { DateTimeStringFormat } from "../../../utils/DateTimeString";

import CardFilter from "./cardFilter/Form";

interface dataProps {
    id: string,
    codigoRadar: string,
    descricao: string,
    preco: number,
    unidade: string,
    familia: string,
    enderecoImagem: string;
    alteracao: userProps,
    cadastro: userProps
}



interface userProps {
    idUsuario: string,
    apelido: string,
    nome: string,
    dataHora: Date
}

interface FilterProps {
    Unidade: string,
    CodigoRadar: string,
    Descricao: string,
    Familia: string
}


export default function Table() {
    const [data, setData] = useState<dataProps[]>([]);
    const [filter, setFilter] = useState<dataProps[]>([]);
    const [dataItemAlteracao, setDataItemAlteracao] = useState<dataProps>();
    const [dataItemAlteracaoString, setDataItemAlteracaoString] = useState<string>("");
    const [toogleAdd, setToogleAdd] = useState<boolean>(false);
    const [toogleChange, setToogleChange] = useState<boolean>(false);
    const [toogleInfoPlus, setToogleInfoPlus] = useState<boolean>(false);
    const [indiceInfoPlus, setIndiceInfoPlus] = useState<number>();
    const [colSpan, setColspan] = useState<number>(6);
    const [toogleFilterCodigo, setToogleFilterCodigo] = useState<boolean>(false);
    const [toogleFilterDescricao, setToogleFilterDescricao] = useState<boolean>(false);
    const [toogleVisualizador, setToogleVisualizador] = useState<boolean>(false);
    const [textImage, setTextImage] = useState<string>("");
    const [toogleAddRadar, setToogleRadar] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [infoPage, setInfoPage] = useState({
        currentPage: 0,
        totalPages: 0,
        itemForPage: 50,
        totalItems: 0
    })
    const [infoPageFilter, setInfoPageFilter] = useState({
        currentPage: 0,
        totalPages: 0,
        itemForPage: 50,
        totalItems: 0
    })
    const [toogleLoading, setToogleLoading] = useState<boolean>(true);
    const [filterFetch, setFilterFecth] = useState<FilterProps>({
        CodigoRadar: "",
        Descricao: "",
        Familia: "",
        Unidade: ""
    })
    const [toogleFilter, setToogleFilter] = useState<boolean>(false);

    useEffect(() => {
        const intersectionObserver = new IntersectionObserver((entries) => {
            entries.map(item => {
                if (item.isIntersecting) {
                    setCurrentPage((current) => current + 50)
                }
            })
        })
        const sentinelElement = document.querySelector("#sentinela");

        if (sentinelElement) {
            intersectionObserver.observe(sentinelElement);
        }

        return () => intersectionObserver.disconnect();
    }, [])

    useEffect(() => {
        if (filterFetch.CodigoRadar !== "" ||
            filterFetch.Descricao !== "" ||
            filterFetch.Familia !== "" ||
            filterFetch.Unidade !== "") {
            FetchDataWithFilter(filterFetch)
        } else {
            FecthData();
        }

    }, [currentPage])
    useEffect(() => {
        alteracao(dataItemAlteracaoString);
    }, [data])

    async function searchImage(caminho: string) {
        try {
            const encodedCaminho = encodeURIComponent(`\\${caminho}`);
            const apiUrl = `/assistencia-tecnica/pecas/image/${encodedCaminho}`;

            // Realize a chamada à API diretamente no elemento <img>

            await Api.get(`/assistencia-tecnica/pecas/image/${encodedCaminho}`)
                .then(res => console.log("sucess"))
                .catch(err => console.log(err))

            return <img src={apiUrl} alt={`Imagem teste`} />;
        } catch (error) {
            console.error(error);
            return null; // Retorna algo ou null dependendo da sua necessidade
        }
    }
    const { CardFilterColunaTable: CardFilterCodigo, filteredData: filteredCodigo, refresList: refresFiteredCodigo } = FilteredColuna({
        list: data.map(item => ({
            id: item.id,
            text: item.codigoRadar
        }))
    })
    const { CardFilterColunaTable: CardFilterDescricao, filteredData: filteredDescricao, refresList: refresFiteredDescricao } = FilteredColuna({
        list: data.map(item => ({
            id: item.id,
            text: item.descricao
        }))
    })
    useEffect(() => {
        ChangeFilter()
    }, [filteredDescricao, filteredCodigo])

    async function FecthData() {

        if (infoPage.currentPage === infoPage.totalPages && infoPage.totalPages > 0) {
            const stayItemsTeste = (infoPage.itemForPage * infoPage.totalPages - infoPage.totalItems) * -1

            setInfoPage((current) => ({
                ...current,
                itemForPage: stayItemsTeste
            }))
        }
        if (infoPage.totalItems === data.length && data.length !== 0) return;

        await Api.get(`/assistencia-tecnica/pecas/${currentPage}/${infoPage.itemForPage}`)
            .then(res => {

                setInfoPage((info) => ({
                    ...info,
                    currentPage: res.data.currentPage,
                    totalPages: res.data.quantityPages,
                    totalItems: res.data.total
                }));

                const dataItem: dataProps[] = res.data.pecas;
                setData((currentData) => [...currentData, ...dataItem])
                refresFiteredCodigo({
                    list: dataItem.map(item => ({
                        text: item.codigoRadar,
                        id: item.id
                    }))
                })
                refresFiteredDescricao({
                    list: dataItem.map(item => ({
                        text: item.descricao,
                        id: item.id
                    }))
                })
                setToogleLoading((current) => current = false)
            })
            .catch(err => console.log(err))

    }
    async function FetchDataWithFilter(filter: FilterProps) {

        if (infoPageFilter.totalItems === 0) {
            setToogleLoading((current) => current = true)
            setCurrentPage((current) => current = 0)
            setData([])
        }
        if (infoPageFilter.currentPage === infoPageFilter.totalPages && infoPageFilter.totalPages > 0) {
            const stayItems = (infoPageFilter.itemForPage * infoPageFilter.totalPages - infoPageFilter.totalItems) * -1

            setInfoPageFilter((current) => ({
                ...current,
                itemForPage: stayItems
            }))
        }
        if (infoPageFilter.totalItems === data.length && data.length !== 0) return;

        await Api.get(`/assistencia-tecnica/pecas/with-filter/${currentPage}/${infoPageFilter.itemForPage}`, {
            params: filter
        })
            .then(res => {
                setInfoPageFilter((info) => ({
                    ...info,
                    currentPage: res.data.currentPage,
                    totalPages: res.data.quantityPages,
                    totalItems: res.data.total
                }));

                const dataItem: dataProps[] = res.data.pecas;
                if (currentPage === 0) {
                    setData(() => [...dataItem])
                } else {
                    setData((currentData) => [...currentData, ...dataItem])
                }
                refresFiteredCodigo({
                    list: dataItem.map(item => ({
                        text: item.codigoRadar,
                        id: item.id
                    }))
                })
                refresFiteredDescricao({
                    list: dataItem.map(item => ({
                        text: item.descricao,
                        id: item.id
                    }))
                })
                setToogleLoading((current) => current = false)
            })
            .catch(err => console.log(err))

    }

    function ChangeFilter() {
        const filtered = data.filter(item => (
            filteredCodigo.some(codigo => codigo.text === item.codigoRadar && codigo.visible) &&
            filteredDescricao.some(descicao => descicao.text === item.descricao && descicao.visible)
        ))
        setFilter(filtered)
    }
    function alteracao(id: string) {
        const item = data.find(item => item.id === id);

        return setDataItemAlteracao(item);
    }

    const { FetchData: FetchPecasNaoCadastradas, Form: FormAddPeca } = CardRadar({ fetchData: FecthData });

    function cleanFilter() {
        setFilterFecth(() => ({
            CodigoRadar: "",
            Descricao: "",
            Familia: "",
            Unidade: ""
        }))
        setCurrentPage(() => 0)
    }

    return (
        <main className={style.container} >
            <div className={toogleFilter ?
                style.container_filter :
                style.container_filter_close} >
                <div className={style.wrap_container_filter} >
                    <CardFilter
                        changeToogle={setToogleFilter}
                        dataFilterProps={filterFetch}
                        cleanFilter={cleanFilter}
                        fetchDataFilter={FetchDataWithFilter}
                        fetchDataWithoutFilter={FecthData}
                        setFilterFecth={setFilterFecth}
                        setDataTable={setData}
                        changeCurrentPage={setCurrentPage}
                        currentPage={currentPage} />
                </div>
            </div>
            <div className={toogleAdd ?
                style.containerAdd :
                style.containerAdd_close} >
                <FormAddPeca changeToogle={setToogleAdd} />
                {/* <CardAdd changeToogle={setToogleAdd} refresTable={FecthData} /> */}
            </div>
            <div className={toogleChange ?
                style.containerChange :
                style.containerChange_close} >
                {dataItemAlteracao && (
                    <CardChange
                        changeToogle={setToogleChange}
                        data={dataItemAlteracao}
                        refreshTable={FecthData}
                    />
                )}
            </div>
            <div className={toogleVisualizador ?
                style.containerVisualizador :
                style.containerVisualizador_close} >
                <Visualizador
                    changeToogle={setToogleVisualizador}
                    image={textImage}
                />
            </div>
            <section className={style.container_button} >
                <button onClick={() => {
                    setToogleFilter(!toogleFilter)
                }} >
                    FILTRO
                </button>
                <button onClick={() => {
                    FetchPecasNaoCadastradas(),
                        setToogleAdd(true)
                }} >
                    NOVA PEÇA
                </button>

            </section>
            <section className={style.container_table} >
                <div className={!toogleLoading ?
                    style.wrap_table :
                    style.wrap_table_loading} >
                    <table className={style.table} >
                        <thead>
                            <tr>
                                <th>+</th>
                                <th onClick={(e) => {
                                    setToogleFilterCodigo(!toogleFilterCodigo)
                                    setToogleFilterDescricao(false)
                                }} >
                                    CÓDIGO RADAR
                                    <div
                                        onClick={e => e.stopPropagation()}
                                        className={toogleFilterCodigo ?
                                            style.filterCodigo :
                                            style.filterCodigo_close} >
                                        <CardFilterCodigo
                                            input
                                            radioButton
                                            idRadioButton="rdbDescricaoPeca"
                                        />
                                    </div>
                                </th>
                                <th onClick={() => {
                                    setToogleFilterCodigo(false)
                                    setToogleFilterDescricao(!toogleFilterDescricao)
                                }} >
                                    DESCRIÇÃO
                                    <div
                                        onClick={e => e.stopPropagation()}
                                        className={toogleFilterDescricao ?
                                            style.filterDescricao :
                                            style.filterDescricao_close} >
                                        <CardFilterDescricao
                                            input
                                            radioButton
                                            idRadioButton="rdbDescricaoPecaRadar"
                                        />
                                    </div>
                                </th>
                                <th>UND.</th>
                                <th>FAMÍ.</th>
                                <th>PREÇO</th>
                                <th>IMG</th>
                                <th>EDIT.</th>
                            </tr>
                        </thead>
                        <tbody className={style.table_body} >
                            {filter && (
                                filter.map((item, index) => (
                                    <Fragment key={index} >
                                        <tr className={style.row} >
                                            <td onClick={() => {
                                                setIndiceInfoPlus(index)
                                                setToogleInfoPlus(!toogleInfoPlus)
                                            }}>
                                                <Icons.ArrowFromTop className={
                                                    toogleInfoPlus && index === indiceInfoPlus ?
                                                        style.down :
                                                        style.top
                                                } />
                                            </td>
                                            <td>{item.codigoRadar}</td>
                                            <td>{item.descricao}</td>
                                            <td>{item.unidade}</td>
                                            <td>{item.familia}</td>
                                            <td>{`R$ ${item.preco.toLocaleString("pt-Br", {
                                                style: "decimal",
                                                maximumFractionDigits: 2
                                            })}`}
                                            </td>
                                            <td >
                                                <p onClick={() => {
                                                    if (item.enderecoImagem) {
                                                        setTextImage(item.enderecoImagem)
                                                        setToogleVisualizador(true)
                                                    }
                                                }} className={item.enderecoImagem ?
                                                    style.visualizar :
                                                    style.visualizar_disable}>
                                                    VISUALIZAR
                                                </p>
                                            </td>
                                            <td onClick={() => {
                                                alteracao(item.id)
                                                setDataItemAlteracaoString(item.id)

                                                setToogleChange(true)
                                            }} className={style.edit} >
                                                <Icons.Edit />
                                            </td>
                                        </tr>
                                        {toogleInfoPlus && indiceInfoPlus === index && (
                                            <>
                                                <tr className={style.infoPlus} >
                                                    <td colSpan={colSpan} >
                                                        {`USUÁRIO DO CADASTRO: ${item.cadastro.nome}`}
                                                    </td>
                                                </tr>
                                                <tr className={style.infoPlus} >
                                                    <td colSpan={colSpan} >
                                                        {`DATA E HORA DO CADASTRO: ${DateTimeStringFormat(item.cadastro.dataHora)}`}
                                                    </td>
                                                </tr>
                                                <tr className={style.infoPlus} >
                                                    <td colSpan={colSpan} >
                                                        {`USUÁRIO DA ALTERAÇÃO: ${item.alteracao.nome}`}
                                                    </td>
                                                </tr>
                                                <tr className={style.infoPlus} >
                                                    <td colSpan={colSpan} >
                                                        {`DATA E HORA DA ALTERAÇÃO: ${DateTimeStringFormat(item.alteracao.dataHora)}`}
                                                    </td>
                                                </tr>
                                            </>
                                        )}

                                    </Fragment>
                                ))
                            )}

                        </tbody>
                    </table>
                    <div style={{
                        height:"5px"
                    }} id="sentinela" />
                </div>
            </section>

        </main>
    )
}