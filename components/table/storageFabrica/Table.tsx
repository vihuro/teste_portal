'use client'
import style from "./style.module.css";
import { useState, useEffect } from "react";
import Mock from "./mock";
import { FiEdit } from "react-icons/fi";
import { CiMenuKebab } from 'react-icons/ci';
import { FilterCodigo } from "./filterCodigo/FilterCodigo";
import { FilterUnidade } from "./filterUnidade/FilterUnidade";
import { FilterTipo } from "./filterTipo/FilterTipo";
import { FilterFornecedor } from "./filterFornecedor/FilterFornecedor";
import { FilterCategoria } from "./filterCategoria/FilterCategoria";
import { FilterStatus } from "./filterStatus/FilterStatus";
import { FilterStatusQuantidade } from "./filterStatusQuantidade/FilterStatusQuantidade";

interface TableProps {
    id: string,
    codigo: string,
    descricao: string,
    unidade: string,
    quantidadeEmEstoque: number,
    quantidadeMaxima: number,
    quantidadeSeguranca: number,
    quantidadeMinima: number,
    cadastro: [{
        id: string,
        usuarioCadastro: string,
        dataHoraCadastro: Date,
    }]
    alteracao: [{
        id: string,
        usuarioAlteracao: string,
        dataHoraAlteracao: Date,
    }]
    statusCodigo: string,
    // Ativo ou Inativo
    statusQuantidade: string,
    // Material Prima, Produto Acabado
    tipoMaterial: string,
    // Stretch, Shrink, PEAD, PEDB,
    categoriaMaterial: string,
    // Opcional para uso futuro
    categoriaMaterial2: string,
    fornecedor: string
}
interface ListCodigoVisible {
    codigo: string,
    visible: boolean

}
interface ListUnidadeVisible {
    unidade: string,
    visible: boolean
}
interface colorsUnidade {
    TIPO: string,
    backgroundcolor: string,
    color: string
}
interface listFornecedorVisible {
    id: string,
    fornecedor: string,
    visible: boolean
}
interface listTipoVisible {
    tipo: string,
    visible: boolean
}
interface listCategoriaVisible {
    id: string,
    categoria: string,
    visible: boolean
}
interface listStatusVisible {
    id: string,
    status: string,
    visible: boolean
}
interface listStatusQuantidadeVisible {
    id: string,
    statusQuantidade: string,
    visible: boolean
}
interface statusQuantidade {
    estoqueMaximo: number,
    estoqueMinimo: number,
    estoqueSegurança: number,
    quantidadeEstoque: number
}

const colorUnidade: colorsUnidade[] = [
    {
        TIPO: "KG",
        backgroundcolor: "#F47210",
        color: "#9D4707"
    },
    {
        TIPO: "ROL",
        backgroundcolor: "#4CFAFA",
        color: "#048D8A"
    },
    {
        TIPO: "UND",
        backgroundcolor: "RED",
        color: "WHITE"
    },
    {
        TIPO: "P.A",
        backgroundcolor: "#7a7aef",
        color: "WHITE"
    },
    {
        TIPO: "M.P",
        backgroundcolor: "#f77387",
        color: "WHITE"
    },
    {
        TIPO: "ATIVO",
        backgroundcolor: "#71f9d7",
        color: "#15990B"
    },
    {
        TIPO: "INATIVO",
        backgroundcolor: "#a60000",
        color: "WHITE"
    },
    {
        TIPO: "PET VIRGEM",
        backgroundcolor: "#3FFF8D",
        color: "#15990B"
    },
    {
        TIPO: "FLAKE",
        backgroundcolor: "#3FFF8D",
        color: "#15990B"
    },
    {
        TIPO: "PET-2",
        backgroundcolor: "#00923B",
        color: "white"
    },
    {
        TIPO: "FLAKE-2",
        backgroundcolor: "#00923B",
        color: "white"
    },
    {
        TIPO: "PP VIRGEM",
        backgroundcolor: "#8C9EF8",
        color: "white"
    },
    {
        TIPO: "PP-2",
        backgroundcolor: "#0B28B9",
        color: "white"
    },
    {
        TIPO: "STRETCH",
        backgroundcolor: "#E753DC",
        color: "white"
    },
    {
        TIPO: "STRETCH ECO",
        backgroundcolor: "#94148B",
        color: "white"
    },
    {
        TIPO: "SHRINK",
        backgroundcolor: "#EB5353",
        color: "white"
    },
    {
        TIPO: "INSUMO",
        backgroundcolor: "#b79288",
        color: "white"
    },
    {
        TIPO: "MÁXIMO",
        backgroundcolor: "#1e0e7a",
        color: "white"
    },
    {
        TIPO: "MÍNIMO",
        backgroundcolor: "#f80e14",
        color: "#700003"
    },
    {
        TIPO: "SEGURANÇA",
        backgroundcolor: "#f7f70f",
        color: "#7b7b04"
    }
]
function getColor(text: string) {
    const color = colorUnidade.find(item => item.TIPO === text);
    return {
        backgroundColor: color?.backgroundcolor,
        color: color?.color
    }
}
function getStatusQUantidade(quantidade: statusQuantidade) {
    if (quantidade.quantidadeEstoque >= quantidade.estoqueMaximo) return "MÁXIMO"
    if (quantidade.quantidadeEstoque >= quantidade.estoqueSegurança) return "SEGURANÇA"
    if (quantidade.quantidadeEstoque <= quantidade.estoqueMinimo) return "MÍNIMO"
    return "";

}

