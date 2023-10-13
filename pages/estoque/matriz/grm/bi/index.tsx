import { GetServerSideProps } from "next";
import { validateToken } from "../../../../../components/privatePage/PrivatePage";

import Table from "../../../../../components/table/tabeStorageMatrizGrm/bi/Table";

export default function Bi(){

    return(
        <section>
            <Table />
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
