"use client"

import style from "./style.module.css";
import React, { use, useEffect, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { MdOutlineMapsHomeWork } from "react-icons/md";
import { BiFilter } from "react-icons/bi";
import { TbEdit } from "react-icons/tb";

import CardStorageTeste from "./cardAdd/Card";

import Api from "../../../service/api/matriz/estoque-grm";


export default function Table() {

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

    const { CardStorage, toogle: toogleAdd, setToogle: changeToogleAdd } = CardStorageTeste()

    const [cardAdd, setCardAdd] = useState(false);

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

        "shrink": true

    })
    const [radioType, setRadioType] = useState({
        "marcar todos": true,
        "desmarcar todos": false
    })
    const [dataFiltterlocale, setDataFilterLocale] = useState({

        "fabrica": true
        ,

        "matriz": true
    })
    const [dataFilterCode, setDataFilterCode] = useState([]);

    const [data, setData] = useState<ItemsProps[]>([]);

    const [textCode, setTextCode] = useState("");

    interface ItemsProps {
        id: string,
        codigo: string,
        descricao: string,
        quantidade: Number,
        substitutos: [],
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
        "PP VIRGEM": {
            background: "#8C9EF8",
            color: "white"
        },
        "PP-2": {
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
        }
    }
    function getColorStyle(text: string) {
        const color = colors[text];

        return {
            background: color ? color.background : "black",
            color: color ? color.color : "white"
        };
    }
    const List = [
        {
            "codigo": "PETN103001",
            "descricao": "FITA PET VDE REC 9X0,63 C/20 KG",
            "unidade": "ROL",
            "quantidade": 0,
            "localEstocagem": "MATRIZ",
            "dataEntrada": "22-06-2023 10:00:00",
            "tipo": "PET VIRGEM",
            "substitutos": [
                {
                    "codigo": "PETN103010",
                    "descricao": "FITA PET VDE REC 9X0,63 C/20 KG",
                    "unidade": "ROL",
                    "quantidade": 12,
                    "localEstocagem": "MATRIZ",
                    "dataEntrada": "22-06-2023 10:00:00",
                    "tipo": "PET VIRGEM",
                }
                , {
                    "codigo": "PETN103011",
                    "descricao": "FITA PET VDE REC 9X0,63 C/20 KG",
                    "unidade": "ROL",
                    "quantidade": 12,
                    "localEstocagem": "FABRICA",
                    "dataEntrada": "22-06-2023 10:00:00",
                    "tipo": "PET VIRGEM",
                }
            ]
        },
        {
            "codigo": "PETN103001",
            "descricao": "FITA PET VDE REC 9X0,63 C/20 KG",
            "unidade": "ROL",
            "quantidade": 0,
            "localEstocagem": "FABRICA",
            "dataEntrada": "22-06-2023 10:00:00",
            "tipo": "PET VIRGEM"
        },
        {
            "codigo": "PETN103002",
            "descricao": "FITA PET VDE REC 9X0,63 C/20 KG",
            "unidade": "ROL",
            "quantidade": 12,
            "localEstocagem": "FABRICA",
            "dataEntrada": "22-06-2023 10:00:00",
            "tipo": "PET VIRGEM"
        },
        {
            "codigo": "PETN103085",
            "descricao": "FITA PET VDE 9 X 0,35 C/1000M",
            "unidade": "ROL",
            "quantidade": 39,
            "localEstocagem": "MATRIZ",
            "dataEntrada": "22-06-2023 10:00:00",
            "tipo": "PET VIRGEM"
        },
        {
            "codigo": "PETN103145",
            "descricao": "FITA PET VDE REC 9MM C/2.800M",
            "unidade": "ROL",
            "quantidade": 31,
            "localEstocagem": "MATRIZ",
            "dataEntrada": "22-06-2023 10:00:00",
            "tipo": "PET VIRGEM"
        },
        {
            "codigo": "PETN503005",
            "descricao": "FITA PET DAS REC 9X0,63 C/2.900M",
            "unidade": "ROL",
            "quantidade": 7,
            "localEstocagem": "MATRIZ",
            "dataEntrada": "22-06-2023 10:00:00",
            "tipo": "PET VIRGEM"
        },
        {
            "codigo": "PETN103083",
            "descricao": "FITA PET DAS AUTO VDE REC 9MM C/20 KG",
            "unidade": "ROL",
            "quantidade": 11,
            "localEstocagem": "MATRIZ",
            "dataEntrada": "22-06-2023 10:00:00",
            "tipo": "PET VIRGEM"
        },
        {
            "codigo": "PETN103047",
            "descricao": "FITA PET VDE REC 12X0,80 C/1.000M",
            "unidade": "ROL",
            "quantidade": 39,
            "localEstocagem": "MATRIZ",
            "dataEntrada": "22-06-2023 10:00:00",
            "tipo": "PET VIRGEM"
        },
        {
            "codigo": "PETN103091",
            "descricao": "FITA PET PTA REC 12X0,80 C/1.640M",
            "unidade": "ROL",
            "quantidade": 17,
            "localEstocagem": "MATRIZ",
            "dataEntrada": "22-06-2023 10:00:00",
            "tipo": "PET VIRGEM"
        },
        {
            "codigo": "PETN203035",
            "descricao": "FITA PET-2 VDE 12X0,80 C/19KG",
            "unidade": "ROL",
            "quantidade": 100,
            "localEstocagem": "FABRICA",
            "dataEntrada": "22-06-2023 10:00:00",
            "tipo": "PET-2"
        },
        {
            "codigo": "STRMN101001",
            "descricao": "FILME STRETCH MAN TRD 500 X 0,025 B 4 T1,4",
            "unidade": "KG",
            "quantidade": 100,
            "localEstocagem": "FABRICA",
            "dataEntrada": "22-06-2023 10:00:00",
            "tipo": "STRETCH"
        },
        {
            "codigo": "STRMN101001",
            "descricao": "FILME STRETCH MAN TRD 500 X 0,025 B 4 T1,4",
            "unidade": "KG",
            "quantidade": 100,
            "localEstocagem": "FABRICA",
            "dataEntrada": "22-06-2023 10:00:00",
            "tipo": "STRETCH ECO"
        },
        {
            "codigo": "SKMN101001",
            "descricao": "FILME SHRINK IF 1000 X 0,012 B 20 T1,2",
            "unidade": "KG",
            "quantidade": 100,
            "localEstocagem": "FABRICA",
            "dataEntrada": "22-06-2023 10:00:00",
            "tipo": "SHRINK"
        },
        {
            "codigo": "SKMN101001",
            "descricao": "FILME SHRINK IF 1000 X 0,012 B 20 T1,2",
            "unidade": "KG",
            "quantidade": 100,
            "localEstocagem": "FABRICA",
            "dataEntrada": "22-06-2023 10:00:00",
            "tipo": "PP VIRGEM"
        },
        {
            "codigo": "SKMN101001",
            "descricao": "FILME SHRINK IF 1000 X 0,012 B 20 T1,2",
            "unidade": "KG",
            "quantidade": 100,
            "localEstocagem": "MATRIZ",
            "dataEntrada": "22-06-2023 10:00:00",
            "tipo": "PP-2"
        }
    ]


    const filter = List.filter(item => {
        const text = item.codigo.toLowerCase().includes(textCode.toLowerCase());
        if (
            (item.localEstocagem === "FABRICA" && dataFiltterlocale.fabrica) ||
            (item.localEstocagem === "MATRIZ" && dataFiltterlocale.matriz)
        ) {
            return (
                (item.tipo === "PET VIRGEM" && dataFiltterTypes.pet_virgem) ||
                (item.tipo === "PET-2" && dataFiltterTypes.pet_2) ||
                (item.tipo === "PP VIRGEM" && dataFiltterTypes.pp_virgem) ||
                (item.tipo === "PP-2" && dataFiltterTypes.pp_2) ||
                (item.tipo === "STRETCH" && dataFiltterTypes.stretch) ||
                (item.tipo === "STRETCH ECO" && dataFiltterTypes.stretch_eco) ||
                (item.tipo === "SHRINK" && dataFiltterTypes.shrink)
            ) && text;
        }

        return false;
    });
    const [listCode, setListCode] = useState(filter.map(item => item.codigo))

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
                stretch_eco: true
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
                stretch_eco: false
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
                            checked={dataFiltterlocale.fabrica}
                            onChange={e =>
                                setDataFilterLocale({ ...dataFiltterlocale, fabrica: e.target.checked })}
                        />
                        <label htmlFor="fabrica" style={getColorStyle("FABRICA")} >
                            FÁBRICA
                        </label>
                    </li>
                    <li>
                        <input id="matriz" type="checkbox" checked={dataFiltterlocale.matriz}
                            onChange={e => setDataFilterLocale({ ...dataFiltterlocale, matriz: e.target.checked })} />
                        <label htmlFor="matriz" style={getColorStyle("MATRIZ")} >
                            MATRIZ
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

    const [value, setValue] = useState("");

    const [valueDooble, setValueDooble] = useState(0);

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



        // const number = e.target.value;

        // let formattedNumber = number.replace(/\D/g, ''); // Remove todos os caracteres não numéricos

        // if (formattedNumber.length > 3) {
        //   const integerPart = formattedNumber.slice(0, -3);
        //   const decimalPart = formattedNumber.slice(-3);
        //   formattedNumber = `${integerPart}.${decimalPart}`;

        //   let dotCount = Math.floor((integerPart.length - 1) / 3);
        //   let dotPosition = integerPart.length - dotCount * 3;

        //   while (dotCount > 0) {
        //     formattedNumber = formattedNumber.slice(0, dotPosition) + '.' + formattedNumber.slice(dotPosition);
        //     dotPosition += 4;
        //     dotCount--;
        //   }
        // }

        // setValue(formattedNumber);
    };


    return (
        <div className={style.container_table} >

            <div className={toogleAdd ? style.container_add : style.container_add_close} >
                <CardStorage toogle={toogleAdd} changeToogle={changeToogleAdd} />
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
                                    EDIT
                                </th>
                            </tr>
                        </thead>
                        <tbody className={style.table_body} >
                            {
                                data && data.length > 0 ?
                                    data.map((item, index) => {
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
                                                <td style={{
                                                    fontSize: 32
                                                }} >
                                                    <TbEdit />
                                                </td>
                                            </tr>
                                        )
                                    })
                                    // filter && filter.length > 0 ?
                                    //     filter.map((item, index) => {
                                    //         const isRowSelected = selectedRows.includes(index);
                                    //         return (
                                    //             <tr key={index} >
                                    //                 <td>{item.codigo}</td>
                                    //                 <td>{item.descricao}</td>
                                    //                 <td>{item.quantidade}</td>
                                    //                 <td className={`${style["table_button"]} ${style["--unidade"]}`}>
                                    //                     <p
                                    //                         style={getColorStyle(item.unidade)}
                                    //                     >
                                    //                         {item.unidade}
                                    //                     </p>
                                    //                 </td>
                                    //                 <td className={`${style["table_button"]} ${style["--substitutos"]}`}
                                    //                     onClick={() => {
                                    //                         if (isRowSelected) {
                                    //                             setSelectedRows(selectedRows.filter((row) => row !== index));
                                    //                         } else {
                                    //                             setSelectedRows([...selectedRows, index]);
                                    //                         }
                                    //                     }}
                                    //                 >
                                    //                     {item.substitutos && item.substitutos.length > 0 && (
                                    //                         <div className={
                                    //                             isRowSelected
                                    //                                 ? style.cardSubstituto
                                    //                                 : style.cardSubstituto_close
                                    //                         } >
                                    //                             <CardSubs list={item.substitutos} />
                                    //                         </div>
                                    //                     )}
                                    //                     <p>
                                    //                         {item.substitutos?.length}
                                    //                     </p>
                                    //                 </td>
                                    //                 <td className={`${style["table_button"]} ${style["--estocagem"]}`}>
                                    //                     <p
                                    //                         style={getColorStyle(item.localEstocagem)}>
                                    //                         {item.localEstocagem}
                                    //                     </p>
                                    //                 </td>
                                    //                 <td className={`${style["table_button"]} ${style["--tipo"]}`}>
                                    //                     <p style={getColorStyle(item.tipo)}>
                                    //                         {item.tipo}
                                    //                     </p>
                                    //                 </td>
                                    //             </tr>
                                    //         )
                                    //     })
                                    :
                                    (
                                        <>
                                            <tr style={{
                                                border: "none"
                                            }}>
                                                <td style={{
                                                    border: 'none'
                                                }} colSpan={7}>Nenhum item disponivel!</td>
                                            </tr>
                                            <tr>
                                                <td style={{
                                                    border: 'none'
                                                }} colSpan={7}>
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