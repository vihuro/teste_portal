import style from "./style.module.css";
import { BiFilterAlt } from "react-icons/bi";
import Loading from "../../../loading/Loading";
import { useEffect, useState } from "react";
import CardFilter from "./FilterClaims/Filter";
import { TbTrash } from "react-icons/tb";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md"
import Message from "../../../message/Message";
import Api from "../../../../service/api/login/login";
import InputUi from "../../../UI/input/Input";
import ButtonUi from "../../../UI/button/Button";


interface claimsProps {
    claimId: string,
    claimName: string,
    claimValue: string
}

interface userProps {
    apelido: string,
    nome: string,
    senha: string,
    confirmacaoSenha: string,
    claims: claimsProps[]
}


function Table({ listClaims, changeListClaims }:
    {
        listClaims: claimsProps[],
        changeListClaims: Function
    }) {
    const [thisList, setThisList] = useState<claimsProps[]>([]);
    useEffect(() => {
        setThisList(listClaims)
    }, [listClaims])

    function removeItem(id: string) {
        const newList = thisList.filter(item =>
            item.claimId !== id);

        changeListClaims(newList);
    }

    return (
        <table className={style.table} >
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Value</th>
                    <th>DEL.</th>
                </tr>
            </thead>
            <tbody>
                {thisList && thisList.length > 0 && (
                    thisList.map(item => (
                        <tr key={item.claimId} >
                            <td>{item.claimName}</td>
                            <td>{item.claimValue}</td>
                            <td onClick={() => removeItem(item.claimId)} ><TbTrash /> </td>

                        </tr>
                    ))


                )}
            </tbody>
        </table>
    )
}
const { Filter } = CardFilter();


