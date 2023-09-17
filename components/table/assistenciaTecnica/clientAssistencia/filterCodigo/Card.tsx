import { useState, useEffect, Fragment } from "react";
import style from "./style.module.css";

interface props {
    codigo: string,
}
interface propsVisible {
    codigo: string,
    visible: boolean
}

export default function Card({ list }: { list: props[] }) {
    const [data, setData] = useState<propsVisible[]>([]);

    useEffect(() => {
        const uniqueIndex = list.filter((item, index, self) => {
            const firstIndex = self.findIndex(other => other.codigo === item.codigo);
            return index === firstIndex;
        })
        
        if (data.length !== uniqueIndex.length)

            setData(uniqueIndex.map(item => ({
                codigo: item.codigo,
                visible: true
            })));


    }, [list])
    



    function ChangeList({ codigo, visibility }:
        {
            codigo: string,
            visibility: boolean
        }) {
        const changeVisible = data.map((item, index) => ({
            ...item,
            visible: codigo == item.codigo ? visibility : item.visible
        }))
        setData(changeVisible);

    }
    function CardFilter() {
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
                                        id={item.codigo}
                                        checked={item.visible}
                                        onChange={e => {
                                            ChangeList({
                                                codigo: item.codigo,
                                                visibility: e.currentTarget.checked
                                            })
                                        }} />
                                    <label htmlFor={item.codigo}>
                                        {item.codigo}
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
        CardFilter,
        data
    }

}


