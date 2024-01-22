import { useEffect, useState } from "react";
import style from "./style.module.css";
import { BiFilterAlt, BiSearchAlt2 } from "react-icons/bi";

interface props {
  id: string;
  codigoMaquina: string;
}
interface propsVisible {
  id: string;
  codigoMaquina: string;
  visible: boolean;
}

export default function FilterCodigo(list: props[]) {
  const [data, setData] = useState<propsVisible[]>([]);
  const [textFilter, setTextFilter] = useState<string>("");
  const [filteredData, setFilteredData] = useState<propsVisible[]>([]);

  useEffect(() => {
    const uniqueCodigo = list.filter((item, index, self) => {
      const firstIndex = self.findIndex(
        (other) => other.codigoMaquina === item.codigoMaquina
      );
      return firstIndex === index;
    });
    if (uniqueCodigo.length !== data.length) {
      setData(
        uniqueCodigo.map((item) => ({
          codigoMaquina: item.codigoMaquina,
          id: item.id,
          visible: true,
        }))
      );
    }
  }, [list]);

  function ChangeListVisible(idList: number) {
    const list = data.map((item, index) => ({
      ...item,
      visible: idList === index ? !item.visible : item.visible,
    }));
    setData(list);
  }

  useEffect(() => {
    const filter = data.filter(
      (item) =>
        item.codigoMaquina &&
        item.codigoMaquina.toLowerCase().startsWith(textFilter.toLowerCase())
    );
    setFilteredData(filter);
  }, [data, textFilter]);

  function CardFilterCodigo() {
    const [text, setText] = useState<string>("");

    return (
      <section onClick={(e) => e.stopPropagation()} className={style.container}>
        <div className={style.containerInput}>
          <div className={style.wrapContainer_input}>
            <input
              type="text"
              value={text}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setTextFilter(text);
                }
              }}
              onChange={(e) => setText(e.target.value)}
            />
            <label htmlFor="">FILTRO</label>
            <BiSearchAlt2 onClick={() => setTextFilter(text)} />
          </div>
        </div>
        <div className={style.list}>
          <ul>
            {data &&
              filteredData.map((item, index) => (
                <li key={index}>
                  <input
                    id={item.id}
                    type="checkbox"
                    checked={item.visible}
                    onChange={() => {
                      ChangeListVisible(index);
                    }}
                  />
                  <label htmlFor={item.id}>{item.codigoMaquina}</label>
                </li>
              ))}
          </ul>
        </div>
      </section>
    );
  }
  return {
    CardFilterCodigo,
    filteredData,
  };
}
