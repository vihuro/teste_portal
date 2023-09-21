import { useEffect, useState } from "react";
import style from "./style.module.css";
import Api from "../../../../../service/api/assistenciaTecnica/Assistencia";
import FilterCodigo from "./filterCodigo/FilterCodigo";
import FilterColuna from "./filterDescricao/FilterDescricao";
import { MdOutlineLibraryAdd } from "react-icons/md";

interface props {
    changeToogle: Function,
}
interface maquinaProps {
    codigo: string,
    descricaoMaquina: string,
    numeroSerie: string,
    id: string
}

export default function Card({ changeToogle }: props) {

    const [data, setData] = useState<maquinaProps[]>([]);
    const [listMaquina, setListMaquina] = useState<maquinaProps[]>([]);


    async function FetchData() {
        await Api.get("/maquina/sem-atribuicao")
            .then(res => setData(res.data))
            .catch(err => console.log(err))
    }

    const filterMaquina = data.filter(item => (
        !listMaquina.some(maquinaId => item.id === maquinaId.id)
    ))


    function CardFilterMaquinaDisponivel() {
        const [toogleFilerCodigo, setToogleFilterCodigo] = useState<boolean>(false);
        const [toogleFilterDescricao, setToogleFilterDescricao] = useState<boolean>(false);
        const [toogleFilterNumeroSerie, setToogleFilterNumeroSerie] = useState<boolean>(false);

        const { CardFilterCodigo, filteredData: listMaquinaVisible } = FilterCodigo(filterMaquina.map(item => ({
            codigo: item.codigo,
            id: item.id
        })))
        const { CardFilterColunaTable: CardFilterDescricao, filteredData: listDescricaoVisible } = FilterColuna(filterMaquina.map(item => ({
            id: item.id,
            text: item.descricaoMaquina
        })))
        const { CardFilterColunaTable: CardFilterNumeroSerie, filteredData: listNumeroSerieVisible } = FilterColuna(filterMaquina.map(item => ({
            id: item.id,
            text: item.numeroSerie
        })))


        const filter = filterMaquina.filter(item => {
            return (
                !listMaquina.some(listMaquina => listMaquina.id === item.id) &&
                listMaquinaVisible.some(listMaquinaVisible => listMaquinaVisible.codigo === item.codigo && listMaquinaVisible.visible) &&
                listDescricaoVisible.some(descricao => descricao.text === item.descricaoMaquina && descricao.visible) &&
                listNumeroSerieVisible.some(numeroSerie => numeroSerie.text === item.numeroSerie && numeroSerie.visible)
            )
        })

        return (
            <section className={style.container} >
                <section className={style.container_table} >
                    <table className={style.table} onClick={() => {
                        setToogleFilterCodigo(false)
                        setToogleFilterDescricao(false);
                        setToogleFilterNumeroSerie(false);
                    }} >
                        <thead onClick={(e) => e.stopPropagation()} >
                            <tr>
                                <th onClick={(e) => {
                                    e.stopPropagation()
                                    setToogleFilterCodigo(!toogleFilerCodigo)
                                    setToogleFilterDescricao(false);
                                    setToogleFilterNumeroSerie(false);
                                }} >
                                    CÓDIGO
                                    <div
                                        onClick={e => e.stopPropagation()}
                                        className={toogleFilerCodigo ?
                                            style.container_filterCodigo :
                                            style.container_filterCodigo_close} >
                                        <CardFilterCodigo />
                                    </div>
                                </th>
                                <th onClick={() => {
                                    setToogleFilterCodigo(false)
                                    setToogleFilterDescricao(!toogleFilterDescricao);
                                    setToogleFilterNumeroSerie(false);
                                }} >
                                    DESCRIÇÃO
                                    <div
                                        onClick={(e) => e.stopPropagation()}
                                        className={toogleFilterDescricao ?
                                            style.container_filterDescricao :
                                            style.container_filterDescricao_close} >
                                        <CardFilterDescricao />
                                    </div>
                                </th>
                                <th onClick={() => {
                                    setToogleFilterCodigo(false)
                                    setToogleFilterDescricao(false);
                                    setToogleFilterNumeroSerie(!toogleFilterNumeroSerie);
                                }} >
                                    Nº SÉRIE
                                    <div
                                        onClick={(e) => e.stopPropagation()}
                                        className={toogleFilterNumeroSerie ?
                                            style.container_filterNumeroSerie :
                                            style.container_filterNumeroSerie_close} >
                                        <CardFilterNumeroSerie />
                                    </div>
                                </th>
                                <th>ADD.</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && (
                                filter.map((item, index) => (
                                    <tr key={index} >
                                        <td>{item.codigo}</td>
                                        <td>{item.descricaoMaquina}</td>
                                        <td>{item.numeroSerie}</td>
                                        <td
                                            onClick={() => setListMaquina([
                                                ...listMaquina,
                                                {
                                                    codigo: item.codigo,
                                                    id: item.id,
                                                    numeroSerie: item.numeroSerie,
                                                    descricaoMaquina: item.descricaoMaquina
                                                }
                                            ])}
                                        >
                                            <MdOutlineLibraryAdd />
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>

                </section>
                <footer className={style.container_button} >
                    <button type="button" onClick={() => changeToogle(false)} >
                        FECHAR
                    </button>

                </footer>
            </section>
        )
    }

    return {
        CardFilterMaquinaDisponivel,
        listMaquina,
        setListMaquina,
        FetchData
    }
}


