import style from "./style.module.css";
import { useState, useEffect } from "react"

interface props {
    name: string[],
    visible: boolean

}
interface listVisible {
    name?: string,
    visible: boolean
}

export default function FilterName({ name, visible }: props) {
    const [listFilter, setListFilter] = useState<listVisible[]>([]);
    const [list, setList] = useState<string[]>([]);


    function changeList({ id, visible }: { id: number, visible: boolean }) {
        const changeVisible = listFilter.map((item, index) => ({
            ...item,
            visible: id === index ? visible : item.visible
        }))
        setListFilter(changeVisible);
    }


    function List() {
        useEffect(() => {
            if (name && name.length > 0 && list !== name) {
                const teste = name.map(item => ({
                    visible: true,
                    name: item
                }))
                setListFilter(teste);
                setList(name);
            }

        }, [visible === true && name])

        // useEffect(() => {
        //     if (name && name.length > 0) {
        //         const uniqueName = Array.from(new Set(name));
        //         const filter = uniqueName.map(item => ({
        //             name: item,
        //             visible: true
        //         }));
        //         setList(name.map(item => item));
        //         setListFilter(filter)
        //     }
        // }, [name])
        return (
            <main className={style.container_card} >
                <ul className={style.container_list} >
                    {listFilter && listFilter.length > 0 && (
                        listFilter.map((item, index) => (
                            <li key={index} >
                                <input type="checkbox" onChange={(e) => changeList({
                                    id: index,
                                    visible: e.currentTarget.checked
                                })} checked={item.visible} />
                                <label htmlFor="">{item.name}</label>
                            </li>
                        ))
                    )}
                </ul>
            </main>

        )
    }
    return {
        List,
        listFilter,
    }

}