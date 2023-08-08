
import { GetServerSideProps } from "next";
import Api from "../../service/api/login/login";
import style from "./style.module.css";
import { useState, useEffect } from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import { useRouter } from "next/router";

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



    async function Logar() {
        if (data.apelido === "" || data.senha === "") {
            console.log("campos obrigatorios")
            return;
        }
        await Api.post("", data)
            .then(res => {
                setCookie(null, "REFRESH_TOKEN", res.data.refreshToken, {
                    path: "/",
                    maxAge: 60 * 60 * 1
                })
                setCookie(null, "ACCESS_TOKEN", res.data.accessToken, {
                    path: "/",
                    maxAge: 60 * 60 * 1
                })
                navigation.push("/")

            })
            .catch(err => console.log(err))
    }


    return (
        <div className={style.container_body} >
            <div className={style.wrap_container_body} >
                <div className={style.card} >
                    <img style={{ width: "100%" }} src="../logoMarcaSemFundo.png" />
                </div>
                <div className={style.card} >
                    <div className={style.container_title} >
                        <h3>
                            LOGIN
                        </h3>
                    </div>
                    <div className={style.containerInput} >
                        <div>
                            <input
                                type="text"
                                required
                                value={data.apelido ?? ""}
                                onChange={e => setData({
                                    ...data,
                                    apelido: e.target.value
                                })}
                            />
                            <span>USUÁRIO</span>
                        </div>
                        <div>
                            <input
                                type="password"
                                required
                                value={data.senha ?? ""}
                                onChange={e => setData({
                                    ...data,
                                    senha: e.target.value
                                })}
                            />
                            <span>SENHA</span>
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