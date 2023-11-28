"use client"
import { Actions, Menu } from "../components/menuBar/MenuBar";
import Body from "../components/table/Body";
import { GetServerSideProps } from "next";

import { validateToken } from "../components/privatePage/PrivatePage";


// export const getServerSideProps: GetServerSideProps = async (context) => {
//     const acessToken = parseCookies(context).ACCESS_TOKEN;
//     const refreshToken = parseCookies(context).REFRESH_TOKEN;

//     // valida se existe o token e o refresh token

//     if (acessToken === undefined || refreshToken === undefined) {
//         return {
//             redirect: {
//                 destination: "login",
//                 permanent: false
//             }
//         }
//     }
//     setCookie(context, "REFRESH_TOKEN", refreshToken, {
//         httpOnly: true,
//         maxAge: 60 * 60 * 2,
//         path: "/"
//     })


//     const data = await axios.get("http://localhost:8080/api/token/validate-token", {
//         headers: {
//             Authorization: `Bearer ${acessToken}`
//         }
//     }).then(res => { return res })
//         .catch(err => { return err })


//     if (data.response &&
//         (data.response.status === 401)) {

//         const user = TokenDrecriptor(acessToken);


//         const newToken = await axios.post(`http://localhost:8080/api/token/refresh-token/${user.idUser}`, {}, {
//             headers: {
//                 Authorization: `Bearer ${refreshToken}`
//             }
//         }
//         )
//             .then(res => { return res })
//             .catch(err => { return err })


//         if (newToken.status === 200) {

//             setCookie(context, "ACCESS_TOKEN", newToken.data.accessToken, {
//                 maxAge: 60 * 60 * 1,
//                 path: "/",
//             })
//             setCookie(context, "REFRESH_TOKEN", newToken.data.refreshToken, {
//                 maxAge: 60 * 60 * 2,
//                 path: "/",
//                 httpOnly: true
//             })

//         } else {
//             destroyCookie(context, "REFRESH_TOKEN");
//             destroyCookie(context, "ACCESS_TOKEN");
//             return {
//                 redirect: {
//                     destination: "login",
//                     permanent: false
//                 }
//             }
//         }
//     }


//     return {
//         props: {}
//     }

// }

export default function Home() {



    return (

        <section >
            <Menu />
            <Body changeToogleAlterarSenha={Actions().setToogleValue} toogleCardAlterarSenha={Actions().toogleValue ?? false}>
                <>
                </>
            </Body>
        </section>
    )

}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const info = await validateToken(context);


    if (!info) {
        return {
            props: {}
        }
    }

    return {
        props: {},
        redirect: {
            destination: info.redirect.destination,
            permanent: info.redirect.permanent,
        }
    }
}


