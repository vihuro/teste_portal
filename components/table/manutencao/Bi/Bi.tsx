import { useEffect, useState } from "react";
import styles from "./style.module.css";
import Api from "../../../../service/api/manutencao/Manutencao";
import { SearchColorPrioridade, SearchColorStatus } from "../Functions";
import { IOrderService } from "../IOrderService";

export default function Bi() {
    const [data, setData] = useState<IOrderService[]>([]);

    useEffect(() => {
        FetchData();
    }, [])

    async function FetchData() {
        Api.get("order-service")
            .then(res => setData(res.data))
            .catch(err => console.log(err))

    }
    return (
        <div>
            <table className={styles.table} >
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
                                <td>{item.id}</td>
                                <td>{item.description}</td>
                                <td>{item.localeManinteace}</td>
                                <td >{ }</td>
                                <td style={SearchColorPrioridade(item.priority)} >{item.priority}</td>
                                <td style={SearchColorStatus(item.situation)} >{item.situation}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}