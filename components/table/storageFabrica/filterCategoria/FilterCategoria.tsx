import { useEffect, useState } from "react";
import style from "./style.module.css";
import { v4 as uuidv4 } from "uuid";

interface listCategoria {
    categoria: string
}
interface listCategoriaVisible {
    id: string,
    categoria: string,
    visible: boolean
}
interface colorsCategoria {
    categoria: string,
    backgroundcolor: string,
    color: string
}


export function FilterCategoria({ list, lisColors }: { list: listCategoria[], lisColors: colorsCategoria[] }) {

    const [data, setData] = useState<listCategoria[]>([]);
    const [filter, setFilter] = useState<listCategoriaVisible[]>([]);
    const [marcarTodos, setDesmarcarTodos] = useState({
        marcar: true,
        demarcar: false
    })


    useEffect(() => {
        if (filter.length === 0) {

            const filterList: listCategoriaVisible[] = list.map(item => ({
                id: uuidv4(),
                categoria: item.categoria,
                visible: true
            }));

            const secondList: listCategoriaVisible[] = filterList.filter(
                (item, index, self) => {
                    return index === self.findIndex(i => i.categoria === item.categoria);
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

        const styleColor = lisColors.find(item => item.categoria === text);

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
                            id="radio_Categoria_marcar"
                            checked={marcarTodos.marcar}
                            name="marcar_Categoria"
                            onChange={MarcarTodos}
                            type="radio" />
                        <label htmlFor="radio_Categoria_marcar">Marcar Todos</label>
                    </div>
                    <div>
                        <input
                            id="radio_Categoria_desmarcar"
                            checked={marcarTodos.demarcar}
                            name="marcar_Categoria"
                            onChange={DesmarcarTodos}
                            type="radio" />
                        <label htmlFor="radio_Categoria_desmarcar">Desmarcar Todos</label>
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
                                        <p style={getColor(item.categoria)} >
                                            {item.categoria}
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