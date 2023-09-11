import { Fragment, useEffect, useState } from "react";
import style from "./style.module.css";
import { BiFilter } from "react-icons/bi";

interface props {
    nomeCliente: string
}
interface propsVisible {
    nomeCliente: string,
    visible: boolean
}

export default function Card({ list }: { list: props[] }) {
    const [data, setData] = useState<propsVisible[]>([]);
    const [filteredNomeCliente, setFilteredNomeCliente] = useState<propsVisible[]>([]);
    const [valueNomeCliente, setValueNomeCliente] = useState<string>("");

    useEffect(() => {
        const uniqueIndex = list.filter((item, index, self) => {
            const firstIndex = self.findIndex(other => other.nomeCliente === item.nomeCliente);
            return firstIndex === index;
        })
        if (uniqueIndex.length !== data.length) {
            setData(uniqueIndex.map(item => ({
                nomeCliente: item.nomeCliente,
                visible: true
            })));
        }
    }, [list])

    useEffect(() => {
        const filter = data.filter(item =>
            item.nomeCliente
                .toLocaleUpperCase()
                .startsWith(valueNomeCliente.toLocaleUpperCase()));

        setFilteredNomeCliente(filter);
    }, [data, valueNomeCliente])


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
        const [text, setText] = useState<string>("");

        return (
            <ul className={style.list} >
                <section className={style.container_filter} >
                    <div className={style.wrap_container_filter} >
                        <input type="text"
                            onChange={e => setText(e.target.value)}
                            value={text}
                        />
                        <label htmlFor="">FILTRO</label>
                        <BiFilter

                        />
                    </div>
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
        data,
        filteredNomeCliente
    }
}

