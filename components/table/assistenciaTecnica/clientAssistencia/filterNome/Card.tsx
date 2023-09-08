import { Fragment, useEffect, useState } from "react";
import style from "./style.module.css";

interface props {
    nomeCliente: string
}
interface propsVisible {
    nomeCliente: string,
    visible: boolean
}

export default function Card({ list }: { list: props[] }) {
    const [data, setData] = useState<propsVisible[]>([]);

    useEffect(() => {
        if (list.length !== data.length)
        ListData()
    }, [list])

    function ListData() {
        const newList = list.map(item => ({
            ...item,
            visible: true
        }));
        setData(newList);
    }
    function ChangeList({ codigo, visibility }:
        {
            codigo: string,
            visibility: boolean
        }) {
        const changeVisible = data.map((item, index) => ({
            ...item,
            visible: codigo == item.nomeCliente ? visibility : item.visible
        }))
        setData(changeVisible);

    }
    function CardFilterNome() {
        return (
            <ul className={style.list} >
                <section className={style.container_filter} >

                </section>
                <section className={style.container_body} >
                    {data && (
                        data.map((item, index) => (
                            <Fragment key={index} >
                                <li>
                                    <input type="checkbox"
                                        id={item.nomeCliente}
                                        checked={item.visible}
                                        onChange={e => {
                                            ChangeList({
                                                codigo: item.nomeCliente,
                                                visibility: e.currentTarget.checked
                                            })
                                        }} />
                                    <label htmlFor={item.nomeCliente}>
                                        {item.nomeCliente}
                                    </label>
                                </li>
                            </Fragment>
                        ))
                    )}
                </section>
            </ul>
        )
    }

    return {
        CardFilterNome,
        data
    }
}

