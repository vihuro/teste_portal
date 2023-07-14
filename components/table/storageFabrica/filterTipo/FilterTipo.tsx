import { useEffect, useState } from "react";
import style from "./style.module.css";
import { randomUUID } from "crypto";
import { v4 as uuidv4 } from "uuid";

interface listTipo {
    tipo: string
}
interface listTipoVisible {
    id: string,
    tipo: string,
    visible: boolean
}
interface colorsTipo {
    TIPO: string,
    backgroundcolor: string,
    color: string
}


export function FilterTipo({ list, lisColors }: { list: listTipo[], lisColors: colorsTipo[] }) {

    const [data, setData] = useState<listTipo[]>([]);
    const [filter, setFilter] = useState<listTipoVisible[]>([]);
    const [marcarTodos, setDesmarcarTodos] = useState({
        marcar: true,
        demarcar: false
    })


    useEffect(() => {
        if (filter.length === 0) {

            const filterList: listTipoVisible[] = list.map(item => ({
                id: uuidv4(),
                tipo: item.tipo,
                visible: true
            }));

            const secondList: listTipoVisible[] = filterList.filter(
                (item, index, self) => {
                    return index === self.findIndex(i => i.tipo === item.tipo);
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

        const styleColor = lisColors.find(item => item.TIPO === text);

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
                            id="radio_tipo_marcar"
                            checked={marcarTodos.marcar}
                            name="marcar_tipo"
                            onChange={MarcarTodos}
                            type="radio" />
                        <label htmlFor="radio_tipo_marcar">Marcar Todos</label>
                    </div>
                    <div>
                        <input
                            id="radio_tipo_desmarcar"
                            checked={marcarTodos.demarcar}
                            name="marcar_tipo"
                            onChange={DesmarcarTodos}
                            type="radio" />
                        <label htmlFor="radio_tipo_desmarcar">Desmarcar Todos</label>
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
                                        <p style={getColor(item.tipo)} >
                                            {item.tipo}
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