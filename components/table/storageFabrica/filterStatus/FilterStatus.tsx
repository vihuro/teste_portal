import { useEffect, useState } from "react";
import style from "./style.module.css";
import { v4 as uuidv4 } from "uuid";

interface listStatus {
    Status: string
}
interface listStatusVisible {
    id: string,
    status: string,
    visible: boolean
}
interface colorsStatus {
    status: string,
    backgroundcolor: string,
    color: string
}


export function FilterStatus({ list, lisColors }: { list: listStatus[], lisColors: colorsStatus[] }) {

    const [data, setData] = useState<listStatus[]>([]);
    const [filter, setFilter] = useState<listStatusVisible[]>([]);
    const [marcarTodos, setDesmarcarTodos] = useState({
        marcar: true,
        demarcar: false
    })


    useEffect(() => {
        if (filter.length === 0) {

            const filterList: listStatusVisible[] = list.map(item => ({
                id: uuidv4(),
                status: item.Status,
                visible: true
            }));

            const secondList: listStatusVisible[] = filterList.filter(
                (item, index, self) => {
                    return index === self.findIndex(i => i.status === item.status);
                }
            );
            setFilter(secondList)
        }
    }, [list, lisColors]);

    function MarcarTodos() {
        setDesmarcarTodos({
            marcar: true,
            demarcar: false
        })
        setFilter(filter.map(item => ({
            ...item,
            visible: true
        })))
    }
    function DesmarcarTodos() {
        setDesmarcarTodos({
            marcar: false,
            demarcar: true
        })
        setFilter(filter.map(item => ({
            ...item,
            visible: false
        })))
    }
    function getColor(text: string) {

        const styleColor = lisColors.find(item => item.status === text);

        return {
            backgroundColor: styleColor?.backgroundcolor,
            color: styleColor?.color
        }
    }

    function changeVisible({ id, visible }: {
        id: string,
        visible: boolean
    }) {
        setFilter(filter.map((item, index) => ({
            ...item,
            visible: item.id === id ? visible : item.visible
        })))
    }

    const List = () => {
        return (
            <main className={style.card} >
                <section className={style.container_radio} >
                    <div>
                        <input
                            id="radio_Status_marcar"
                            checked={marcarTodos.marcar}
                            name="marcar_Status"
                            onChange={MarcarTodos}
                            type="radio" />
                        <label htmlFor="radio_Status_marcar">Marcar Todos</label>
                    </div>
                    <div>
                        <input
                            id="radio_Status_desmarcar"
                            checked={marcarTodos.demarcar}
                            name="marcar_Status"
                            onChange={DesmarcarTodos}
                            type="radio" />
                        <label htmlFor="radio_Status_desmarcar">Desmarcar Todos</label>
                    </div>
                </section>
                <article className={style.container_list} >
                    <ul>
                        {filter && (
                            filter.map((item, index) =>
                                <li key={index} >
                                    <input
                                        id={item.id}
                                        type="checkbox"
                                        checked={item.visible}
                                        onChange={e => changeVisible({
                                            id: item.id,
                                            visible: e.target.checked
                                        })}
                                    />
                                    <label
                                        htmlFor={item.id}>
                                        <p style={getColor(item.status)} >
                                            {item.status}
                                        </p>
                                    </label>
                                </li>
                            )
                        )}
                    </ul>
                </article>
                <footer></footer>
            </main>

        )
    }

    return {
        List,
        filter,
        setFilter
    }
}