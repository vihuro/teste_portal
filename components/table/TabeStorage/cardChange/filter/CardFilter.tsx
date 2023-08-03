import { useState, useEffect } from "react";
import style from "./style.module.css";
import Api from "../../../../../service/api/matriz/estoque-grm";
import { MdLibraryAdd } from "react-icons/md";
import { CiMenuKebab } from "react-icons/ci";


interface itemProps {
    id: string,
    codigo: string,
    descricao: string,
    unidade: string,
    quantidade: number,
    localEstocagem: {
        guid: string,
        localEstocagem: string
    },
    tipoMaterial: {
        id: string,
        tipo: string
    },
}

export default function Card({
    toogle,
    changeToogle
}: {
    toogle: boolean,
    changeToogle: Function
}) {
    const [data, setData] = useState<itemProps[]>([]);

    useEffect(() => {
        FetchData();

    }, [])


    async function FetchData() {
        await Api.get("/without-substituto")
            .then(res => setData(res.data))
            .catch(err => console.log(err))

    }


    return (
        <div className={style.card} >
            <div className={style.title} >
                <span>
                    SUBSTITUTOS
                </span>

            </div>
            <div className={style.container_table} >
                <table>
                    <thead>
                        <tr>
                            <th>
                                <span>
                                    CÓDIGO
                                    <CiMenuKebab />
                                </span>
                            </th>
                            <th>DESCRIÇÃO</th>
                            <th>UND.</th>
                            <th>QTD.</th>
                            <th>TIPO</th>
                            <th>LOCAL</th>
                            <th>EDIT.</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && (
                            data.map((item, index) => (
                                <tr key={index} >
                                    <td>{item.codigo}</td>
                                    <td>{item.descricao}</td>
                                    <td>{item.unidade}</td>
                                    <td>{item.quantidade}</td>
                                    <td>{item.tipoMaterial.tipo}</td>
                                    <td>{item.localEstocagem.localEstocagem}</td>
                                    <td><MdLibraryAdd /></td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <div className={style.container_button} >
                <button onClick={() => changeToogle(false)}>
                    FECHAR
                </button>
            </div>
        </div>
    )

}