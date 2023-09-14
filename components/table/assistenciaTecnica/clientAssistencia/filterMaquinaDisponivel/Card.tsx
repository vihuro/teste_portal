import { useEffect, useState } from "react";
import style from "./style.module.css";
import Api from "../../../../../service/api/assistenciaTecnica/Assistencia";
import FilterCodigo from "./filterCodigo/FilterCodigo";
import { MdOutlineLibraryAdd } from "react-icons/md";

interface props {
    changeToogle: Function,
}
interface maquinaProps {
    codigo: string,
    tipoMaquina: string,
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

    const filter = data.filter(item => (
        !listMaquina.some(maquinaId => item.id === maquinaId.id)
    ))
    const { CardFilterCodigo, filteredData: listMaquinaVisible } = FilterCodigo(filter.map(item => ({
        codigo: item.codigo,
        id: item.id
    })))
    const newFilter = data.filter(item => {
        return (
            !listMaquina.some(listMaquina => listMaquina.id === item.id) &&
            listMaquinaVisible.some(listMaquinaVisible => listMaquinaVisible.codigo === item.codigo && listMaquinaVisible.visible)
        )
    })

    function CardFilterMaquinaDisponivel() {
        const [toogleFilerCodigo, setToogleFilterCodigo] = useState<boolean>(false);
        const [toogleFilterDescricao, setToogleFilterDescricao] = useState<boolean>(false);
        const [toogleFilterNumeroSerie, setToogleFilterNumeroSerie] = useState<boolean>(false);
        return (
            <section className={style.container} >
                <section className={style.container_table} >
                    <table className={style.table} >
                        <thead>
                            <tr>
                                <th onClick={() => {
                                    setToogleFilterCodigo(!toogleFilerCodigo)
                                    setToogleFilterDescricao(false);
                                    setToogleFilterNumeroSerie(false);
                                }} >
                                    CÓDIGO
                                    <div
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
                                        className={toogleFilterDescricao ?
                                            style.container_filterDescricao :
                                            style.container_filterDescricao_close} >
                                    </div>
                                </th>
                                <th onClick={() => {
                                    setToogleFilterCodigo(false)
                                    setToogleFilterDescricao(false);
                                    setToogleFilterNumeroSerie(!toogleFilterNumeroSerie);
                                }} >
                                    Nº SÉRIE
                                    <div
                                        className={toogleFilterNumeroSerie ?
                                            style.container_filterNumeroSerie :
                                            style.container_filterNumeroSerie_close} >

                                    </div>
                                </th>
                                <th>ADD.</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && (
                                newFilter.map((item, index) => (
                                    <tr key={index} >
                                        <td>{item.codigo}</td>
                                        <td>{item.tipoMaquina}</td>
                                        <td>{item.numeroSerie}</td>
                                        <td
                                            onClick={() => setListMaquina([
                                                ...listMaquina,
                                                {
                                                    codigo: item.codigo,
                                                    id: item.id,
                                                    numeroSerie: item.numeroSerie,
                                                    tipoMaquina: item.tipoMaquina
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


