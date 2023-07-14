import style from "./style.module.css";
import { useState, useEffect, useRef } from "react";
import { BiFilter } from "react-icons/bi";

interface item {
    codigo: string
}
interface itemVisible {
    codigo: string,
    visible: boolean
}

export function FilterCodigo({ codigo }: { codigo: item[] }) {

    const [data, setData] = useState<itemVisible[]>([]);
    const [filter, setFilter] = useState<itemVisible[]>([]);
    const [textFilter, setTextFilter] = useState<string>("");
    const textFilterRef = useRef<HTMLInputElement>(null);
    const [marcarTodos, setMarcarTodo] = useState({
        marcar: true,
        desmarcar: false
    })

    useEffect(() => {
        if (data.length === 0) {
            setData(codigo.map(item => (
                {
                    codigo: item.codigo,
                    visible: true
                }
            )))
        }
        if (filter.length === 0) {
            setFilter(codigo.map(item => (
                {
                    codigo: item.codigo,
                    visible: true
                }
            )))
        }

    }, [codigo])

    function changeVisible({ id, visible }: {
        id: number,
        visible: boolean
    }) {
        setFilter(filter.map((item, index) => ({
            ...item,
            visible: index === id ? visible : item.visible
        })))
    }
    function changeFilter() {

        const text = textFilterRef.current?.value || "";
        const newList = data.filter(item =>
            item.codigo
                .toLocaleLowerCase()
                .includes(text.toLocaleLowerCase()))
        setFilter(newList)
    }
    function changeMarcarTodos() {
        setFilter(filter.map(item => ({
            ...item,
            visible: true
        })))
        setMarcarTodo({
            desmarcar: false,
            marcar: true
        })
    }
    function changeDesmarcarTodos() {
        setFilter(filter.map(item => ({
            ...item,
            visible: false
        })))
        setMarcarTodo({
            desmarcar: true,
            marcar: false
        })
    }


    const List = () => {
        return (
            filter && (
                <div className={style.container}>
                    <div className={style.container_input} >
                        <input
                            ref={textFilterRef}
                            type="text" />
                        <label htmlFor="">FILTRO</label>
                        <BiFilter
                            onClick={changeFilter}
                        />
                    </div>
                    <div className={style.container_radio} >
                        <div>
                            <input
                                id="radio_marcar"
                                name="marcar"
                                checked={marcarTodos.marcar}
                                onChange={() => changeMarcarTodos()}
                                type="radio" />
                            <label htmlFor="radio_marcar">Marcar todos</label>
                        </div>
                        <div>
                            <input
                                id="radio_desmarcar"
                                name="marcar"
                                checked={marcarTodos.desmarcar}
                                onChange={() => changeDesmarcarTodos()}
                                type="radio" />
                            <label htmlFor="radio_desmarcar">Desmarcar todos</label>
                        </div>

                    </div>
                    <div className={style.container_list} >
                        <ul>
                            {filter.map((item, index) =>
                                <li key={index} >
                                    <input id={index.toString()} type="checkbox"
                                        onChange={(e) => changeVisible({
                                            id: index,
                                            visible: e.target.checked
                                        })}
                                        checked={item.visible} />
                                    <label htmlFor={index.toString()}> {item.codigo}</label>

                                </li>)}
                        </ul>
                    </div>
                </div>
            )

        )
    }

    return {
        List,
        filter,
        setFilter
    }
}