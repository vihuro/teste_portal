import style from "../style.module.css";
import { useEffect, useState } from "react"

interface PropsSub {

    codigo: string,
    descricao: string,
    quantidade: number,
    unidade: string,
    localEstocagem: string,
    tipoMaterial: string
}


interface props {
    list: PropsSub[],
    getColor: Function
}


function Card({ list, getColor }: props) {



    return (

        <table className={style.cardSubstituto_items} >
            <tbody>
                {list.map((item, index) => (
                    <tr key={index} >
                        <td>
                            {item.codigo}
                        </td>
                        <td>
                            {item.descricao}
                        </td>
                        <td>
                            {item.quantidade}
                        </td>
                        <td>
                            <p style={getColor(item.unidade)} >
                                {item.unidade}
                            </p>
                        </td>
                        <td>
                            <p style={getColor(item.localEstocagem)} >
                                {item.localEstocagem}
                            </p>
                        </td>
                        <td>
                            <p style={getColor(item.tipoMaterial)} >
                                {item.tipoMaterial}
                            </p>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

    )
}

export default function CardSubstituto() {
    return {
        Card
    }
}