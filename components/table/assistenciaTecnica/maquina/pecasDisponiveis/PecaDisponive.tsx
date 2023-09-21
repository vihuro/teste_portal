import { useState } from "react";
import style from "./style.module.css";
import Api from "../../../../../service/api/assistenciaTecnica/Assistencia";
import { Icons } from "../../../../utils/IconDefault";


interface props {
    changeToogle: Function,

}
interface dataProps {
    id: string,
    codigoRadar: string,
    descricao: string,
    preco: number,
    enderecoImagem: string;
    alteracao: userProps,
    cadastro: userProps
}

interface userProps {
    idUsuario: string,
    apelido: string,
    nome: string,
    dataHora: Date
}
interface pecasProps {
    id: string,
    codigoRadar: string,
    descricao: string
}
export default function Card({ changeToogle }: props) {

    const [data, setData] = useState<dataProps[]>([]);
    const [listPecas, setListPecas] = useState<pecasProps[]>([]);

    async function FetchData() {
        await Api.get("/assistencia-tecnica/pecas")
            .then(res => setData(res.data))
            .catch(err => console.log(err))

    }
    const filtered = data.filter(item => (
        !listPecas.some(pecaId => item.id === pecaId.id)
    ))
    function CardPecas() {
        return (
            <div className={style.card}>
                <section className={style.container_table} >
                    <table className={style.table} >
                        <thead>
                            <tr>
                                <th>
                                    CÓDIGO
                                </th>
                                <th>
                                    DESCRIÇÃO
                                </th>
                                <th>
                                    IMG
                                </th>
                                <th>
                                    ADD.
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && (
                                filtered.map((item, index) => (
                                    <tr key={index}>
                                        <td>
                                            {item.codigoRadar}
                                        </td>
                                        <td>
                                            {item.descricao}
                                        </td>
                                        <td></td>
                                        <td onClick={() =>
                                            setListPecas([
                                                ...listPecas,
                                                {
                                                    codigoRadar: item.codigoRadar,
                                                    descricao: item.descricao,
                                                    id: item.id
                                                }
                                            ])
                                        } >
                                            <Icons.Add />
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </section>
                <footer className={style.container_button} >
                    <button type="button" onClick={() => changeToogle(false)} >
                        FECHAR
                    </button>

                </footer>
            </div>
        )
    }
    return {
        CardPecas,
        FetchData,
        listPecas,
        setListPecas
    }

}