function Card({ toogle, changeToogle, refreshTable }: { toogle: boolean, changeToogle: Function, refreshTable: Function }) {
    const [toogleLoading, setToogleLoading] = useState<boolean>(false);
    const [toogleFilterClaims, setToogleFilterClaims] = useState<boolean>(false);
    const [toogleMessage, setToogleMessage] = useState<boolean>(false);
    const [visiblePassword, setVissiblePassword] = useState<boolean>(false);
    const [visibleConfirmPassword, setVissibleConfirmPassword] = useState<boolean>(false);
    const [message, setMessage] = useState({
        message: "",
        type: "WARNING"
    });
    const [dataClaims, setDataClaims] = useState<claimsProps[]>([]);
    const [listClaims, setListClaims] = useState<claimsProps[]>([]);

    const [userData, setUserData] = useState<userProps>({
        apelido: "",
        claims: [],
        confirmacaoSenha: "",
        nome: "",
        senha: ""
    });

    async function Validar() {
        if (userData.apelido === "" ||
            userData.nome === "" ||
            userData.confirmacaoSenha === "" ||
            userData.senha === "") {
            setMessage({
                message: "Campo(s) obrigatório(s) vazio(s)!",
                type: "WARNING"
            })
            setToogleMessage(true)
            return;
        }
        if (userData.confirmacaoSenha !== userData.senha) {
            setMessage({
                message: "Senha não correspondente!",
                type: "WARNING"
            })
            setToogleMessage(true)
            return;
        }
        Cadastrar();

    }
    async function Cadastrar() {
        setToogleLoading(true);
        const user = {
            apelido: userData.apelido,
            nome: userData.nome,
            senha: userData.senha,
            claims: listClaims.map(item => {
                return {
                    claimId: item.claimId
                }
            })
        }
        await Api.post("/login/created", user)
            .then(res => setMessage({
                message: "Usuário cadastrado com sucesso!",
                type: "SUCESS"
            }))
            .catch(err => console.log(err))
            .finally(() => {
                setToogleLoading(false);
                setToogleMessage(true);
                refreshTable()
                ClearAll()
            })
    }
    function ClearAll() {
        setUserData({
            apelido: "",
            claims: [],
            confirmacaoSenha: "",
            nome: "",
            senha: ""
        })
        setListClaims([]);
    }
    const { Input } = InputUi();
    const { Button } = ButtonUi();



    return (
        <div className={style.card} >
            <div className={toogleLoading ?
                style.cardLoading :
                style.cardLoading_close} >
                <Loading />
            </div>
            <div className={toogleMessage ?
                style.cardMessage :
                style.cardMessage_close} >
                <Message
                    stateMessage={toogleMessage}
                    action={setToogleMessage}
                    message={message.message}
                    type={message.type}
                />
            </div>
            <div className={toogleFilterClaims ?
                style.filterClaims :
                style.filterClaims_close} >
                <Filter
                    changeToogle={setToogleFilterClaims}
                    toogle={toogleFilterClaims}
                    changeListClaims={setListClaims}
                    listClaimsInCardAdd={listClaims}
                />
            </div>
            <section className={style.title} >
                <h2>Novo usuário</h2>
            </section>
            <section className={style.body} >
                <div className={style.wrap_container_nome} >
                    <Input
                        autoComplete="off"
                        text="Nome"
                        id="txtNome"
                        value={userData?.nome}
                        onChange={e =>
                            setUserData({
                                ...userData,
                                nome: e.target.value
                            })
                        }
                    />
                </div>
                <div className={style.wrap_container_apelido} >
                    <Input required
                        autoComplete="off"
                        text="Apelido"
                        id="txtApelido"
                        value={userData.apelido}
                        onChange={e =>
                            setUserData({
                                ...userData,
                                apelido: e.target.value
                            })
                        }
                    />
                </div>
                <div className={style.wrap_container_senha} >
                    <Input required
                        autoComplete="off"
                        id="txtSenha"
                        type={!visiblePassword ? "password" : "text"}
                        text="Senha"
                        value={userData.senha}
                        onChange={e =>
                            setUserData({
                                ...userData,
                                senha: e.target.value
                            })
                        }
                    />

                    {!visiblePassword ?
                        <MdOutlineVisibilityOff onClick={() =>
                            setVissiblePassword(!visiblePassword)} /> :
                        <MdOutlineVisibility onClick={() =>
                            setVissiblePassword(!visiblePassword)} />}
                </div>
                <div className={style.wrap_container_confirmacao_senha} >
                    <Input required
                        autoComplete="off"
                        text="Confirmação"
                        type={!visibleConfirmPassword ? "password" : "text"}
                        id="txtConfirmacaoSenha"
                        value={userData.confirmacaoSenha}
                        onChange={e =>
                            setUserData({
                                ...userData,
                                confirmacaoSenha: e.target.value
                            })
                        }
                    />
                    {!visibleConfirmPassword ?
                        <MdOutlineVisibilityOff onClick={() =>
                            setVissibleConfirmPassword(!visibleConfirmPassword)} /> :
                        <MdOutlineVisibility onClick={() =>
                            setVissibleConfirmPassword(!visibleConfirmPassword)} />}
                </div>
                <div className={style.container_table_claims} >
                    <div className={style.wrap_container_claims} >
                        <Table
                            listClaims={listClaims}
                            changeListClaims={setListClaims}
                        />
                    </div>
                </div>
                <div className={style.container_button_filter} >
                    <button onClick={() => setToogleFilterClaims(true)} >
                        <BiFilterAlt />
                    </button>
                </div>

            </section>
            <section className={style.footer} >
                <div>
                    <Button
                        classUi="glass"
                        color="green"
                        text="Cadastrar"
                        onClick={() => Validar()} />

                </div>
                <div>
                    <Button
                        classUi="glass"
                        color="red"
                        text="Cancelar"
                        onClick={() => changeToogle(!toogle)}
                    />

                </div>
            </section>

        </div>
    )

}

export default function CardAdd() {
    return {
        Card
    }
}

