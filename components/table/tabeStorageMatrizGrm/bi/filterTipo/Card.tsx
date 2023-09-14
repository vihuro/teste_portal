import { useEffect, useState } from "react";
import style from "./style.module.css";

interface props {
    id: string,
    tipo: string,
}
interface propsColor {
    backgroundColor: string,
    color: string
}
interface propsVisible {
    id: string,
    tipo: string,
    visible: boolean
}


export default function Card({ list, searchColor }: { list: props[], searchColor: Function }) {

    const [data, setData] = useState<propsVisible[]>([]);
    useEffect(() => {
        const unique = list.filter((item, index, self) => {
            const firstIndex = self.findIndex(other => other.id === item.id);
            return index === firstIndex
        });
        if (unique.length !== data.length) {

            setData(unique.map(item => ({
                ...item,
                visible: true
            })))
        }

    }, [list])

    function CardFilterTipo() {
        return (
            <section className={style.container} >
                <ul  >
                    {data && (
                        data.map((item, index) => (
                            <li key={index} >
                                <input id={item.id}
                                    type="checkbox"
                                    checked={item.visible}
                                    onChange={(e) => setData(data.map(value => ({
                                        ...value,
                                        visible: value.id === item.id ? e.currentTarget.checked : value.visible
                                    })))}
                                />
                                <label style={searchColor(item.tipo)} htmlFor={item.id}>
                                    {item.tipo}
                                </label>
                            </li>
                        ))
                    )}
                    <li>

                    </li>
                </ul>
            </section>
        )
    }

    return {
        CardFilterTipo,
        data
    }
}