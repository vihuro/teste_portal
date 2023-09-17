import { Fragment, useEffect, useState } from "react";
import style from "./style.module.css";
import { BiFilter } from "react-icons/bi";

interface listProps {
    cnpj: string
}
interface listPropsVisible {
    cnpj: string,
    visible: boolean
}

export default function Card({ list }: { list: listProps[] }) {

    const [data, setData] = useState<listPropsVisible[]>([]);
    const [filterCNPJ, setFilterCNPJ] = useState<listPropsVisible[]>([]);

    const [valueCNPJ, setValueCNPJ] = useState<string>("");


    useEffect(() => {
        const uniqueIndex = list.filter((item, index, self) => {
            const firstIndex = self.findIndex(other => other.cnpj === item.cnpj);
            return firstIndex === index;
        })
        if (uniqueIndex.length !== data.length) {
            setData(uniqueIndex.map(item => ({
                cnpj: item.cnpj,
                visible: true
            })))
        }
    }, [list])
    useEffect(() => {
        const filter = data.filter((item) =>
            item.cnpj.startsWith(valueCNPJ)
        )
        setFilterCNPJ(filter);
    }, [data, valueCNPJ]);

    function ChangeList({ cnpj, visibility }: { cnpj: string, visibility: boolean }) {
        setData(data.map(item => ({
            ...item,
            visible: item.cnpj === cnpj ? visibility : item.visible
        })))

    }
    function refreshList(list: listProps[]) {
        const uniqueIndex = list.filter((item, index, self) => {
            const firstIndex = self.findIndex(other => other.cnpj === item.cnpj);
            return firstIndex === index;
        });
        setData(uniqueIndex.map(item => ({
            cnpj: item.cnpj,
            visible: true
        })))
    }
    function FormatedCNPJ(text: string) {
        return `${text.slice(0, 2)}
        .${text.slice(2, 5)}
        .${text.slice(5, 8)}
        /${text.slice(8, 12)}
        -${text.slice(12)}`
    }
    function FilteredCNPJText(text: string) {
        const filter = data.filter((item) => item.cnpj.startsWith(text))
        setData(filter);
    }
    function CardFilterCNPJ() {
        const [text, setText] = useState<string>("");

        const hangeChangeText = (text: string) => {
            let cnpj = text.replace(/[^\d./-]/g, '');
            switch (cnpj.length) {
                case 2:
                case 6:
                    cnpj += '.';
                    break;
                case 10:
                    cnpj += '/';
                    break;
                case 15:
                    cnpj += '-';
                    break;
            }
            setText(cnpj);
        }
        function ChangeCnpj() {
            const cnpj = text.replaceAll(".", "").replace("/", "").replace("-", "");
            setValueCNPJ(cnpj);
        }
        return (
            <ul className={style.list} >
                <section className={style.container_filter} >
                    <div className={style.wrap_container_filter} >
                        <input value={text}
                            onChange={e =>
                                hangeChangeText(e.target.value)} type="text"
                            onKeyDown={e => {
                                if (e.key === "Enter") {
                                    ChangeCnpj()
                                }
                            }}
                            maxLength={18}
                        />
                        <label htmlFor="">FILTRO</label>
                        <BiFilter
                            onClick={() => ChangeCnpj()}
                        />
                    </div>
                </section>
                <section className={style.container_body} >
                    {filterCNPJ && (
                        filterCNPJ.map((item, index) => (
                            <Fragment key={index} >
                                <li>
                                    <input type="checkbox"
                                        id={item.cnpj}
                                        checked={item.visible}
                                        onChange={e => {
                                            ChangeList({
                                                cnpj: item.cnpj,
                                                visibility: e.currentTarget.checked
                                            })
                                        }} />
                                    <label htmlFor={item.cnpj}>
                                        {FormatedCNPJ(item.cnpj)}
                                    </label>
                                </li>
                            </Fragment>
                        ))
                    )}
                </section>
            </ul>
        )
    }

    return {
        CardFilterCNPJ,
        data,
        filterCNPJ,
        refreshList
    }
}