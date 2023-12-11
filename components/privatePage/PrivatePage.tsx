import { useEffect } from "react";
import { GetServerSidePropsContext } from "next";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import TokenDrecriptor from "../../service/DecriptorToken";
import Api from "../../service/api/login/login";

export async function validateToken(context: GetServerSidePropsContext) {

    const accessToken = parseCookies(context).ACCESS_TOKEN;
    const refreshToken = parseCookies(context).REFRESH_TOKEN;

    if (!accessToken || !refreshToken) {
        setCookie(context, "PAGINA_PORTAL_THR",
            encodeURIComponent(context.resolvedUrl), {
            path: "/"
        })

        context.res.writeHead(302, {
            location: "/login"
        });

        context.res.end();
        return null;
    }

    const data = await Api.get("/validate-token", {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
        .then(res => {
            return res
        })
        .catch(err => { return err })

    if (data.response && (
        data.response.status && (
            data.response.status === 404
        )
    )) {
        return {
            redirect: {
                destination: "/login",
                permanent: false
            }
        }
    }

    if (data.response && (data.response.status === 401)) {

        const user = TokenDrecriptor(accessToken);

        const newToken = await Api.post(`/refresh-token/${user.idUser}`, {}, {
            headers: {
                Authorization: `Bearer ${refreshToken}`
            }
        })
            .then(res => { return res })
            .catch(err => { return err })
        if (newToken.status === 200) {

            setCookie(context, "ACCESS_TOKEN", newToken.data.accessToken, {
                maxAge: 60 * 60 * 2,
                path: "/",
            })
            setCookie(context, "REFRESH_TOKEN", newToken.data.refreshToken, {
                maxAge: 60 * 60 * 3,
                path: "/",
                httpOnly: true
            })
        } else {



            destroyCookie(context, "ACCESS_TOKEN");
            destroyCookie(context, "REFRESH_TOKEN");
            setCookie(context, "PAGINA_PORTAL_THR",
                encodeURIComponent(context.resolvedUrl), {
                path: "/"
            })

            return {
                redirect: {
                    destination: "/login",
                    permanent: false
                }
            }
        }
    }
}