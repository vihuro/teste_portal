"use client"

import style from "./style.module.css";
import React, { use, useEffect, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { BiFilter } from "react-icons/bi";
import { TbEdit } from "react-icons/tb";

import CardFilterTipo from "./filterTipo/Card";
import CardFilterLocale from "./filterLocal/Card";
import CardFilterCodigo from "./filterCodigo/Card";

import CardStorageTeste from "./cardAdd/Card";

import Api from "../../../service/api/matriz/estoque-grm";
import CardChange from "./cardChange/Card";


export default function Table() {

    
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


    interface PropsSub {

        codigo: string,
        descricao: string,
        quantidade: number,
        unidade: string,
        localEstocagem: string,
        tipoMaterial: string
    }

    interface Color {
        background: string,
        color: string
    }
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

    const [data, setData] = useState<ItemsProps[]>([]);
    useEffect(() => {

        FechData();

    }, [])

    async function FechData() {
        await Api.get("")
            .then(res => {
                setData(res.data)

            })
            .catch(err => console.log(err))
    }



    function getColorStyle(text: string) {
        const color = colors[text];

        return {
            background: color ? color.background : "black",
            color: color ? color.color : "white"
        };
    }

    const { Card: CardTipoFilter, data: listFilterTipo } = CardFilterTipo({
        list: data.map(item => ({
            id: item.tipoMaterial.id,
            tipo: item.tipoMaterial.tipo
        })),
        searchColor: getColorStyle
    });
    const [toogleFilterTipo, setToogleFilterTipo] = useState<boolean>(false);
    const { Card: CardFilterLocaleCard, data: listFilterLocale } = CardFilterLocale({
        list: data.map(item => ({
            id: item.localEstocagem.guid,
            localEstocagem: item.localEstocagem.localEstocagem
        })),
        searchColors: getColorStyle
    });
    const [toogleFilterlocal, setToogleLocal] = useState<boolean>(false);
    const { Card: CardFilterCodigoCard, data: listFilterCodigo, filter: filterTextCodigo } = CardFilterCodigo({
        listProps: data.map(item => ({
            codigo: item.codigo,
            id: item.id
        })),
        searchColor: getColorStyle
    })
    const [toogleFilterCodigo, setToogleFilterCodigo] = useState<boolean>(false);


    const filter = data.filter(item => {
        if (filterTextCodigo.some(codigo => codigo.codigo === item.codigo && codigo.visible)) {
            return (
                listFilterLocale.some(local => local.localEstocagem === item.localEstocagem.localEstocagem && local.visible) &&
                listFilterTipo.some(tipo => tipo.tipo === item.tipoMaterial.tipo && tipo.visible)
            )
        }

    });




    const { CardStorage, toogle: toogleAdd, setToogle: changeToogleAdd } = CardStorageTeste()


    const [dataItemAlteracao, setDataItemAlteracao] = useState<ItemsProps>();


    const CardSubstituto = () => {

        const [toggle, setToggle] = useState(false);
        const [selectedRows, setSelectedRows] = useState<number[]>([]);


        const Card = ({ list }: { list: PropsSub[] }) => {

            return (
                <>
                    {list && list.length > 0 && (
                        <table className={style.cardSubstituto_items}>
                            <tbody>


                                {list.map((item, index) => (

                                    <tr key={index}>
                                        <td>{item.codigo}</td>
                                        <td>{item.descricao}</td>
                                        <td>{item.quantidade}</td>
                                        <td>
                                            <p style={getColorStyle(item.unidade)}>{item.unidade}</p>
                                        </td>
                                        <td>
                                            <p style={getColorStyle(item.localEstocagem)} > {item.localEstocagem}</p>
                                        </td>
                                        <td>
                                            <p style={getColorStyle(item.tipoMaterial)} >{item.tipoMaterial}</p>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </>
            );
        };

        return {
            toggle,
            setToggle,
            Card,
            selectedRows,
            setSelectedRows
        };
    };

    const { Card: CardSubs, setToggle, toggle, selectedRows, setSelectedRows } = CardSubstituto();
    const { Card: CardAlteracao, setToogle: setToogleAlteracao, toogle: toogleAlteracao } = CardChange()
    const [value, setValue] = useState("");
    const [valueDooble, setValueDooble] = useState(0);
    const [dataItemString, setDataItemString] = useState("");

    useEffect(() => {
        alteracao({ id: dataItemString })

    }, [data]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {

        const text = e.target.value;

        const string = text.replaceAll(".", "").replace(",", ".");

        const dooble = parseFloat(string)
        const stringInput = dooble.toLocaleString("pt-Br", {
            style: "decimal",
            maximumFractionDigits: 2
        })


        const caracteres = e.target.value.length;
        const lastCharacter = e.target.value.charAt(caracteres - 1);


        const testeInStringInput = lastCharacter === "," ? stringInput + "," : stringInput

        setValueDooble(valueDooble);

        setValue(testeInStringInput)


    };

    function alteracao({ id }: { id: string }) {

        var item = data.find(item => item.id === id);

        return setDataItemAlteracao(item);
    }


    return (
        <div className={style.container_table} >

            <div className={toogleAdd ? style.container_add : style.container_add_close} >
                <CardStorage  changeToogle={changeToogleAdd} searchColor={getColorStyle} refreshTable={() => FechData()} />
            </div>
            <div className={toogleAlteracao ? style.container_alteracao : style.container_alteracao_close} >
                {dataItemAlteracao && (
                    <CardAlteracao
                        data={dataItemAlteracao}
                        toogle={toogleAlteracao}
                        changeToogle={setToogleAlteracao}
                        refreshTable={() => FechData()}
                    />
                )}

            </div>
            <div className={style.container_button} >

                <div className={style.wrap_containerButton} >
                    <button onClick={() => changeToogleAdd(!toogleAdd)}>
                        Adicionar Produto
                    </button>
                </div>

            </div>
            <div className={style.wrap_container_table} >
                <section className={style.table_teste} >
                    <table className={style.table} onClick={() => {
                        setToogleFilterTipo(false)
                        setToogleLocal(false);
                    }}>
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
                                            style.container_codigo_close}>
                                        <CardFilterCodigoCard />
                                    </div>
                                </th>
                                <th>
                                    DESCRIÇÃO
                                </th>
                                <th>
                                    QTD.
                                </th>
                                <th>
                                    UND.
                                </th>
                                <th>
                                    SUBST.
                                </th>
                                <th>
                                    LOCAL/ EST.
                                    <CiMenuKebab onClick={(e) => {
                                        e.stopPropagation(),
                                            setToogleLocal(!toogleFilterlocal)
                                    }} />
                                    <div onClick={e => e.stopPropagation()}
                                        className={toogleFilterlocal ?
                                            style.card_local :
                                            style.card_local_close} >
                                        <CardFilterLocaleCard />
                                    </div>
                                </th>
                                <th>
                                    TIPO
                                    <CiMenuKebab onClick={(e) => {
                                        e.stopPropagation(),
                                            setToogleFilterTipo(!toogleFilterTipo)
                                    }} />

                                    <div onClick={e => e.stopPropagation()}
                                        className={toogleFilterTipo ?
                                            style.card_type :
                                            style.card_type_close} >
                                        <CardTipoFilter />

                                    </div>
                                </th>
                                <th>
                                    STATUS
                                </th>
                                <th>
                                    EDIT.
                                </th>
                            </tr>
                        </thead>
                        <tbody className={style.table_body} >
                            {
                                data && filter.length > 0 ?
                                    filter.map((item, index) => {
                                        const isRowSelectd = selectedRows.includes(index);

                                        return (
                                            <tr key={index} >
                                                <td>{item.codigo}</td>
                                                <td>{item.descricao}</td>
                                                <td>{item.quantidade.toLocaleString()}</td>
                                                <td className={`${style["table_button"]} ${style["--unidade"]}`}>
                                                    <p style={getColorStyle(item.unidade)} >
                                                        {item.unidade}
                                                    </p>
                                                </td>
                                                <td className={`${style["table_button"]} ${style["--substitutos"]}`}
                                                    onClick={() => {
                                                        if (isRowSelectd) {
                                                            setSelectedRows(selectedRows.filter((row) => row !== index))
                                                        } else {
                                                            setSelectedRows([...selectedRows, index]);
                                                        }
                                                    }}
                                                >
                                                    {item.substitutos && item.substitutos.length > 0 && (
                                                        <div className={
                                                            isRowSelectd ?
                                                                style.cardSubstituto
                                                                : style.cardSubstituto_close

                                                        } >
                                                            <CardSubs list={item.substitutos} />
                                                        </div>
                                                    )}
                                                    <p>{item.substitutos.length}</p>
                                                </td>
                                                <td className={`${style["table_button"]} ${style["--estocagem"]}`}>
                                                    <p style={getColorStyle(item.localEstocagem.localEstocagem)}>
                                                        {item.localEstocagem.localEstocagem}
                                                    </p>
                                                </td>
                                                <td className={`${style["table_button"]} ${style["--tipo"]}`}>
                                                    <p style={getColorStyle(item.tipoMaterial.tipo)}>
                                                        {item.tipoMaterial.tipo}
                                                    </p>
                                                </td>
                                                <td className={`${style["table_button"]} ${style["--tipo"]}`} >
                                                    <p style={getColorStyle(item.ativo.toString())} >
                                                        {item.ativo === true ? "ATIVO" : "INATIVO"}
                                                    </p>

                                                </td>
                                                <td style={{
                                                    fontSize: 32
                                                }} >
                                                    <p onClick={() => {
                                                        alteracao({ id: item.id });
                                                        setDataItemString(item.id)
                                                        setToogleAlteracao(true)
                                                    }} >
                                                        <TbEdit />
                                                    </p>
                                                </td>
                                            </tr>
                                        )
                                    })
                                    :
                                    (
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
                                        </>
                                    )
                            }
                        </tbody>
                    </table>
                </section>

            </div>

        </div>
    )
}