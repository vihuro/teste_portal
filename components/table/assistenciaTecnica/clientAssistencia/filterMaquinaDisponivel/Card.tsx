import { useEffect, useState } from "react";
import style from "./style.module.css";
import Api from "../../../../../service/api/assistenciaTecnica/Assistencia";

interface props {
    changeToogle: Function,
    list: string[]
}
interface maquinaProps {
    codigo: string,
    tipoMaquina: string,
    numeroSerie: string,
    id: string
}

export default function Card({ changeToogle, list }: props) {

    const [data, setData] = useState<maquinaProps[]>([]);
    const [listMaquina, setListMaquina] = useState<maquinaProps[]>([]);

    function CardFilterMaquinaDisponivel() {


        useEffect(() => {
            FetchData()
        }, [list])
        async function FetchData() {
            await Api.get("/maquina/sem-atribuicao")
                .then(res => setData(res.data))
                .catch(err => console.log(err))
        }
        console.log(listMaquina)
        return (
            <section className={style.container_table} >
                <table className={style.table} >
                    <thead>
                        <tr>
                            <th>CÓDIGO</th>
                            <th>DESCRIÇÃO</th>
                            <th>Nº SÉRIE</th>
                            <th>ADD.</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && (
                            data.map((item, index) => (
                                <tr key={index} >
                                    <td>{item.codigo}</td>
                                    <td>{item.tipoMaquina}</td>
                                    <td>{item.numeroSerie}</td>
                                    <td
                                        onClick={() => setListMaquina([
                                            ...listMaquina,
                                            {
                                                codigo: item.codigo,
                                                id: item.id,
                                                numeroSerie: item.numeroSerie,
                                                tipoMaquina: item.tipoMaquina
                                            }
                                        ])}
                                    >+</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </section>
        )
    }

    return {
        CardFilterMaquinaDisponivel,
        listMaquina
    }
}