export default function Table() {
    const [data, setData] = useState<TableProps[]>();
    const [filter, setFilter] = useState<TableProps[]>([]);
    const [toogleCodigo, setToogleCodigo] = useState(false);
    const [toogleUnidade, setToogleUnidade] = useState(false);
    const [toogleTipo, setToogleTipo] = useState(false);
    const [toogleFornecedor, setToogleFornecedor] = useState(false);
    const [toogleCategoria, setToogleCategoria] = useState(false);
    const [toogleStatus, setToogleStatus] = useState(false);
    const [toogleStatusQuantidade, setToogleStatusQuantidade] = useState(true);


    const { List,
        filter: dataListCodigo,
        setFilter: setDataListCodigo } = FilterCodigo(
            {
                codigo: data?.map(item => (
                    {
                        codigo: item.codigo
                    })) ?? []
            }
        );

    const {
        List: ListUnidade,
        filter: dataListUnidade,
        setFilter: setDataListUnidade
    } = FilterUnidade({
        list: data?.map(item => (
            {
                unidade: item.unidade
            }
        )) ?? [],
        lisColors: colorUnidade.map(item => ({
            backgroundcolor: item.backgroundcolor,
            color: item.color,
            TIPO: item.TIPO
        }))
    })
    const {
        List: ListTipo,
        filter: dataFilterTipo,
        setFilter: setDataFilterTipo
    } = FilterTipo({
        list: data?.map(item => (
            {
                tipo: item.tipoMaterial
            }
        )) ?? [],
        lisColors: colorUnidade.map(item => (
            {
                backgroundcolor: item.backgroundcolor,
                color: item.color,
                TIPO: item.TIPO
            }
        ))
    })
    const {
        List: ListFornecedor,
        filter: dataFilterFornecedor,
        setFilter: setDataFilterFornecedor
    } = FilterFornecedor({
        list: data?.map(item => ({
            fornecedor: item.fornecedor
        })) ?? []
    })
    const {
        List: LisCategoria,
        setFilter: setDataFilterCategoria,
        filter: dataFilterCategoria
    } = FilterCategoria({
        list: data?.map(item => ({
            categoria: item.categoriaMaterial
        })) ?? [],
        lisColors: colorUnidade.map(item => ({
            backgroundcolor: item.backgroundcolor,
            categoria: item.TIPO,
            color: item.color
        }))
    })
    const {
        List: ListStatus,
        filter: dataFilterStatus,
        setFilter: setDataFilterStatus
    } = FilterStatus({
        list: data?.map(item => ({
            Status: item.statusCodigo
        })) ?? [],
        lisColors: colorUnidade.map(item => ({
            backgroundcolor: item.backgroundcolor,
            color: item.color,
            status: item.TIPO
        }))
    });
    const {
        List: ListStatusQuantidade,
        filter: dataFilterStatusQuantidade,
        setFilter: setDataFilterStatusQuantidade
    } = FilterStatusQuantidade({
        list: data?.map(item => ({
            statusQuantidade: getStatusQUantidade({
                estoqueMaximo: item.quantidadeMaxima,
                estoqueMinimo: item.quantidadeMinima,
                estoqueSegurança: item.quantidadeSeguranca,
                quantidadeEstoque: item.quantidadeEmEstoque
            })
        })) ?? [],
        lisColors: colorUnidade.map(item => ({
            backgroundcolor: item.backgroundcolor,
            color: item.color,
            statusQuantidade: item.TIPO
        }))
    })

    useEffect(() => {
        changeFilter(Mock as TableProps[],
            dataListCodigo as ListCodigoVisible[],
            dataListUnidade as ListUnidadeVisible[],
            dataFilterTipo as listTipoVisible[],
            dataFilterFornecedor as listFornecedorVisible[],
            dataFilterCategoria as listCategoriaVisible[],
            dataFilterStatus as listStatusVisible[],
            dataFilterStatusQuantidade as listStatusQuantidadeVisible[]
        )

        setData(Mock as TableProps[]);

    }, [dataListCodigo,
        dataListUnidade,
        dataFilterTipo,
        dataFilterFornecedor,
        dataFilterCategoria,
        dataFilterStatus,
        dataFilterStatusQuantidade])

    function changeFilter(list: TableProps[],
        listCodigo: ListCodigoVisible[],
        listUnidade: ListUnidadeVisible[],
        listTipo: listTipoVisible[],
        listFornecedor: listFornecedorVisible[],
        listCategoria: listCategoriaVisible[],
        listStatus: listStatusVisible[],
        listStatusQuantidade: listStatusQuantidadeVisible[]) {

        let newList: TableProps[] = [];
        list.map(item => {
            const verifyCodigo = listCodigo
                .filter(codigo =>
                    item.codigo === codigo.codigo && codigo.visible);
            const verifyUnidade = listUnidade
                .filter(unidade =>
                    item.unidade === unidade.unidade && unidade.visible);
            const verifyTipo = listTipo
                .filter(tipo =>
                    item.tipoMaterial === tipo.tipo && tipo.visible);
            const verifyFornecedor =
                listFornecedor
                    .filter(tipo => item.fornecedor === tipo.fornecedor && tipo.visible);
            const verifyCategoria = listCategoria
                .filter(tipo =>
                    item.categoriaMaterial === tipo.categoria && tipo.visible);
            const verifyStatus = listStatus
                .filter(status => item.statusCodigo === status.status && status.visible)
            const verifyStatusQuantidade = listStatusQuantidade
                .filter(tipo =>
                    getStatusQUantidade({
                        estoqueMaximo: item.quantidadeMaxima,
                        estoqueMinimo: item.quantidadeMinima,
                        estoqueSegurança: item.quantidadeSeguranca,
                        quantidadeEstoque: item.quantidadeEmEstoque
                    }) === tipo.statusQuantidade && tipo.visible);


            if (verifyCodigo.length > 0 &&
                verifyUnidade.length > 0 &&
                verifyTipo.length > 0 &&
                verifyFornecedor.length > 0 &&
                verifyCategoria.length > 0 &&
                verifyStatus.length > 0 &&
                verifyStatusQuantidade.length > 0) newList.push(item)
        })
        setFilter(newList)
    }


    return (
        <div className={style.container_table}>
            <div className={style.container_button} >
                <div className={style.wrap_container_button} >

                </div>
                
            </div>
            <div className={style.wrap_container_table} >
                <section className={style.table_teste}>
                    <table className={style.table} >
                        <thead>
                            <tr>
                                <th>
                                    <div className={toogleCodigo ? style.cardFilter : style.cardFilter_close} >
                                        {data && (
                                            <List />
                                        )}
                                    </div>
                                    <span>
                                        Código
                                        <CiMenuKebab onClick={() => setToogleCodigo(!toogleCodigo)} />
                                    </span>
                                </th>
                                <th>Descrição</th>
                                <th>QTD.</th>
                                <th>
                                    <div className={
                                        toogleUnidade ?
                                            style.cardUnidade :
                                            style.cardUnidade_close
                                    } >
                                        <ListUnidade />
                                    </div>
                                    <span>
                                        UND.
                                        <CiMenuKebab onClick={() => setToogleUnidade(!toogleUnidade)} />
                                    </span>
                                </th>
                                <th>
                                    <div className={
                                        toogleTipo ?
                                            style.cardTipo :
                                            style.cardTipo_close
                                    } >
                                        <ListTipo />
                                    </div>
                                    <span>
                                        Tipo
                                        <CiMenuKebab onClick={() => setToogleTipo(!toogleTipo)} />
                                    </span>

                                </th>
                                <th>MAX.</th>
                                <th>SEG.</th>
                                <th>MIN.</th>
                                <th>
                                    <div className={
                                        toogleFornecedor ?
                                            style.cardFornecedor :
                                            style.cardFornecedor_close
                                    } >
                                        <ListFornecedor />
                                    </div>
                                    <span>
                                        Fornecedor
                                        <CiMenuKebab onClick={() => setToogleFornecedor(!toogleFornecedor)} />
                                    </span>
                                </th>
                                <th>
                                    <div className={
                                        toogleCategoria ?
                                            style.cardCategoria :
                                            style.cardCategoria_close
                                    } >
                                        <LisCategoria />
                                    </div>
                                    <span>
                                        Categoria
                                        <CiMenuKebab onClick={() => setToogleCategoria(!toogleCategoria)} />
                                    </span>
                                </th>
                                <th>Categoria 2</th>
                                <th>
                                    <div className={
                                        toogleStatus ?
                                            style.cardStatus :
                                            style.cardStatus_close
                                    } >
                                        <ListStatus />
                                    </div>
                                    <span>
                                        Ativo
                                        <CiMenuKebab onClick={() => setToogleStatus(!toogleStatus)} />
                                    </span>
                                </th>
                                <th>
                                    <div className={
                                        toogleStatusQuantidade ?
                                            style.cardStatusQuantidade :
                                            style.cardStatusQuantidade_close
                                    } >
                                        <ListStatusQuantidade />

                                    </div>
                                    <span>
                                        Status
                                        <CiMenuKebab onClick={() => setToogleStatusQuantidade(!toogleStatusQuantidade)} />
                                    </span>
                                </th>
                                <th>EDIT.</th>
                            </tr>
                        </thead>
                        <tbody className={style.table_body}>
                            {data && (
                                filter.map((item, index) =>
                                    <tr key={index}>
                                        <td>{item.codigo}</td>
                                        <td>{item.descricao}</td>
                                        <td>{item.quantidadeEmEstoque.toLocaleString()}</td>
                                        <td>
                                            <p style={getColor(item.unidade)}>{item.unidade}</p>
                                        </td>
                                        <td>
                                            <p style={getColor(item.tipoMaterial)} >{item.tipoMaterial}</p>
                                        </td>
                                        <td>{item.quantidadeMaxima.toLocaleString()}</td>
                                        <td>{item.quantidadeSeguranca.toLocaleString()}</td>
                                        <td>{item.quantidadeMinima.toLocaleString()}</td>
                                        <td>
                                            {item.fornecedor}
                                        </td>
                                        <td>
                                            <p style={getColor(item.categoriaMaterial)} >{item.categoriaMaterial}</p>
                                        </td>
                                        <td>
                                            <p>{item.categoriaMaterial2}</p>
                                        </td>
                                        <td>
                                            <p style={getColor(item.statusCodigo)} >{item.statusCodigo}</p>
                                        </td>
                                        <td>
                                            <p style={getColor(getStatusQUantidade({
                                                estoqueMaximo: item.quantidadeMaxima,
                                                estoqueMinimo: item.quantidadeMinima,
                                                quantidadeEstoque: item.quantidadeEmEstoque,
                                                estoqueSegurança: item.quantidadeSeguranca
                                            }))} >{getStatusQUantidade({
                                                estoqueMaximo: item.quantidadeMaxima,
                                                estoqueMinimo: item.quantidadeMinima,
                                                quantidadeEstoque: item.quantidadeEmEstoque,
                                                estoqueSegurança: item.quantidadeSeguranca
                                            })}</p>
                                        </td>
                                        <td>
                                            <FiEdit />
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </section>

            </div>

        </div>

    )
}