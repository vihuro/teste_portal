import { useEffect, useState } from "react";
import style from "./style.module.css";
import { v4 as uuidv4 } from "uuid";

interface listFornecedor {
    fornecedor: string
}
interface listFornecedorVisible {
    id: string,
    fornecedor: string,
    visible: boolean
}

export function FilterFornecedor({ list }: { list: listFornecedor[] }) {

    const [data, setData] = useState<listFornecedor[]>([]);
    const [filter, setFilter] = useState<listFornecedorVisible[]>([]);
    const [marcarTodos, setDesmarcarTodos] = useState({
        marcar: true,
        demarcar: false
    })


    useEffect(() => {
        if (filter.length === 0) {

            const filterList: listFornecedorVisible[] = list.map(item => ({
                id: uuidv4(),
                fornecedor: item.fornecedor,
                visible: true
            }));

            const secondList: listFornecedorVisible[] = filterList.filter(
                (item, index, self) => {
                    return index === self.findIndex(i => i.fornecedor === item.fornecedor);
                }
            );
            setFilter(secondList)
        }
    }, [list]);

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
                            id="radio_fornecedor_marcar"
                            checked={marcarTodos.marcar}
                            name="marcar_fornecedor"
                            onChange={MarcarTodos}
                            type="radio" />
                        <label htmlFor="radio_fornecedor_marcar">Marcar Todos</label>
                    </div>
                    <div>
                        <input
                            id="radio_fornecedor_desmarcar"
                            checked={marcarTodos.demarcar}
                            name="marcar_fornecedor"
                            onChange={DesmarcarTodos}
                            type="radio" />
                        <label htmlFor="radio_fornecedor_desmarcar">Desmarcar Todos</label>
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
                                        {item.fornecedor}
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