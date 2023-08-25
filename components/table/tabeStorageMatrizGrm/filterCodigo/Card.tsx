import { useState, useEffect } from "react";
import { BiFilter } from "react-icons/bi";
import style from "./style.module.css";

interface props {
    listProps: listProps[],
    searchColor: Function
}
interface listProps {
    id: string,
    codigo: string
}
interface listPropsVisible {
    id: string,
    codigo: string,
    visible: boolean
}


export default function Filter({ listProps, searchColor }: props) {
    const [data, setData] = useState<listPropsVisible[]>([]);

    const [valueCodigo, setValueCodigo] = useState<string>("");
    useEffect(() => {
        if (data.length === 0) {
            const unique = listProps.filter((item, index, self) => {
                const firstIndex = self.findIndex(otherItem => otherItem.codigo === item.codigo);
                return index === firstIndex;
            })
            setData(unique.map(item => ({
                ...item,
                visible: true
            })))
        }
    }, [data, listProps])

    const filter = data
        .filter(item =>
            item.codigo
                .toLowerCase()
                .startsWith(valueCodigo.toLowerCase()))

    function Card() {
        const [text, setText] = useState<string>("");
        return (
            <section>
                <div className={style.container} >
                    <input value={text} onChange={e =>
                        setText(e.target.value)} type="text"
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                setValueCodigo(text)
                            }

                        }}
                    />
                    <span>Filtro</span>
                    <BiFilter style={{
                        color: "blue",
                        left: 135,
                        top: 10,
                        position: "absolute"
                    }} onClick={() => setValueCodigo(text)} />
                </div>
                {filter && (
                    filter.map((item, index) => (
                        <ul key={index} >
                            <li>
                                <input
                                    id={item.id}
                                    checked={item.visible}
                                    type="checkbox"
                                    onChange={e => setData(data.map(value => ({
                                        ...value,
                                        visible: value.codigo === item.codigo ? e.currentTarget.checked : value.visible
                                    })))}
                                />
                                <label htmlFor={item.id}>{item.codigo}</label>
                            </li>
                        </ul>
                    ))
                )}
            </section>
        )
    }
    return {
        Card,
        data,
        filter
    }
}