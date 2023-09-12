import { Fragment, useEffect, useState } from "react"
import Api from "../../../../service/api/assistenciaTecnica/Assistencia";
import style from "./style.module.css";
import { FiEdit } from "react-icons/fi"
import Card from "./cardAdd/Card";
import { BiArrowFromTop } from "react-icons/bi";
import { DateTimeStringFormat } from "../../../utils/DateTimeString";

interface maquinaProps {
    ativo: boolean,
    id: string,
    pecas: string[],
    tipoMaquina: string,
    numeroSerie: string,
    cadastro: userProps,
    alteracao: userProps
}
interface userProps {
    apelido: string,
    nome: string,
    dataHora: Date,
    id: string
}

export default function Table() {
    const [data, setData] = useState<maquinaProps[]>([]);
    const [toogleAdd, setToogleAdd] = useState<boolean>(false);

    const [toogleInfoPlus, setToogleInfoPlus] = useState<boolean>(false);
    const [indiceInfoPlus, setIndiceInfoPlus] = useState<number>();

    useEffect(() => {
        FechData()

    }, [])
    async function FechData() {
        await Api.get("maquina")
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }
    return (
        <main className={style.container} >
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
                                <th>
                                    +
                                </th>
                                <th>MÁQUINA</th>
                                <th>STATUS</th>
                                <th>Nº SÉRIE</th>
                                <th>EDIT.</th>
                            </tr>
                        </thead>
                        <tbody className={style.table_body} >
                            {data && (
                                data.map((item, index) => (
                                    <Fragment key={index}>
                                        <tr >
                                            <td onClick={() => {
                                                setIndiceInfoPlus(index)
                                                setToogleInfoPlus(!toogleInfoPlus)
                                            }}>
                                                <BiArrowFromTop
                                                    className={toogleInfoPlus && index === indiceInfoPlus ?
                                                        style.down :
                                                        style.top}
                                                />
                                            </td>
                                            <td>{item.tipoMaquina}</td>
                                            <td>{
                                                item.ativo ? "ATIVO" : "INATIVO"
                                            }</td>
                                            <td>
                                                {item.numeroSerie}
                                            </td>
                                            <td>
                                                <FiEdit />
                                            </td>
                                        </tr>
                                        {toogleInfoPlus && indiceInfoPlus === index && (
                                            <>
                                                <tr className={style.row_plus}>
                                                    <td colSpan={5}>
                                                        {`Data/Hora Cadastro: 
                                                        ${DateTimeStringFormat(item.cadastro.dataHora)}`}
                                                    </td>
                                                </tr>
                                                <tr className={style.row_plus}>
                                                    <td colSpan={5}>
                                                        {`Usuário Cadastro: 
                                                        ${item.cadastro.nome}`}
                                                    </td>
                                                </tr>
                                                <tr className={style.row_plus}>
                                                    <td colSpan={5}>
                                                        {`Data/Hora Alteração: 
                                                        ${DateTimeStringFormat(item.alteracao.dataHora)}`}
                                                    </td>
                                                </tr>
                                                <tr className={style.row_plus}>
                                                    <td colSpan={5}>
                                                        {`Usuário Alteração: 
                                                        ${item.alteracao.nome}`}
                                                    </td>
                                                </tr>
                                            </>
                                        )}
                                    </Fragment>
                                ))
                            )}
                        </tbody>
                    </table>
                </section>

            </section>
        </main>
    )
}