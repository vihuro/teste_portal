import { useEffect, useState } from "react";
import style from "./style.module.css";
import { BiSearchAlt2 } from "react-icons/bi";
import RadioUi from "../../UI/input/radio/RadioButton";

interface props {
    searchColor?: Function,

    list: dataProps[]
}

interface dataProps {
    id: string,
    text: string
}
interface propsVisible {
    id: string,
    text: string,
    visible: boolean
}
interface propsCard {
    input?: boolean,
    radioButton?: boolean,
    idRadioButton?: string,
}

export default function FilterDescricao({ list, searchColor }: props) {


    const [data, setData] = useState<propsVisible[]>([]);
    const [textFilter, setTextFilter] = useState<string>("");
    const [filteredData, setFilteredData] = useState<propsVisible[]>([]);
    const [marcarTodos, setDesmarcarTodos] = useState<boolean>(true);


    useEffect(() => {
        const uniqueText = list.filter((item, index, self) => {
            const firstIndex = self.findIndex(other => other.text === item.text);
            return firstIndex === index;
        })
        if (uniqueText.length !== data.length) {
            setData(uniqueText.map(item => ({
                text: item.text,
                id: item.id,
                visible: marcarTodos
            })))
        }
    }, [list]);


    function refresList({ list }: props) {
        const uniqueText = list.filter((item, index, self) => {
            const firstIndex = self.findIndex(other => other.text === item.text);
            return firstIndex === index;
        });
        setData(uniqueText.map(item => ({
            text: item.text,
            visible: true,
            id: item.id
        })))

    }

    function ChangeListVisible(idList: number) {
        const list = data.map((item, index) => ({
            ...item,
            visible: idList === index ? !item.visible : item.visible
        }))
        setData(list);
    }
    function ChangeVisible(checked: boolean) {

        setDesmarcarTodos(checked);

        setData(data.map(item => ({
            ...item,
            visible: checked ? true : false
        })))

    }
    const { Radio } = RadioUi();

    useEffect(() => {
        const filter = data.filter((item) =>
            item.text.toLowerCase().startsWith(textFilter.toLowerCase()));
        setFilteredData(filter);

    }, [data, textFilter]);




    function CardFilterColunaTable({ input, radioButton, idRadioButton = "rdbRadio" }: propsCard) {

        const [text, setText] = useState<string>(textFilter);
        
        return (
            <section className={input ?
                style.container : style.container} >
                {input && (
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
                )}
                {radioButton && (
                    <div className={style.containerRabioButton} >
                        <div>
                            <Radio color="green"
                                id={`rdbMarcarTodos-${idRadioButton}`}
                                name={idRadioButton}
                                checked={marcarTodos}
                                onChange={e => { }}
                                onClick={e => {
                                    ChangeVisible(true)
                                }}
                                text="MARCAR TODOS" />
                        </div>
                        <div>
                            <Radio color="red"
                                id={`rdbDesmarcarTodos-${idRadioButton}`}
                                name={idRadioButton}
                                checked={!marcarTodos}
                                onChange={e => { }}
                                onClick={e => {
                                    ChangeVisible(false)
                                }}
                                text="DESMARCAR TODOS" />
                        </div>

                    </div>
                )}
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
                                        <p style={searchColor ? searchColor(item.text) : null} >
                                            {item.text}
                                        </p>
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
        filteredData,
        refresList
    }
}