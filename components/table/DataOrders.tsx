"use Client"
import { useEffect, useState } from "react";


export default function DataOrder() {
    const [data, setData] = useState<any[]>([]);



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