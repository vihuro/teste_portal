'use client'
import style from "./style.module.css";
import { useState, useEffect } from "react";
import Mock from "./mock";
import { FiEdit } from "react-icons/fi";
import { CiMenuKebab } from 'react-icons/ci';
import { FilterCodigo } from "./filterCodigo/FilterCodigo";


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

interface colorsUnidade {
    TIPO: string,
    backgroundcolor: string,
    color: string
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
interface statusQuantidade {
    estoqueMaximo: number,
    estoqueMinimo: number,
    estoqueSegurança: number,
    quantidadeEstoque: number
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

    useEffect(() => {
        changeFilter(Mock as TableProps[], dataListCodigo as ListCodigoVisible[])

        setData(Mock as TableProps[]);

    }, [dataListCodigo])

    function changeFilter(list: TableProps[],
        listCodigo: ListCodigoVisible[]) {

        let newList: TableProps[] = [];
        list.map(item => {
            const verify = listCodigo.filter(codigo => item.codigo === codigo.codigo && codigo.visible);
            if (verify.length > 0) newList.push(item)

        })
        setFilter(newList)
    }


    return (
        <div className={style.container_table}>
            <div className={style.container_button} ></div>
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
                                    Código
                                    <CiMenuKebab onClick={() => setToogleCodigo(!toogleCodigo)} />
                                </th>
                                <th>Descrição</th>
                                <th>QTD.</th>
                                <th>UND.</th>
                                <th>Tipo</th>
                                <th>MAX.</th>
                                <th>SEG.</th>
                                <th>MIN.</th>
                                <th>Fornecedor</th>
                                <th>Categoria</th>
                                <th>Categoria 2</th>
                                <th>Ativo</th>
                                <th>Status</th>
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