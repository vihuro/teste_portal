import axios from "axios";
import TokenDrecriptor from "../../../../service/DecriptorToken";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { GetServerSideProps } from "next";
import MenuBar from "../../../../components/menuBar/MenuBar";
import Body from "../../../../components/table/Body";
import Table from "../../../../components/table/TabeStorage/Table";
import Api from "../../../../service/api/login/login";

export default function Estoque() {
    const { Page, setToogleValue, toogleValue } = MenuBar();
    return (
        <section >
            <Page />
            <Body changeToogleAlterarSenha={setToogleValue} toogleCardAlterarSenha={toogleValue ?? false}>
                <Table />
            </Body>
        </section>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const acessToken = parseCookies(context).ACCESS_TOKEN;
    const refreshToken = parseCookies(context).REFRESH_TOKEN;

    // valida se existe o token e o refresh token

    if (acessToken === undefined || refreshToken === undefined) {
        return {
            redirect: {
                destination: "/login",
                permanent: false
            }
        }
    }
    setCookie(context, "REFRESH_TOKEN", refreshToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 1,
        path: "/"
    })


    const data = await Api.get("/validate-token", {
        headers: {
            Authorization: `Bearer ${acessToken}`
        }
    })
        .then(res => { return res })
        .catch(err => { return err })
        console.log("validou o token")

    if (data.response && data.response.status === 404) {
        return {
            redirect: {
                permanent: false,
                destination: "/login"
            }
        }
    }
    if (data.response &&
        (data.response.status === 401)) {
        const user = TokenDrecriptor(acessToken);

        const newToken = await Api.post(`/refresh-token/${user.idUser}`, {},{
            headers:{
                Authorization:`Bearer ${refreshToken}`
            }
        })
        .then(res => { return res })
        .catch(err => { return err })
        
        if (newToken.status === 200) {

            setCookie(context, "ACCESS_TOKEN", newToken.data.accessToken, {
                maxAge: 60 * 60 * 1,
                path: "/",
            })
            setCookie(context, "REFRESH_TOKEN", newToken.data.refreshToken, {
                maxAge: 60 * 60 * 1,
                path: "/",
                httpOnly: true
            })

        } else {
            destroyCookie(context, "REFRESH_TOKEN");
            destroyCookie(context, "ACCESS_TOKEN");
            return {
                redirect: {
                    destination: "/login",
                    permanent: false
                }
            }
        }
    }


    return {
        props: {}
    }

}