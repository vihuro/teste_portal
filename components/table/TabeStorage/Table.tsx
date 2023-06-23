"use client"

import style from "./style.module.css";
import { useEffect, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { MdOutlineMapsHomeWork } from "react-icons/md";

export default function Table() {


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
    const [dataFiltterlocale, setDataFilterLocale] = useState({

        "fabrica": false
        ,

        "matriz": true
    })


    interface Item {
        codigo: string,
        descricao: string,
        unidade: string,
        quantidade: string,
        localEstocagem: string,
        dataEntrada: string,
        tipo: string
    }
    interface PropsSub {

        codigo: string,
        descricao: string,
        quantidade: number,
        unidade: string,
        localEstocagem: string,
        tipo: string


    }

    interface Color {
        background: string,
        color: string
    }

    const colors: Record<string, Color> = {
        MATRIZ: {
            background: "#B40000",
            color: "white"
        },
        FABRICA: {
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
            background: color ? color.background : "",
            color: color ? color.color : ""
        };
    }

    const List = [
        {
            "codigo": "PENT103001",
            "descricao": "FITA PET VDE REC 9X0,63 C/20 KG",
            "unidade": "ROL",
            "quantidade": 12,
            "localEstocagem": "MATRIZ",
            "dataEntrada": "22-06-2023 10:00:00",
            "tipo": "PET VIRGEM",
            "substitutos": [
                {
                    "codigo": "PENT103010",
                    "descricao": "FITA PET VDE REC 9X0,63 C/20 KG",
                    "unidade": "ROL",
                    "quantidade": 12,
                    "localEstocagem": "MATRIZ",
                    "dataEntrada": "22-06-2023 10:00:00",
                    "tipo": "PET VIRGEM",
                }
                , {
                    "codigo": "PENT103011",
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
            "codigo": "PENT103001",
            "descricao": "FITA PET VDE REC 9X0,63 C/20 KG",
            "unidade": "ROL",
            "quantidade": 0,
            "localEstocagem": "FABRICA",
            "dataEntrada": "22-06-2023 10:00:00",
            "tipo": "PET VIRGEM"
        },
        {
            "codigo": "PENT103002",
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
            );
        }

        return false;
    });

    const CardFilterType = () => {
        const [card_filter_type, set_card_filter_type] = useState(false);

        const Card = () => {
            return (
                <ul className={style.list} >
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
                                            <p style={getColorStyle(item.tipo)} >{item.tipo}</p>
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

    return (
        <div className={style.container_table} >
            <table className={style.table} onClick={() => {
                set_card_filter_Local(false),
                    set_card_filter_type(false)
            }}>
                <thead>
                    <tr>
                        <th>
                            CÓDIGO
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
                            <div onClick={e => e.stopPropagation()} className={card_filter_Local ? style.card_local : style.card_local_close} >
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
                    </tr>
                </thead>
                <tbody className={style.table_body} >
                    {filter && (
                        filter.map((item, index) => {
                            const isRowSelected = selectedRows.includes(index);
                            return (
                                <tr key={index} >
                                    <td>{item.codigo}</td>
                                    <td>{item.descricao}</td>
                                    <td>{item.quantidade}</td>
                                    <td className={`${style["table_button"]} ${style["--unidade"]}`}>
                                        <p
                                            style={getColorStyle(item.unidade)}
                                        >
                                            {item.unidade}
                                        </p>
                                    </td>
                                    <td className={`${style["table_button"]} ${style["--substitutos"]}`}
                                        onClick={() => {
                                            if (isRowSelected) {
                                                setSelectedRows(selectedRows.filter((row) => row !== index));
                                            } else {
                                                setSelectedRows([...selectedRows, index]);
                                            }
                                        }}
                                    >
                                        {item.substitutos && item.substitutos.length > 0 && (
                                            <div className={
                                                isRowSelected
                                                    ? style.cardSubstituto
                                                    : style.cardSubstituto_close
                                            } >

                                                <CardSubs list={item.substitutos} />
                                            </div>
                                        )}
                                        <p>
                                            {item.substitutos?.length}
                                        </p>
                                    </td>
                                    <td className={`${style["table_button"]} ${style["--estocagem"]}`}>
                                        <p
                                            style={getColorStyle(item.localEstocagem)}>
                                            {item.localEstocagem}
                                        </p>
                                    </td>
                                    <td className={`${style["table_button"]} ${style["--tipo"]}`}>
                                        <p style={getColorStyle(item.tipo)}>
                                            {item.tipo}
                                        </p>
                                    </td>
                                </tr>
                            )
                        })
                    )}
                </tbody>
            </table>
        </div>
    )
}