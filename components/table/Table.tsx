"use client"

import style from "./style.module.css";
import ApiRadar from "@/app/api/radar/ApiRadar";
import { useEffect, useState } from "react";

export default function Table() {
    const [data, setData] = useState([]);

    useEffect(() => {

        fecthData();
    }, [])

    async function fecthData() {
        await ApiRadar.post("Comercial/Comercial.svc/json/BuscarPedidos", {
            "login": {
                "Base": "THR_2019 07-05-2023 as",
                "Usuario": "vitorhu",
                "Senha": "25249882"
            },
            "filtro": {
                "OrigemPedido": "0",
                "CodigoFilial": "1",
                "SituacaoPedido": "8",
                "BuscarDadosInfoPlus": false,
                "BuscarDadosAdicionais": false,
                "BuscarApontamentos": false,
                "BuscarLiberacoes": false,
                "BuscarParcelaPagamento": false,
                "BuscarRateioEmpresarial": false,
                "BuscarItemPedido": true
            }
        })
            .then(res => setData(res.data.BuscarPedidosResult))
            .catch(err => console.log(err))
    }

    return (
        <div className={style.container_table} >
            <table>
                <tbody>
                    {data && (
                        data.map((item, index) => {
                            return (
                                <tr>
                                    <td>{item['Codigo']}</td>
                                    <td>{item['NomeCliente']}</td>

                                </tr>
                            )
                        })
                    )}
                </tbody>

            </table>
        </div>
    )
}