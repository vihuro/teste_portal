import { useEffect, useState } from "react";
import styles from "./style.module.css";
import Api from "../../../../../../service/api/assistenciaTecnica/Assistencia";
import { IMachineProps } from "../../IMaquina";


interface Props {
    toogle: boolean,
}
function InfoData() {
    const [data, setData] = useState<IMachineProps>();

    return {
        data,
        setData
    }
}

function Form({ toogle }: Props) {

    const { data: dataExterno, setData: setDataExterno } = InfoData()


    useEffect(() => {
        if (toogle)
            FetchData()
    }, [toogle])

    async function FetchData() {
        await Api.get("/relatorio-radar/maquinas")
            .then(res => { setDataExterno(res.data) })
            .catch(err => console.log(err))


    }


    return (
        <div>

        </div>
    )
}



export { Form, InfoData }