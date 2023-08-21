import style from "./style.module.css";
import InputUi from "../../../../UI/input/Input";
import ButtonUi from "../../../../UI/button/Button";
import { useState } from "react";
import Loading from "../../../../loading/Loading";
import Message from "../../../../message/Message";
import Api from "../../../../../service/api/matriz/estoque-grm";
import TokenDrecriptor from "../../../../../service/DecriptorToken";
import { parseCookies } from "nookies";

interface props {
    refreshTable: Function,
    changeToogle: Function
}

export default function CardNovo({ refreshTable, changeToogle }: props) {
    const { Input } = InputUi();
    const { Button } = ButtonUi();
    const [novoTipo, setNovoTipo] = useState<string>("");
    const [toogleMessage, setToogleMessage] = useState<boolean>(false);
    const [toogleLoading, setToogleLoading] = useState<boolean>(false);
    const [dataMessage, setDataMessage] = useState({
        message: "",
        type: "WARNING"
    });
    const infoToken = TokenDrecriptor(parseCookies().ACCESS_TOKEN);
    
    async function Adicionar() {
        if (novoTipo === "") {
            setDataMessage({
                message: "Campo obrigatório vazio!",
                type: "WARNING"
            })
            return;
        }
        const data = {
            tipo: novoTipo,
            usuarioId:infoToken.idUser
        }
        setToogleLoading(true)
        await Api.post("/tipo-material", data)
            .then(res => setDataMessage({
                message: "Tipo adicionado com sucesso!",
                type: "SUCESS"
            }))
            .catch(err => console.log(err))
            .finally(() => {
                setToogleLoading(false);
                setToogleMessage(true);
                refreshTable();
                setNovoTipo("");
            })
    }
    return (
        <form className={style.card}>
            <div className={toogleLoading ?
                style.containerLoading :
                style.containerLoading_close} >
                <Loading />
            </div>
            <div className={toogleMessage ?
                style.containerMessage :
                style.containerMessage_close} >
                <Message
                    stateMessage={toogleMessage}
                    action={setToogleMessage}
                    message={dataMessage.message}
                    type={dataMessage.type}
                />
            </div>
            <header className={style.title} >
                <h3>
                    Adicionar novo Tipo
                </h3>
            </header>
            <main className={style.body} >
                <Input
                    id="txtNovoTipo"
                    text="Novo Tipo"
                    autoComplete="off"
                    value={novoTipo}
                    onChange={(e) => setNovoTipo(e.target.value)}
                />

            </main>
            <footer className={style.footer} >
                <Button
                    classUi="glass"
                    color="green"
                    text="Adicionar"
                    type="button"
                    onClick={() => Adicionar()}
                />
                <Button
                    classUi="glass"
                    color="red"
                    text="Fechar"
                    type="button"
                    onClick={() => changeToogle(false)}
                />
            </footer>
        </form>
    )
}