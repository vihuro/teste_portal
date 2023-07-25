import { useEffect, useState } from "react";
import style from "./style.module.css";
import { v4 as uuidv4 } from "uuid";

interface listStatusQuantidade {
    statusQuantidade: string
}
interface listStatusQuantidadeVisible {
    id: string,
    statusQuantidade: string,
    visible: boolean
}
interface colorsStatusQuantidade {
    statusQuantidade: string,
    backgroundcolor: string,
    color: string
}


export function FilterStatusQuantidade({ list, lisColors }: { list: listStatusQuantidade[], lisColors: colorsStatusQuantidade[] }) {

    const [data, setData] = useState<listStatusQuantidade[]>([]);
    const [filter, setFilter] = useState<listStatusQuantidadeVisible[]>([]);
    const [marcarTodos, setDesmarcarTodos] = useState({
        marcar: true,
        demarcar: false
    })


    useEffect(() => {
        if (filter.length === 0) {

            const filterList: listStatusQuantidadeVisible[] = list.map(item => ({
                id: uuidv4(),
                statusQuantidade: item.statusQuantidade,
                visible: true
            }));

            const secondList: listStatusQuantidadeVisible[] = filterList.filter(
                (item, index, self) => {
                    return index === self.findIndex(i => i.statusQuantidade === item.statusQuantidade);
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

        const styleColor = lisColors.find(item => item.statusQuantidade === text);

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
                            id="radio_StatusQuantidade_marcar"
                            checked={marcarTodos.marcar}
                            name="marcar_StatusQuantidade"
                            onChange={MarcarTodos}
                            type="radio" />
                        <label htmlFor="radio_StatusQuantidade_marcar">Marcar Todos</label>
                    </div>
                    <div>
                        <input
                            id="radio_StatusQuantidade_desmarcar"
                            checked={marcarTodos.demarcar}
                            name="marcar_StatusQuantidade"
                            onChange={DesmarcarTodos}
                            type="radio" />
                        <label htmlFor="radio_StatusQuantidade_desmarcar">Desmarcar Todos</label>
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
                                        <p style={getColor(item.statusQuantidade)} >
                                            {item.statusQuantidade}
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