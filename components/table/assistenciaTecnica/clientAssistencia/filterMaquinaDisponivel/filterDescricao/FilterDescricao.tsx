import { useEffect, useState } from "react";
import style from "./style.module.css";
import { BiFilterAlt, BiSearchAlt2 } from "react-icons/bi";

interface props {
    id: string,
    text: string
}
interface propsVisible {
    id: string,
    text: string,
    visible: boolean
}

export default function FilterDescricao(list: props[]) {


    const [data, setData] = useState<propsVisible[]>([]);
    const [textFilter, setTextFilter] = useState<string>("");
    const [filteredData, setFilteredData] = useState<propsVisible[]>([]);

    useEffect(() => {
        const uniqueCodigo = list.filter((item, index, self) => {
            const firstIndex = self.findIndex(other => other.text === item.text);
            return firstIndex === index;
        })
        if (uniqueCodigo.length !== data.length) {
            setData(uniqueCodigo.map(item => ({
                text: item.text,
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
            item.text.toLowerCase().startsWith(textFilter.toLowerCase()));
        setFilteredData(filter);

    }, [data, textFilter])


    function CardFilterColunaTable() {
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
                                        type="checkbox"
                                        checked={item.visible}
                                        onChange={() => {
                                            ChangeListVisible(index)
                                        }}
                                    />
                                    <label onClick={() => ChangeListVisible(index)}>
                                        {item.text}
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
        CardFilterColunaTable,
        filteredData
    }
}