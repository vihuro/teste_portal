"use cliente"
import { useEffect, useState } from "react";
import Api from "../../../../service/api/matriz/estoque-grm";
import style from "./style.module.css";
import FilterTipo from "./filterTipo/Card";

interface ItemsProps {
    id: string,
    codigo: string,
    descricao: string,
    quantidade: number,
    preço: number,
    dataFabricao: Date,
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
    dataFabricacao: Date,
    preco: number,
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
    const [toogleFilterTipo, setToogleFilterTipo] = useState<boolean>(false);

    useEffect(() => {
        FetchData()
    }, [])

    async function FetchData() {
        await Api.get("")
            .then(res => {
                setData(res.data)
            })
            .catch(err => console.log(err))
    }
    function YearAndMoth(value: Date) {
        const date = new Date(value);

        const day = (date.getDate() + 1).toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear().toString();
        const hour = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");

        return `${month}/${year}`

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
            color: "#021800"
        },
        "PET-2": {
            background: "#00923B",
            color: "white"
        },
        "FPA VIRGEM": {
            background: "#001dff9c",
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
        ADESIVA:{
            background: "#990000",
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

    const orderedData = data.slice().sort((a, b) => {
        const tipoA = a.tipoMaterial.tipo.toUpperCase();
        const tipoB = b.tipoMaterial.tipo.toUpperCase();

        if (tipoA < tipoB) {
            return -1;
        }
        if (tipoA > tipoB) {
            return 1;
        }
        return 0;
    });
    function getColorStyle(text: string) {
        const color = colors[text];

        return {
            background: color ? color.background : "black",
            color: color ? color.color : "white"
        };
    }

    const { CardFilterTipo, data: filterTipo } = FilterTipo({
        list: data.map(item => ({
            id: item.tipoMaterial.id,
            tipo: item.tipoMaterial.tipo
        })),
        searchColor: getColorStyle
    })

    const filter = orderedData.filter(item => {
        if (filterTipo.some(tipo => item.tipoMaterial.tipo === tipo.tipo && tipo.visible)) {
            return item;
        }
    })

    return (
        <section className={style.container} >
            <section className={style.container_table}>
                <table className={style.table} >
                    <thead>
                        <tr>
                            <th >CÓDIGO</th>
                            <th>MEDIDA</th>
                            <th>UND.</th>
                            <th>QTDE</th>
                            <th onClick={() => setToogleFilterTipo(!toogleFilterTipo)} >
                                TIPO
                                <div onClick={e => e.stopPropagation()}
                                    className={ toogleFilterTipo ? style.container_filterTipo:style.container_filterTipo_close} >
                                    <CardFilterTipo />
                                </div>
                            </th>
                            <th>DATA/FABR.</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && (
                            filter.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.codigo}</td>
                                    <td>{item.descricao}</td>
                                    <td>{item.unidade}</td>
                                    <td>{item.quantidade}</td>
                                    <td style={getColorStyle(item.tipoMaterial.tipo)} >{item.tipoMaterial.tipo}</td>
                                    <td>
                                        {YearAndMoth(item.dataFabricao)}
                                    </td>
                                </tr>
                            ))
                        )}

                    </tbody>
                </table>
            </section>
        </section>
    )
}