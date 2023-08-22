import { useEffect, useState } from "react";


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



export default function Filter({ list, searchColor }: { list: props[], searchColor: Function }) {

    const [data, setData] = useState<propsVisible[]>([]);
    useEffect(() => {
        if (data.length === 0) {
            const unique = list.filter((item, index, self) => {
                const firstIndex = self.findIndex(otherItem => otherItem.id === item.id);
                return index === firstIndex;
            })
            setData(unique.map(item => ({
                ...item,
                visible: true
            })))
        }

    }, [data])


    function Card() {

        return (
            <section>
                <ul>
                    {data && (
                        data.map((item, index) => (
                            <li key={index} >
                                <input
                                    id={item.id}
                                    type="checkbox"
                                    checked={item.visible}
                                    onChange={(e) => setData(data.map(value => ({
                                        ...value,
                                        visible: value.id === item.id ? e.currentTarget.checked : value.visible
                                    })))} />
                                <label
                                    style={searchColor(item.tipo)}
                                    htmlFor={item.id}>
                                    {item.tipo}
                                </label>
                            </li>
                        ))
                    )}
                </ul>

            </section>
        )
    }
    return {
        Card,
        data,
        setData
    }
}