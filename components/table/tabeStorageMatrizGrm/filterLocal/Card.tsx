import { useState, useEffect, useMemo } from "react";

interface props {
    list: listProps[],
    searchColors: Function

}

interface listProps {
    id: string,
    localEstocagem: string
}
interface listPropsVisible {
    id: string,
    localEstocagem: string,
    visible: boolean
}


export default function Filter({ list, searchColors }: props) {

    const [data, setData] = useState<listPropsVisible[]>([]);

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
                            onClick={() => setData(data.map(value => ({
                                ...value,
                                visible: value.id === item.id ? !value.visible : value.visible
                            })))}
                            style={searchColors(item.localEstocagem)}
                            htmlFor={item.id}>
                                {item.localEstocagem}
                            </label>

                        </li>
                    ))
                )}
            </ul>
        )

    }
    return {
        Card,
        data,
        setData
    }

}
