import { useState } from "react";
import ButtonUi from "../../../../UI/button/Button";
import InputUi from "../../../../UI/input/Input";
import { parseCookies } from "nookies";
import TokenDrecriptor from "../../../../../service/DecriptorToken";
import style from "./style.module.css";
import Loading from "../../../../loading/Loading";
import Message from "../../../../message/Message";
import Api from "../../../../../service/api/matriz/estoque-grm";

interface props {
    refreshTable: Function,
    changeToogle: Function
}

export default function Card({ changeToogle, refreshTable }: props) {
    const { Input } = InputUi();
    const { Button } = ButtonUi();
    const [novoLocal, setNovoLocal] = useState<string>("");
    const [toogleMessage, setToogleMessage] = useState<boolean>(false);
    const [toogleLoading, setToogleLoading] = useState<boolean>(false);
    const [dataMessage, setDataMessage] = useState({
        message: "",
        type: "WARNING"
    });
    const infoToken = TokenDrecriptor(parseCookies().ACCESS_TOKEN);

    async function Adicionar() {
        if (novoLocal === "") {
            setDataMessage({
                message: "Campo obrigatório vazio!",
                type: "WARNING"
            })
            setToogleMessage(true);
            return;
        }
        const novoLocalData = {
            local: novoLocal,
            usuarioId: infoToken.idUser
        }
        await Api.post("/local", novoLocalData)
            .then(res => setDataMessage({
                message: "Local adicionado com sucesso!",
                type: "SUCESS"
            }))
            .catch(err => {
                setDataMessage({
                    message: "Erro no servidor!",
                    type: "ERROR"
                })
            })
            .finally(() => {
                setToogleLoading(false);
                setToogleMessage(true);
                refreshTable()
                setNovoLocal("");
            })
    }

    return (
        <form className={style.card} >
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
                    Adicionar novo Local
                </h3>
            </header>
            <main className={style.body} >
                <Input
                    id="txtNovoLocal"
                    text="Local"
                    autoComplete="off"
                    value={novoLocal}
                    onChange={(e) => setNovoLocal(e.target.value)}
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
                    text="Remover"
                    type="button"
                    onClick={() => changeToogle(false)}
                />
            </footer>

        </form>
    )
}