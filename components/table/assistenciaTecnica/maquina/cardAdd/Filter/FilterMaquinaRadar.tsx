import { useEffect, useState } from "react";
import styles from "./style.module.css";
import Api from "../../../../../../service/api/assistenciaTecnica/Assistencia";
import { IMaquinaRadarProps } from "../../IMaquinaFileRadar";
import { Icons } from "../../../../../utils/IconDefault";


interface Props {
    toogle: boolean,
    changeInfoMachine: Function,
    changeToogle: Function
}
interface TypeFilterProps {
    type: string,
    text: string
}


function Form({ toogle, changeInfoMachine, changeToogle }: Props) {
    const CODIGO = "codigo";
    const DESCRICAO = "descricao"


    const [data, setData] = useState<IMaquinaRadarProps[]>([]);
    const [toogleListFilterType, setToogleListFilterType] = useState<boolean>(false);
    const [textTypeFilter, setTextTypeFilter] = useState<TypeFilterProps>({
        text: "DESCRIÇÃO",
        type: DESCRICAO
    });
    const [toogleLoading, setToogleLoading] = useState<boolean>(true);
    const [textFilter, setTextFilter] = useState<string>("");

    useEffect(() => {
        if (toogle)
            FetchData()
    }, [toogle])

    async function FetchData() {
        await Api.get("/relatorio-radar/maquinas")
            .then(res => { setData(res.data.data), setToogleLoading((current) => current = false) })
            .catch(err => console.log(err))


    }



    const Filter: TypeFilterProps[] = [
        {
            type: CODIGO,
            text: "CÓDIGO"
        },
        {
            type: DESCRICAO,
            text: "DESCRIÇÃO"
        }
    ]

    const filterItem = data.filter((item) => textTypeFilter.type === CODIGO ?
        item.codigo.toLocaleUpperCase().includes(textFilter.toLocaleUpperCase()) :
        item.descricao.toLocaleUpperCase().includes(textFilter.toLocaleUpperCase()))


    return (
        <div className={styles.container} >
            <header className={styles.containerFilter} >
                <div className={styles.containerFilterListType} >
                    <input
                        placeholder="FILTRO"
                        type="text"
                        readOnly
                        value={textTypeFilter.text}
                        onClick={() => setToogleListFilterType((current) => !current)} />
                    <ul className={toogleListFilterType ?
                        styles.listType :
                        styles.listType_close} >
                        {Filter.map((item, index) => (
                            <li key={index}
                                onClick={() => {
                                    setTextTypeFilter((current) => current = item)
                                    setToogleListFilterType((current) => !current)
                                }}>{item.text}</li>
                        ))}
                    </ul>
                </div>
                <div className={styles.containerFilterInput} >
                    <input type="text"
                        value={textFilter}
                        onChange={(e) => setTextFilter((current) => current = e.target.value)} />

                </div>
            </header>
            <main className={styles.containerTable} >
                <table className={!toogleLoading ?
                    styles.table :
                    styles.table_loading} >
                    <thead className={styles.thead} >
                        <tr>
                            <th>CÓDIGO</th>
                            <th>DESCRIÇÃO</th>
                            <th>ADD.</th>
                        </tr>
                    </thead>
                    <tbody className={styles.tbody} >
                        {data && data.length > 0 && (
                            filterItem.map((item, index) => (
                                <tr key={index} >
                                    <td>{item.codigo}</td>
                                    <td>{item.descricao}</td>
                                    <td onClick={() => {
                                        changeInfoMachine(item)
                                        changeToogle((current: any) => !current)

                                    }}  ><Icons.Add /></td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </main>
            <footer>

            </footer>
        </div>
    )
}



export { Form }