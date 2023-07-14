import { useEffect, useState } from "react";
import style from "./style.module.css";

interface listUnidade {
    unidade: string
}
interface listUnidadeVisible {
    unidade: string,
    visible: boolean
}
interface colorsUnidade {
    TIPO: string,
    backgroundcolor: string,
    color: string
}


export function FilterUnidade({ list, lisColors }: { list: listUnidade[], lisColors: colorsUnidade[] }) {

    const [data, setData] = useState<listUnidade[]>([]);
    const [filter, setFilter] = useState<listUnidadeVisible[]>([]);
    const [marcarTodos, setDesmarcarTodos] = useState({
        marcar: true,
        demarcar: false
    })

    useEffect(() => {
        if (filter.length === 0) {
            const filterList: listUnidadeVisible[] = list.map(item => ({
                unidade: item.unidade,
                visible: true
            }));

            const secondList: listUnidadeVisible[] = filterList.filter(
                (item, index, self) => {
                    return index === self.findIndex(i => i.unidade === item.unidade);
                }
            );
            setFilter(secondList)
        }
    }, [list, lisColors])
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

        const styleColor = lisColors.find(item => item.TIPO === text);

        return {
            backgroundColor: styleColor?.backgroundcolor,
            color: styleColor?.color
        }
    }

    function changeVisible({ id, visible }: {
        id: number,
        visible: boolean
    }) {
        setFilter(filter.map((item, index) => ({
            ...item,
            visible: index === id ? visible : item.visible
        })))
    }

    const List = () => {
        return (
            <main className={style.card} >
                <section className={style.container_radio} >
                    <div>
                        <input
                            id="marcar_todos"
                            checked={marcarTodos.marcar}
                            name="marcar_unidade"
                            onChange={MarcarTodos}
                            type="radio" />
                        <label htmlFor="marcar_todos">Marcar Todos</label>
                    </div>
                    <div>
                        <input
                            id="desmarcar_todos"
                            checked={marcarTodos.demarcar}
                            name="marcar_unidade"
                            onChange={DesmarcarTodos}
                            type="radio" />
                        <label htmlFor="desmarcar_todos">Desmar Todos</label>
                    </div>
                </section>
                <article className={style.container_list} >
                    <ul>
                        {filter && (
                            filter.map((item, index) =>
                                <li key={index} >
                                    <input
                                        type="checkbox"
                                        checked={item.visible}
                                        onChange={e => changeVisible({
                                            id:index,
                                            visible:e.target.checked
                                        })}
                                        />
                                    <label
                                        htmlFor="">
                                        <p style={getColor(item.unidade)} >
                                            {item.unidade}

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