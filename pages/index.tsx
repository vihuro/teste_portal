import { parseCookies } from "nookies";
import MenuBar from "../components/menuBar/MenuBar";
import Body from "../components/table/Body";

import Table from "../components/table/TabeStorage/Table";
import { GetServerSideProps } from "next";
import axios from "axios";
import { useEffect } from "react";
import { useRouter } from "next/router";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const acessToken = parseCookies(context).ACESS_TOKEN;
    const refreshToken = parseCookies(context).REFRESH_TOKEN;

    if (acessToken === undefined || refreshToken === undefined) {
        return {
            redirect: {
                destination: "login",
                permanent: false
            }
        }
    }
    const data = await axios.get("http://localhost:8080/api/token/validate-token", {
        headers: {
            Authorization: `Bearer ${acessToken}`
        }
    }).then(res => { return res })
        .catch(err => { return err })

    if (data.response &&
        (data.response.status === 401 ||
            data.response.status === 403)
    )
        return {
            redirect: {
                destination: "login",
                permanent: false
            }
        }


    return {
        props: {}
    }

}

export default function Home() {


    return (

        <section>
            <MenuBar />
            <Body>
                <Table />
            </Body>
        </section>
    )

}

