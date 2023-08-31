import { useEffect, useState } from "react"
import Api from "../../../../service/api/assistenciaTecnica/Assistencia";
import style from "./style.module.css";
import { FiEdit } from "react-icons/fi"
import Card from "./cardAdd/Card";

interface maquinaProps {
    ativo: boolean,
    id: string,
    pecas: string[],
    tipoMaquina: string
}

export default function Table() {
    const [data, setData] = useState<maquinaProps[]>([]);
    const [toogleAdd, setToogleAdd] = useState<boolean>(false);
    useEffect(() => {
        FechData()

    }, [])
    async function FechData(){
        Api.get("maquina")
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }
    return (
        <main className={style.container_body} >
            <section className={style.container_button} >
                <button onClick={() => setToogleAdd(true)} >
                    Nova Maquina
                </button>
            </section>
            <section className={toogleAdd ? style.cardAdd : style.cardAdd_close} >
                <Card changeToogle={setToogleAdd} refreshTable={FechData} />
            </section>
            <section className={style.container_table} >
                <section className={style.wrap_container_table} >
                    <table className={style.table} >
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Maquina</th>
                                <th>Status</th>
                                <th>Edit.</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && (
                                data.map((item, index) => (
                                    <tr key={index} >
                                        <td>{item.id}</td>
                                        <td>{item.tipoMaquina}</td>
                                        <td>{
                                            item.ativo ? "ATIVO" : "INATIVO"
                                        }</td>
                                        <td>
                                            <FiEdit />
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </section>

            </section>
        </main>
    )
}