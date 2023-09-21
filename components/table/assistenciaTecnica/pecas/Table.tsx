import { Fragment, useEffect, useState } from "react";
import Api from "../../../../service/api/assistenciaTecnica/Assistencia";
import style from "./style.module.css";
import { Icons } from "../../../utils/IconDefault";
import CardAdd from "./add/Card";
import CardChange from "./change/Card";

import FilteredColuna from "../../filterColunaTable/CardFilterColuna";
import Visualizador from "./visualizadorImagem/Card";
import { DateTimeStringFormat } from "../../../utils/DateTimeString";

interface dataProps {
    id: string,
    codigoRadar: string,
    descricao: string,
    preco: number,
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


    useEffect(() => {
        FecthData();

    }, [])
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
        Api.get("/assistencia-tecnica/pecas")
            .then(res => {
                const dataItem: dataProps[] = res.data;
                setData(dataItem)
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

    return (
        <main className={style.container} >
            <div className={toogleAdd ?
                style.containerAdd :
                style.containerAdd_close} >
                <CardAdd changeToogle={setToogleAdd} refresTable={FecthData} />
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
                <button onClick={() => setToogleAdd(true)} >
                    NOVA PEÇA
                </button>
            </section>
            <section className={style.container_table} >
                <div className={style.wrap_table} >
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
                                            <td>{item.preco}</td>
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
                </div>
            </section>

        </main>
    )
}