"use Client"
import ApiRadar from "@/app/api/radar/ApiRadar";
import { useEffect, useState } from "react";




export default function DataOrder() {
    const [data, setData] = useState<any[]>([]);

    async function FechData() {
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
                "BuscarItemPedido": true
            }
        })
            .then(res => setData(res.data.BuscarPedidosResult))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        FechData();
    }, [])

    return (
        data && (
            data.map((item, index) => {
                return (
                    <tr key={index} >
                        <td>
                            {item["Codigo"]}
                        </td>
                        <td>
                            {item["NomeCliente"]}
                        </td>
                        <ul>

                            {item["ItensPedido"] && (
                                item["ItensPedido"].map((produto: any, indexProduto: number) => {
                                    return (
                                        <ul>
                                            {produto["CodigoItem"]}
                                            <li>{produto["NomeProdutoServico"]}</li>
                                        </ul>
                                    )

                                })
                            )}
                        </ul>
                    </tr>
                )
            })
        )
    )
}