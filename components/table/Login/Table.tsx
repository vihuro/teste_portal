
import { FaRProject } from "react-icons/fa";
import Api from "../../../service/api/login/login";
import style from "./style.module.css";
import { useState, useEffect } from "react";
import { TbEdit } from "react-icons/tb";
import CardAdd from "./AddUser/CardAdd";

interface dataUserProps {
    dataUsers: dataProps[],
    totalUsers: number
}
interface dataProps {
    apelido: string,
    ativo: boolean,
    claims: [],
    dataHoraAlteracao: Date,
    dataHoraCadastro: Date,
    nome: string,
    usuarioId: string
}

export default function Table() {
    const [data, setData] = useState<dataUserProps>();

    useEffect(() => {
        FetchData();
    }, []);

    async function FetchData() {
        Api.get("")
            .then(res => setData(res.data))
            .catch(err => console.log(err))
    }
    const { Card } = CardAdd();
    return (
        <div className={style.container} >
            <div className={style.card_addUser} >
                <Card />
            </div>
            <section className={style.wrap_container_table} >
                <section className={style.container_table} >
                    <table className={style.table} >
                        <thead>
                            <tr>
                                <th>APELIDO</th>
                                <th>NOME</th>
                                <th>STATUS</th>
                                <th>CLAIMS</th>
                                <th>EDIT.</th>
                            </tr>
                        </thead>
                        <tbody className={style.table_body} >
                            {data && data.dataUsers && (
                                data.dataUsers.map((item, index) => (
                                    <tr key={item.usuarioId} >
                                        <td>{item.apelido}</td>
                                        <td>{item.nome}</td>
                                        <td>
                                            <p>
                                                {item.ativo ? "ATIVO" : "INATIVO"}
                                            </p>

                                        </td>
                                        <td>
                                            <p>
                                                {item.claims.length}
                                            </p>
                                        </td>
                                        <td  >
                                            <TbEdit color="red" />
                                        </td>
                                    </tr>
                                ))
                            )}

                        </tbody>
                    </table>
                </section>

            </section>

        </div>
    )

}