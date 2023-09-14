import { useEffect, useState } from "react";
import style from "./style.module.css";
import { BiFilterAlt, BiSearchAlt2 } from "react-icons/bi";

interface props {
    id: string,
    codigo: string
}
interface propsVisible {
    id: string,
    codigo: string,
    visible: boolean
}

export default function FilterCodigo(list: props[]) {


    const [data, setData] = useState<propsVisible[]>([]);
    const [textFilter, setTextFilter] = useState<string>("");
    const [filteredData, setFilteredData] = useState<propsVisible[]>([]);

    useEffect(() => {
        const uniqueCodigo = list.filter((item, index, self) => {
            const firstIndex = self.findIndex(other => other.codigo === item.codigo);
            return firstIndex === index;
        })
        if (uniqueCodigo.length !== data.length) {
            setData(uniqueCodigo.map(item => ({
                codigo: item.codigo,
                id: item.id,
                visible: true
            })))
        }
    }, [list])

    function ChangeListVisible(idList: number) {
        const list = data.map((item, index) => ({
            ...item,
            visible: idList === index ? !item.visible : item.visible
        }))
        setData(list);
    }

    useEffect(() => {
        const filter = data.filter((item) =>
            item.codigo.toLowerCase().startsWith(textFilter.toLowerCase()));
        setFilteredData(filter);

    }, [data, textFilter])


    function CardFilterCodigo() {
        const [text, setText] = useState<string>("");

        return (
            <section className={style.container} >
                <div className={style.containerInput} >
                    <div className={style.wrapContainer_input} >
                        <input type="text"
                            value={text}
                            onKeyDown={e => {
                                if (e.key === "Enter") {
                                    setTextFilter(text)
                                }
                            }}
                            onChange={(e) => setText(e.target.value)}
                        />
                        <label htmlFor="">FILTRO</label>
                        <BiSearchAlt2
                            onClick={() => setTextFilter(text)}
                        />
                    </div>

                </div>
                <div className={style.list} >
                    <ul>
                        {data && (
                            filteredData.map((item, index) => (
                                <li key={index} >
                                    <input
                                        id={item.id}
                                        type="checkbox"
                                        checked={item.visible}
                                        onChange={() => {
                                            ChangeListVisible(index)
                                        }}
                                    />
                                    <label htmlFor={item.id}>
                                        {item.codigo}
                                    </label>
                                </li>
                            ))
                        )}

                    </ul>
                </div>
            </section>
        )
    }
    return {
        CardFilterCodigo,
        filteredData
    }
}