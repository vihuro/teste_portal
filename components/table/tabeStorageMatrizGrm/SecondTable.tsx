import { useEffect, useState } from "react";
import style from "./style.module.css";
import Api from "../../../service/api/matriz/estoque-grm";
import { TbEdit } from "react-icons/tb";
import { CiMenuKebab } from "react-icons/ci";
import CardAddComponent from "./cardAdd/Card";
import FilterCodigo from "./filterCodigo/Card";
import FilterLocal from "./filterLocal/Card";


interface ItemsProps {
    id: string,
    codigo: string,
    descricao: string,
    quantidade: number,
    substitutos: [{
        codigo: string,
        descricao: string,
        localEstocagem: string,
        produtoId: string,
        quantidade: number,
        substitutoId: string,
        tipoMaterial: string,
        unidade: string
    }],
    localEstocagem: {
        guid: string,
        localEstocagem: string
    }
    tipoMaterial: {
        id: string,
        tipo: string
    },
    unidade: string,
    cadastro: {
        id: string,
        apelido: string,
        nome: string,
        dataHora: Date
    },
    alteracao: {
        id: string,
        apelido: string,
        nome: string,
        dataHora: Date
    }
    ativo: boolean
}
interface Color {
    background: string,
    color: string
}


export default function Table() {
    const [data, setData] = useState<ItemsProps[]>([]);
    const [dataFiltered, setDataFiltered] = useState<ItemsProps[]>([]);
    const [toogleAdd, setToogleAdd] = useState<boolean>(false);
    const [toogleFilterCodigo, setToogleFilterCodigo] = useState<boolean>(false);
    const [toogleFilterLocal, setToogleFilterLocal] = useState<boolean>(false);

    const colors: Record<string, Color> = {

        "MATRIZ - GRM": {
            background: "#B40000",
            color: "white"
        },
        "FABRICA - GRM": {
            background: "#5D60E9",
            color: "white"
        },
        ROL: {
            background: "#4CFAFA",
            color: "#048D8A"
        },
        KG: {
            background: "#F47210",
            color: "#9D4707"
        },
        "PET VIRGEM": {
            background: "#3FFF8D",
            color: "#15990B"
        },
        "PET-2": {
            background: "#00923B",
            color: "white"
        },
        "PP VIRGEM": {
            background: "#8C9EF8",
            color: "white"
        },
        "FPA-2": {
            background: "#0B28B9",
            color: "white"
        },
        STRETCH: {
            background: "#E753DC",
            color: "white"
        },


        "STRECH ECO": {
            background: "#94148B",
            color: "white"
        },
        SHRINK: {
            background: "#EB5353",
            color: "white"
        },
        true: {
            background: "#3FFF8D",
            color: "#15990B"
        },
        false: {
            background: "#B40000",
            color: "red"
        }
    }


    useEffect(() => {
        FechData();
    }, [])

    const { CardStorage: CardAdd } = CardAddComponent();
    const { Card: CardFilterCodigo, filteredData: textCodigo } = FilterCodigo({
        listProps: data ? data.map(item => ({
            codigo: item.codigo,
            id: item.id
        })) : [],
        searchColor: getColorStyle
    })
    const { Card: CardFilterLocal, data: filterLocal } = FilterLocal({
        list: data ? data.map(item => ({
            id: item.localEstocagem.guid,
            localEstocagem: item.localEstocagem.localEstocagem
        })) : [],
        searchColors: getColorStyle
    });


    function getColorStyle(text: string) {
        const color = colors[text];

        return {
            background: color ? color.background : "black",
            color: color ? color.color : "white"
        };
    }

    async function FechData() {
        await Api.get("")
            .then(res => {
                setData(res.data)
            })
            .catch(err => console.log(err))
    }

    const filter = data.filter(item => {
        if (textCodigo.some(codigo => codigo.codigo === item.codigo && codigo.visible)) {

            return (
                filterLocal.some(local => local.localEstocagem === item.localEstocagem.localEstocagem && local.visible)
            );
        }
    })

    return (
        <div className={style.container_table} >
            <div className={toogleAdd ?
                style.container_add :
                style.container_add_close} >
                <CardAdd
                    changeToogle={setToogleAdd}
                    refreshTable={FechData}
                    searchColor={getColorStyle}
                />
            </div>

            <div className={style.container_button} >
                <div className={style.wrap_containerButton} >
                    <button onClick={() => setToogleAdd(!toogleAdd)} >
                        Adicionar Produto
                    </button>
                </div>
            </div>
            <div className={style.wrap_container_table} >
                <section className={style.table_teste} >
                    <table className={style.table} onClick={() => {
                        setToogleFilterCodigo(false);
                        setToogleFilterLocal(false);
                    }} >
                        <thead>
                            <tr>
                                <th>
                                    CÓDIGO
                                    <CiMenuKebab onClick={(e) => {
                                        e.stopPropagation(),
                                            setToogleFilterCodigo(!toogleFilterCodigo)
                                    }} />
                                    <div onClick={e => e.stopPropagation()}
                                        className={toogleFilterCodigo ?
                                            style.container_codigo :
                                            style.container_codigo_close} >
                                        <CardFilterCodigo />
                                    </div>
                                </th>
                                <th>Descrição</th>
                                <th>QTD.</th>
                                <th>UND.</th>
                                <th>SUBST.</th>
                                <th>
                                    LOCAL/ EST.
                                    <CiMenuKebab onClick={e => {
                                        e.stopPropagation(),
                                            setToogleFilterLocal(!toogleFilterLocal)
                                    }} />
                                    <div onClick={(e) => e.stopPropagation()}
                                        className={toogleFilterLocal ?
                                            style.card_local :
                                            style.card_local_close}
                                    >
                                        <CardFilterLocal />
                                    </div>
                                </th>
                                <th>TIPO</th>
                                <th>STATUS</th>
                                <th>EDIT.</th>
                            </tr>
                        </thead>
                        <tbody className={style.table_body} >
                            {filter && filter.length > 0 ?
                                filter.map((item, index) => {
                                    return (
                                        <tr key={index} >
                                            <td>{item.codigo}</td>
                                            <td>{item.descricao}</td>
                                            <td>{item.quantidade}</td>
                                            <td>{item.unidade}</td>
                                            <td>{item.substitutos.length}</td>
                                            <td>{item.localEstocagem.localEstocagem}</td>
                                            <td>{item.tipoMaterial.tipo}</td>
                                            <td>{item.ativo ? "ATIVO" : "INATIVO"}</td>
                                            <td>
                                                <p>
                                                    <TbEdit />
                                                </p>
                                            </td>
                                        </tr>
                                    )
                                })
                                :
                                <>
                                    <tr style={{
                                        border: "none"
                                    }}>
                                        <td style={{
                                            border: 'none'
                                        }} colSpan={9}>Nenhum item disponivel!</td>
                                    </tr>
                                    <tr>
                                        <td style={{
                                            border: 'none'
                                        }} colSpan={9}>
                                            <span className={style.span} >:(</span>
                                        </td>
                                    </tr>
                                </>}
                        </tbody>
                    </table>
                </section>

            </div>
        </div>
    )
}

