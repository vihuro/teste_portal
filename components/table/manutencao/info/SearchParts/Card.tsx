import styles from "./style.module.css";
import { FetchData } from "./Functions";
import { useEffect, useState } from "react";
import { IParts } from "./IParts"
import CardConfirm from "./ConfirmPart/Card";

interface Props {
    changeToogle: Function,
    toogle: boolean
}

export default function Card({ changeToogle, toogle }: Props) {

    const [data, setData] = useState<IParts[]>([]);
    const [filter, setFilter] = useState<string>("");
    const [partSelect, setPartSelect] = useState<IParts>();
    const [toogleConfirm, setToogleConfirm] = useState<boolean>(false);

    useEffect(() => {
        const fetch = async () => {
            if (toogle) {
                const result = await FetchData()
                    .then(res => res.data);

                setData(() => result)
            }
        }
        fetch();

    }, [toogle])

    const handleFilterDescription = () => {
        return data.filter(item =>
            item.description
                .toUpperCase()
                .includes(filter.toUpperCase()))
    }

    const value = "close"
    return (
        <div className={styles.form} >
            <main className={styles.container} >
                <div className={`${styles.containerConfirm}
                ${!toogleConfirm && styles[`--close`]}`} >
                    <CardConfirm changeToogle={setToogleConfirm}
                        toogle={toogleConfirm} parts={partSelect} />

                </div>
                <header className={styles.title} >
                    <section className={styles.wrapInput} >
                        <input required type="text" onChange={(e) =>
                            setFilter(() =>
                                e.target.value)} />
                        <label htmlFor="">DESCRIÇÃO</label>
                    </section>
                </header>
                <main className={styles.body} >
                    <div className={styles.wrapTable} >
                        <table className={styles.table} >
                            <thead>
                                <tr>
                                    <th>CÓDIGO</th>
                                    <th>DESCRIÇÃO</th>
                                    <th>UNIDADE</th>
                                    <th>QTD.</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {handleFilterDescription() && handleFilterDescription().length > 0 && (
                                    handleFilterDescription().map((item, index) => (
                                        <tr key={index} >
                                            <td>{item.code}</td>
                                            <td>{item.description}</td>
                                            <td>{item.unit}</td>
                                            <td>{item.quantity}</td>
                                            <td onClick={() => {
                                                setPartSelect(() => item)
                                                setToogleConfirm((cuurent) => !cuurent)
                                            }} >
                                                <span>ADICIONAR</span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </main>
                <footer className={styles.footer}>
                    <button onClick={() => changeToogle(false)} >
                        FECHAR
                    </button>
                </footer>
            </main>
        </div>
    )
}