
import { GetServerSideProps } from "next";
import Api from "../../service/api/login/login";
import style from "./style.module.css";
import { useState, useEffect } from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import { useRouter } from "next/router";
import Loading from "../../components/loading/Loading";
import Message from "../../components/message/Message";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const acessToken = parseCookies(context).ACCESS_TOKEN;
    const refreshToken = parseCookies(context).REFRESH_TOKEN;

    if (refreshToken) {
        destroyCookie(context, "REFRESH_TOKEN", {
            path: "/"
        })

    }

    return {
        props: {}
    }
}

export default function Login() {

    const [data, setData] = useState({
        "apelido": "",
        "senha": ""
    })

    const [token, setToken] = useState({
        refreshToken: "",
        acessToken: ""
    })
    const navigation = useRouter();
    const [toogleLoading, setToogleLoading] = useState<boolean>(false);
    const [toogleMessage, setToogleMessage] = useState<boolean>(false);
    const [dataMessge, setDataMessage] = useState({
        message: "",
        type: "WARNING"
    })



    async function Logar() {
        setToogleLoading(true);
        if (data.apelido === "" || data.senha === "") {
            setDataMessage({
                message:"Campos obrigatórios vazios!",
                type:"WARNING"
            })
            setToogleLoading(false);
            setToogleMessage(true)

            return;
        }

        await Api.post("/login", data)
            .then(res => {
                setCookie(null, "REFRESH_TOKEN", res.data.refreshToken, {
                    path: "/",
                    maxAge: 60 * 60 * 1
                })
                setCookie(null, "ACCESS_TOKEN", res.data.accessToken, {
                    path: "/",
                    maxAge: 60 * 60 * 1
                })
                const url = parseCookies().PAGINA_PORTAL_THR;
                
                if(typeof url === "undefined"){
                    navigation.push("/");
                }else{
                    destroyCookie(null, "PAGINA_PORTAL_THR")
                    navigation.push(decodeURIComponent(url))
                }
                navigation.push("/")

            })
            .catch(err => {
                if (err.response && (err.response.data)) {
                    setDataMessage({
                        message: err.response.data,
                        type: "ERROR"
                    })
                    setToogleMessage(true)
                }else{
                    setDataMessage({
                        message: "erro no servidor",
                        type: "ERROR"
                    })
                    setToogleMessage(true)
                }

            })
            .finally(() => {
                setToogleLoading(false);
            })
    }


    return (
        <div className={style.container_body} >
            <div className={style.wrap_container_body} >
                <div className={style.card} >
                    <img style={{ width: "100%" }} src="../logoMarcaSemFundo.png" />
                </div>
                <div className={style.card} >
                    <div className={toogleMessage ?
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
                            message={dataMessge.message}
                            type={dataMessge.type}
                        />
                    </div>
                    <div className={style.container_title} >
                        <h3>
                            LOGIN
                        </h3>
                    </div>
                    <div className={style.containerInput} >
                        <div>
                            <input
                                id="txtUsuario"
                                type="text"
                                required
                                autoComplete="off"
                                value={data.apelido ?? ""}
                                onChange={e => setData({
                                    ...data,
                                    apelido: e.target.value
                                })}
                            />
                            <label htmlFor="txtUsuario" >USUÁRIO</label>
                        </div>
                        <div>
                            <input
                                id="txtSenha"
                                type="password"
                                required
                                value={data.senha ?? ""}
                                onChange={e => setData({
                                    ...data,
                                    senha: e.target.value
                                })}
                            />
                            <label htmlFor="txtSenha" >SENHA</label>
                        </div>
                    </div>
                    <div className={style.container_button} >
                        <button onClick={() => Logar()} >
                            ENTRAR
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}