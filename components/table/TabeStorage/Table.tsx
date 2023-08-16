"use client"

import style from "./style.module.css";
import React, { use, useEffect, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { BiFilter } from "react-icons/bi";
import { TbEdit } from "react-icons/tb";

import CardStorageTeste from "./cardAdd/Card";

import Api from "../../../service/api/matriz/estoque-grm";
import CardChange from "./cardChange/Card";


export default function Table() {

    const [data, setData] = useState<ItemsProps[]>([]);
    useEffect(() => {
        FechData();
    }, [])
    useEffect(() => {
        alteracao({ id: dataItemString })

    }, [data])

    async function FechData() {
        await Api.get("")
            .then(res => {
                setData(res.data)

            })
            .catch(err => console.log(err))
    }


    const { CardStorage, toogle: toogleAdd, setToogle: changeToogleAdd } = CardStorageTeste()

    const [cardAdd, setCardAdd] = useState(false);

    const [dataItemAlteracao, setDataItemAlteracao] = useState<ItemsProps>();

    const [dataFiltterTypes, setDataFilterTypes] = useState({

        "pet_virgem": true
        ,

        "pet_2": true
        ,

        "pp_virgem": true
        ,

        "pp_2": true
        ,

        "stretch": true
        ,

        "stretch_eco": true
        ,

        "shrink": true,
        "PET VIRGEM": true,
        "PET-2": true,
        "FPA VIRGEM": true,
        "FPA-2": true
    })
    const [radioType, setRadioType] = useState({
        "marcar todos": true,
        "desmarcar todos": false
    })
    const [dataFiltterlocale, setDataFilterLocale] = useState({

        "FABRICA-GRM": true
        ,

        "MATRIZ-GRM": true
    })
    const [dataFilterCode, setDataFilterCode] = useState([]);



    const [textCode, setTextCode] = useState("");



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
        "MATRIZ-GRM": {
            background: "#B40000",
            color: "white"
        },
        "FABRICA-GRM": {
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
        "FPA VIRGEM": {
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
        "STRETCH ECO": {
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
    function getColorStyle(text: string) {
        const color = colors[text];

        return {
            background: color ? color.background : "black",
            color: color ? color.color : "white"
        };
    }


    const filter = data.filter(item => {


        const text = item.codigo.toLowerCase().includes(textCode.toLowerCase());
        if (
            (item.localEstocagem.localEstocagem === "FABRICA-GRM" && dataFiltterlocale["FABRICA-GRM"]) ||
            (item.localEstocagem.localEstocagem === "MATRIZ-GRM" && dataFiltterlocale["MATRIZ-GRM"])
        ) {
            return (
                (item.tipoMaterial.tipo === "PET VIRGEM" && dataFiltterTypes["PET VIRGEM"]) ||
                (item.tipoMaterial.tipo === "PET-2" && dataFiltterTypes["PET-2"]) ||
                (item.tipoMaterial.tipo === "FPA VIRGEM" && dataFiltterTypes["FPA VIRGEM"]) ||
                (item.tipoMaterial.tipo === "FPA-2" && dataFiltterTypes["FPA-2"]) ||
                (item.tipoMaterial.tipo === "PP VIRGEM" && dataFiltterTypes.pp_virgem) ||
                (item.tipoMaterial.tipo === "PP-2" && dataFiltterTypes.pp_2) ||
                (item.tipoMaterial.tipo === "STRETCH" && dataFiltterTypes.stretch) ||
                (item.tipoMaterial.tipo === "STRETCH ECO" && dataFiltterTypes.stretch_eco) ||
                (item.tipoMaterial.tipo === "SHRINK" && dataFiltterTypes.shrink)
            ) && text;
        }

        return false;
    });

    const [listCode, setListCode] = useState(data.map(item => item.codigo))

    const CardCodigo = (action: any) => {

        interface ListItem {
            text: string,
            visible: boolean
        }

        const [toogleCard, setToogleCard] = useState(false);


        const Card = (list: any) => {
            const [listVisible, setListVisible] = useState<ListItem[]>([]);

            useEffect(() => {
                selection();
            }, [])


            const [text, setText] = useState("");

            function selection() {
                const newList = list.list.map((item: any, index: number) => {
                    return {
                        text: item,
                        visible: true
                    };
                });
                setListVisible(newList);
            }


            function changeSelection(id: number, visible: boolean) {
                const newList = listVisible.map((item: any, index: number) => {
                    return {
                        ...item,
                        visible: id === index ? visible : item.visible
                    };
                });

                setListVisible(newList);
            }
            const filter = listVisible.filter((item) => item.text.toLowerCase().includes(text.toLowerCase()))


            return (
                <div className={style.card_codigo} >
                    <div className={style.filter} >
                        <input value={text} onChange={e => {
                            setText(e.target.value)
                            // action(e.target.value)
                        }
                        } placeholder="Digite o código..." type="text" />
                        <span> Filtro</span>

                        <BiFilter onClick={() => action(text)} style={{
                            color: "blue",
                            left: 0,
                            top: 0
                        }} />
                    </div>
                    {filter && (
                        filter.map((item: any, index: number) => {
                            return (
                                <ul key={index} >
                                    <li>
                                        <div>
                                            <input id={index.toString()} onChange={(e) => {
                                                changeSelection(index, e.target.checked)
                                            }} checked={item.visible} type="checkbox" />
                                            <label htmlFor={index.toString()} >{item.text}</label>
                                        </div>
                                    </li>
                                </ul>
                            )
                        })
                    )}
                </div>
            )
        }
        return {
            Card,
            toogleCard,
            setToogleCard,

        }
    }
    const CardFilterType = () => {
        const [card_filter_type, set_card_filter_type] = useState(false);
        function MarcarTodos() {
            setDataFilterTypes({
                pet_2: true,
                pet_virgem: true,
                pp_2: true,
                pp_virgem: true,
                shrink: true,
                stretch: true,
                stretch_eco: true,
                "PET VIRGEM": true,
                "PET-2": true,
                "FPA VIRGEM": true,
                "FPA-2": true
            })
            setRadioType({
                "desmarcar todos": false,
                "marcar todos": true
            })
        }
        function desmarcarTodos() {
            setDataFilterTypes({
                pet_2: false,
                pet_virgem: false,
                pp_2: false,
                pp_virgem: false,
                shrink: false,
                stretch: false,
                stretch_eco: false,
                "PET VIRGEM": true,
                "PET-2": true,
                "FPA VIRGEM": true,
                "FPA-2": true
            })
            setRadioType({
                "desmarcar todos": true,
                "marcar todos": false
            })
        }

        const Card = () => {
            return (
                <ul className={style.list} >
                    <li>
                        <div>
                            <input readOnly onClick={() => MarcarTodos()} id="marcar" name="selection" type="radio" checked={radioType["marcar todos"]} />
                            <label htmlFor="marcar" >
                                Marcar Todos
                            </label>
                        </div>
                    </li>
                    <li>
                        <div>
                            <input readOnly onClick={() => desmarcarTodos()} id="desmarcar" name="selection" type="radio" checked={radioType["desmarcar todos"]} />
                            <label htmlFor="desmarcar" >
                                Desmarcar Todos
                            </label>
                        </div>
                    </li>
                    <li>
                        <input id="pet_virgem" type="checkbox"
                            checked={dataFiltterTypes.pet_virgem}
                            onChange={e => setDataFilterTypes({ ...dataFiltterTypes, pet_virgem: e.target.checked })}
                        />
                        <label htmlFor="pet_virgem" style={getColorStyle("PET VIRGEM")} >
                            PET VIRGEM
                        </label>
                    </li>
                    <li>
                        <input id="pet_2" type="checkbox" checked={dataFiltterTypes.pet_2}
                            onChange={e => setDataFilterTypes({ ...dataFiltterTypes, pet_2: e.target.checked })} />
                        <label htmlFor="pet_2" style={getColorStyle("PET-2")} >
                            PET-2
                        </label>
                    </li>
                    <li>
                        <input id="pp_virgem" type="checkbox" checked={dataFiltterTypes.pp_virgem}
                            onChange={e => setDataFilterTypes({ ...dataFiltterTypes, pp_virgem: e.target.checked })} />
                        <label htmlFor="pp_virgem" style={getColorStyle("PP VIRGEM")} >
                            PP VIRGEM
                        </label>
                    </li>
                    <li>
                        <input id="pp_2" type="checkbox" checked={dataFiltterTypes.pp_2}
                            onChange={e => setDataFilterTypes({ ...dataFiltterTypes, pp_2: e.target.checked })} />
                        <label htmlFor="pp_2" style={getColorStyle("PP-2")}  >
                            PP-2
                        </label>
                    </li>
                    <li>
                        <input id="stretch" type="checkbox" checked={dataFiltterTypes.stretch}
                            onChange={e => setDataFilterTypes({ ...dataFiltterTypes, stretch: e.target.checked })} />
                        <label style={getColorStyle("STRETCH")} htmlFor="stretch" >
                            STRETCH
                        </label>
                    </li>
                    <li>
                        <input id="stretch_eco" type="checkbox" checked={dataFiltterTypes.stretch_eco}
                            onChange={e => setDataFilterTypes({ ...dataFiltterTypes, stretch_eco: e.target.checked })} />
                        <label htmlFor="stretch_eco" style={getColorStyle("STRETCH ECO")} >
                            STRETCH ECO
                        </label>
                    </li>
                    <li>
                        <input id="shrink" type="checkbox" checked={dataFiltterTypes.shrink}
                            onChange={e => setDataFilterTypes({ ...dataFiltterTypes, shrink: e.target.checked })} />
                        <label htmlFor="shrink" style={getColorStyle("SHRINK")}>
                            SHRINK
                        </label>
                    </li>
                </ul>
            )

        }
        return {
            set_card_filter_type,
            card_filter_type,
            Card
        }
    }
    const CardFilterLocal = () => {
        const [card_filter_Local, set_card_filter_Local] = useState(false);

        const Card = () => {
            return (
                <ul className={style.list} >
                    <li>
                        <input id="fabrica" type="checkbox"
                            checked={dataFiltterlocale["FABRICA-GRM"]}
                            onChange={e =>
                                setDataFilterLocale({ ...dataFiltterlocale, "FABRICA-GRM": e.target.checked })}
                        />
                        <label htmlFor="fabrica" style={getColorStyle("FABRICA-GRM")} >
                            FABRICA-GRM
                        </label>
                    </li>
                    <li>
                        <input id="matriz" type="checkbox" checked={dataFiltterlocale["MATRIZ-GRM"]}
                            onChange={e => setDataFilterLocale({ ...dataFiltterlocale, "MATRIZ-GRM": e.target.checked })} />
                        <label htmlFor="matriz" style={getColorStyle("MATRIZ-GRM")} >
                            MATRIZ-GRM
                        </label>
                    </li>
                </ul>
            )

        }
        return {
            set_card_filter_Local,
            card_filter_Local,
            Card
        }
    }
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

    const { Card, set_card_filter_type, card_filter_type } = CardFilterType();
    const { Card: CardLocal, set_card_filter_Local, card_filter_Local } = CardFilterLocal();
    const { Card: CardSubs, setToggle, toggle, selectedRows, setSelectedRows } = CardSubstituto();
    const { Card: CardCode, setToogleCard, toogleCard } = CardCodigo(setTextCode);
    const { Card: CardAlteracao, setToogle: setToogleAlteracao, toogle: toogleAlteracao } = CardChange()


    const [value, setValue] = useState("");

    const [valueDooble, setValueDooble] = useState(0);

    const [dataItemString, setDataItemString] = useState("");

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
                <CardStorage toogle={toogleAdd} changeToogle={changeToogleAdd} refreshTable={() => FechData()} />
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
                        set_card_filter_Local(false),
                            set_card_filter_type(false)
                    }}>
                        <thead>
                            <tr>
                                <th>
                                    CÓDIGO
                                    <CiMenuKebab onClick={(e) => {
                                        e.stopPropagation(),
                                            setToogleCard(!toogleCard)
                                    }} />
                                    <div onClick={e => e.stopPropagation()}
                                        className={toogleCard ?
                                            style.container_codigo :
                                            style.container_codigo_close}
                                    >
                                        <CardCode list={data.map(item => item.codigo)} />
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
                                            set_card_filter_Local(!card_filter_Local)
                                    }} />
                                    <div onClick={e => e.stopPropagation()}
                                        className={card_filter_Local ?
                                            style.card_local :
                                            style.card_local_close}
                                    >
                                        <CardLocal />
                                    </div>
                                </th>
                                <th>
                                    TIPO
                                    <CiMenuKebab onClick={(e) => {
                                        e.stopPropagation(),
                                            set_card_filter_type(!card_filter_type)
                                    }} />
                                    <div onClick={e => e.stopPropagation()} className={card_filter_type ? style.card_type : style.card_type_close} >
                                        <Card />
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
                                data && data.length > 0 ?
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