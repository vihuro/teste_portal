
import { FaRProject } from "react-icons/fa";
import Api from "../../../service/api/login/login";
import style from "./style.module.css";
import { useState, useEffect } from "react";
import { TbEdit } from "react-icons/tb";
import CardAdd from "./AddUser/CardAdd";
import CardEdit from "./EditUser/CardEdit";

interface dataUserProps {
    dataUsers: dataProps[],
    totalUsers: number
}
interface dataProps {
    apelido: string,
    ativo: boolean,
    claims: claimsUserProps[],
    dataHoraAlteracao: Date,
    dataHoraCadastro: Date,
    nome: string,
    usuarioId: string
}
interface claimsUserProps {
    id: string,
    claimId: string,
    claimValue: string,
    claimName: string
}


export default function Table() {
    const [data, setData] = useState<dataUserProps>();
    const [toogleCardAdd, setToogleCardAdd] = useState<boolean>(false);
    const [toogleEdit, setToogleEdit] = useState<boolean>(false);
    const [user, setUser] = useState<dataProps>({
        apelido: "",
        ativo: false,
        claims: [],
        dataHoraAlteracao: new Date(),
        dataHoraCadastro: new Date(),
        nome: "",
        usuarioId: ""

    });
    const [userId, setUserId] = useState<string>("");

    useEffect(() => {
        FetchData();
    }, []);

    async function FetchData() {
        await Api.get("/login")
            .then(res => setData(res.data))
            .catch(err => console.log(err))
    }
    const { Card: CardAddUser } = CardAdd();
    const { Card: CardEditUser } = CardEdit();
    return (
        <div className={style.container} >
            <div className={toogleCardAdd ?
                style.card_addUser :
                style.card_addUser_close} >
                <CardAddUser
                    changeToogle={setToogleCardAdd}
                    toogle={toogleCardAdd}
                    refreshTable={FetchData}
                />
            </div>
            <div className={toogleEdit ?
                style.card_editUser :
                style.card_editUser_close} >
                {data && (
                    <CardEditUser
                        changeToogle={setToogleEdit}
                        toogle={toogleEdit}
                        user={data.dataUsers.filter(item => item.usuarioId === userId)[0]}
                        fechDataUsers={FetchData}
                    />
                )}
            </div>
            <div className={style.containerButtonAdd} >
                <button onClick={() => setToogleCardAdd(true)} >
                    Adicionar Usuário
                </button>
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
                                            <TbEdit color="red" onClick={() => {
                                                setUserId(item.usuarioId)
                                                setUser(item)
                                                setToogleEdit(true)
                                            }} />
                                        </td>
                                    </tr>
                                ))
                            )}

                        </tbody>
                    </table>
                </section>

            </section>
        </div >
    )

}