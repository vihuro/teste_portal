"use cliente"
import { useEffect, useState } from "react";
import Api from "../../../../service/api/matriz/estoque-grm";
import style from "./style.module.css";

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

export default function Table() {
    const [data, setData] = useState<ItemsProps[]>([]);

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

    return (
        <section className={style.container} >
            <section className={style.container_table}>
                <table className={style.table} >
                    <thead>
                        <tr>
                            <th>CÓDIGO</th>
                            <th>MEDIDA</th>
                            <th>UND.</th>
                            <th>QTDE</th>
                            <th>DATA/FABR.</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && (
                            data.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.codigo}</td>
                                    <td>{item.descricao}</td>
                                    <td>{item.unidade}</td>
                                    <td>{item.quantidade}</td>
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