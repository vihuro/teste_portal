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
    const textFilterRef = useRef<HTMLInputElement>(null)

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

        console.log(textFilterRef.current?.value)
        // const newList = data.filter(item =>
        //     item.codigo
        //         .toLocaleLowerCase()
        //         .includes(text.toLocaleLowerCase()))
        // setFilter(newList)
    }

    // let data = codigo && (
    //     codigo.map(item => ({
    //         codigo: item.codigo,
    //         visible: true
    //     }))
    // )

    console.log(textFilterRef.current?.value)
    const List = () => {
        return (
            filter && (
                <div className={style.container}>
                    <div className={style.container_input} >
                        <input
                            onBlur={changeFilter}
                            ref={textFilterRef}
                            type="text" />
                        <label htmlFor="">FILTRO</label>
                    </div>
                    <div className={style.container_list} >
                        <ul>
                            {filter.map((item, index) =>
                                <li key={index} >
                                    <input type="checkbox"
                                        onChange={(e) => changeVisible({
                                            id: index,
                                            visible: e.target.checked
                                        })}
                                        checked={item.visible} />
                                    <label htmlFor=""> {item.codigo}</label>

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