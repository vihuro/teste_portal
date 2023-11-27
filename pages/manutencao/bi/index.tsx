import styles from "./style.module.css";
import { Manutencao } from "../../../components/table/manutencao/fakeManutencao";
import { useEffect, useState } from "react";
import Api from "../../../service/api/manutencao/Manutencao";
import Table from "../../../components/table/manutencao/Bi/Bi";

interface StyleData {
    background: string;
    color: string;
    fontWeight?: string
}


// Interface para representar o objeto de status
interface StyleKey {
    [key: string]: StyleData;
}


export default function Bi() {

    useEffect(() => {
        FetchData()
    }, [])
    async function FetchData() {
        Api.get("/order-service")
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
    }

    const [data, setData] = useState(Manutencao);

    function searchColorPrioridade(text: string) {
        const colors = PRIORIDADE[text]

        return {
            background: colors ? colors.background : "",
            color: colors ? colors.color : ""
        }
    }
    function searchColorStatus(text: string) {
        const colors = STATUS[text];


        return {
            background: colors ? colors.background : "",
            color: colors ? colors.color : "",
            fontWeight: colors ? colors.fontWeight : ""
        };
    }

    const PRIORIDADE: StyleKey = {
        "ALTA": {
            background: "#ff0000",
            color: "#7d0404"
        },
        "BAIXA": {
            background: "#00ff50",
            color: "#046d25"
        },
        "NORMAL": {
            background: "#0035ff",
            color: "#ffffff87"
        }
    }
    const STATUS: StyleKey = {
        "AGUARDANDO VERIFICAÇÃO": {
            background: "#feff00",
            color: "#747512",
            fontWeight: "700"
        },
        "AGURDANDO MANUTENÇÃO": {
            background: "#ffa200",
            color: "#6b4708",
            fontWeight: "700"
        },
        "AGUARDANDO PEÇAS": {
            background: "#4d00ff",
            color: "#f9f9f9a1",
            fontWeight: "700"
        },
        "AGUARDANDO COMPRA DE PEÇAS": {
            background: "#4d00ff",
            color: "#fbfafb9e",
            fontWeight: "700"
        },
        "AGUARDANDO CHEGADA DE PEÇAS": {
            background: "#ff00c6",
            color: "white",
            fontWeight: "700"
        },
        "AGUARDANDO VERIFIÇÃO DE PEÇAS": {
            background: "#00f1ff",
            color: "#0a7c83",
            fontWeight: "700"
        },
        "AGUARDANDO FINALIZAÇÃO DE MANUTENÇÃO": {
            background: "#ff0045",
            color: "#7b0928",
            fontWeight: "700"
        }
    };

    return (
        <div>
            <Table />
            {/* <table className={styles.table} >
                <thead  >
                    <tr>
                        <th >Nº OS</th>
                        <th>DESCRIÇÃO</th>
                        <th>EXECUÇÃO</th>
                        <th>TÉCNICO</th>
                        <th>PRIORIDADE</th>
                        <th>STATUS</th>
                    </tr>
                </thead>
                <tbody className={styles.table_body} >
                    {data && (
                        data.map((item, index) => (
                            <tr key={index} >
                                <td>{item.numeroOrdemServico}</td>
                                <td>{item.descricaoServico}</td>
                                <td>{item.execucao}</td>
                                <td >{item.tecnicoResponsavel}</td>
                                <td style={searchColorPrioridade(item.prioridade)} >{item.prioridade}</td>
                                <td style={searchColorStatus(item.statusOrdemServico)} >{item.statusOrdemServico}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table> */}
        </div>
    )
}