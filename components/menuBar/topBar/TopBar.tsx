"use client"
import TokenDrecriptor from "../../../service/DecriptorToken";
import style from "./style.module.css";
import { destroyCookie, parseCookies } from "nookies";
import { BiUser } from "react-icons/bi";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import InputUi from "../../UI/input/Input";
import { MdOutlineVisibilityOff, MdOutlineVisibility } from "react-icons/md";
import ButtonUi from "../../UI/button/Button";
import Loading from "../../loading/Loading";
import Message from "../../message/Message";
import Api from "../../../service/api/login/login";



interface tokenProps {
    Nome: string,
    active: boolean,
    idUser: string,
    unique_name: string
}

export default function TopBarSide() {
    const [valueToken, setValueToken] = useState<tokenProps>();
    const [toogleValue, setToogleValue] = useState<boolean>(false);
    const [toogleCardAlterarSenha, setToogleCardAlterarSenha] = useState<boolean>(false);
    const { Input } = InputUi();
    const { Button } = ButtonUi();


    useEffect(() => {
        const token = parseCookies().ACCESS_TOKEN;
        setValueToken(TokenDrecriptor(token));
    }, [])

    const navigation = useRouter();

    function CardChangePassword({ changeToogle }: { changeToogle: Function }) {
        const [toogleVisiblePassword, setToogleVisiblePassword] = useState<boolean>(false);
        const [toogleLoading, setToogleLoading] = useState<boolean>(false);
        const [toogleMessage, setToogleMessage] = useState<boolean>(false);
        const [password, setPassword] = useState<string>("");
        const [dataMessage, setDataMessage] = useState({
            message: "",
            type: "WARNING"
        })
        async function newPassword() {
            if (password === "") {
                setDataMessage({
                    message: "Você precisa digitar uma nova senha!",
                    type: "WARNING"
                })
                setToogleMessage(true);

                return;
            }
            const user = {
                userId: valueToken?.idUser,
                senha: password,
                usuarioAlteracaoId: valueToken?.idUser
            }
            setToogleLoading(true)
            await Api.put("/login/changePassword",user)
                .then(res => {
                    setDataMessage({
                        message:"Senha alterada com sucesso!",
                        type:"SUCESS"
                    })
                })
                .catch(err => {
                    setDataMessage({
                        message:"Erro no servior!",
                        type:"ERROR"
                    })
                })
                .finally(() => {
                    setToogleLoading(false);
                    setToogleMessage(true);
                    setPassword("");

                });

        }
        return (
            <section className={style.CardChangePassword} >
                <div className={toogleLoading ?
                    style.container_loading :
                    style.container_loading_close} >
                    <Loading />

                </div>
                <div className={toogleMessage ?
                    style.container_message :
                    style.container_message_close} >
                    <Message
                        stateMessage={toogleMessage}
                        action={setToogleMessage}
                        message={dataMessage.message}
                        type={dataMessage.type}
                    />
                </div>
                <header className={style.title} >
                    <h3>
                        Alterar senha
                    </h3>
                </header>
                <main className={style.container_body} >
                    <Input
                        id="txtAlterarSenha"
                        text="Nova Senha"
                        type={toogleVisiblePassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {toogleVisiblePassword ?
                        <MdOutlineVisibility onClick={() => setToogleVisiblePassword(!toogleVisiblePassword)} /> :
                        <MdOutlineVisibilityOff onClick={() => setToogleVisiblePassword(!toogleVisiblePassword)} />}

                </main>
                <footer className={style.container_footer} >
                    <div>
                        <Button
                            classUi="glass"
                            color="green"
                            text="Alterar"
                            onClick={() => newPassword()}
                        />

                    </div>
                    <div>
                        <Button
                            classUi="glass"
                            color="red"
                            text="Fechar"
                            onClick={() => changeToogle(false)}
                        />

                    </div>

                </footer>

            </section>
        )
    }

    function TopBar() {
        const [toogleValue, setToogleValue] = useState<boolean>(false);
        const [toogleCardAlterarSenha, setToogleCardAlterarSenha] = useState<boolean>(false);

        return (
            <div className={style.header} >
                <div className={toogleCardAlterarSenha ? style.cardPassword : style.cardPassword_close} >
                    < CardChangePassword changeToogle={setToogleCardAlterarSenha} />
                </div>
                <div className={style.iconUser} onClick={e => { setToogleValue(!toogleValue) }} >
                    <div className={toogleValue ? style.card : style.card_close}
                    >
                        <ul  >
                            <li onClickCapture={e => setToogleCardAlterarSenha(true)} >Alterar senha</li>
                            <li onClickCapture={e => {
                                destroyCookie(null, "ACCESS_TOKEN", {
                                    path: "/"
                                })
                                navigation.push("/login")

                            }}>
                                Sair

                            </li>
                        </ul>
                    </div>
                    <div><BiUser /></div>
                    {valueToken && (
                        valueToken.Nome && (
                            <div>
                                <label >{valueToken.Nome}</label>
                            </div>
                        )

                    )}

                </div>
            </div>
        )

    }

    return {
        TopBar,
        toogleValue,
        setToogleValue
    }

}

