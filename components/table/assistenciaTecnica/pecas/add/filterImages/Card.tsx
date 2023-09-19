import { useState } from "react";
import style from "./style.module.css";
import Api from "../../../../../../service/api/assistenciaTecnica/Assistencia";
import Vizualizador from "./vizualizadorImage/VizualizadorImage";


interface props {
    changeToogle: Function,
    changeText: Function
}

interface dataProps {
    codigo: string,
    descricao: string
}

export default function FilterImagePeca({ changeToogle, changeText }: props) {

    const [textImage, setTextImage] = useState<string>("");
    const [toogleVizualizador, setToogleVizualizador] = useState<boolean>(false);

    const [data, setData] = useState<dataProps[]>([]);


    async function FetchData() {
        Api.get("image")
            .then(res => {
                const list: string[] = res.data.map((item: string) => item.split("-"))

                setData(list.map(item => ({
                    codigo: item[0],
                    descricao: item[1]
                })))
            })
            .catch(err => console.log(err))
    }

    function CardFilterImage() {
        return (
            <section className={style.container} >
                <div
                    onClick={() => setToogleVizualizador(false)}
                    className={toogleVizualizador ?
                        style.container_vizualizador :
                        style.container_vizualizador_close} >
                    <Vizualizador
                        changeToogle={setToogleVizualizador}
                        url={textImage}
                    />
                </div>
                <section className={style.container_table} >
                    <table className={style.table} >
                        <thead>
                            <tr>
                                <th>CÓDIGO</th>
                                <th>DESCRIÇÃO</th>
                                <th></th>
                                <th>+</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && (
                                data.map((item, index) => (
                                    <tr key={index} >
                                        <td>{item.codigo}</td>
                                        <td>{item.descricao}</td>
                                        <td onClick={() => {
                                            setToogleVizualizador(true)
                                            setTextImage(`${item.codigo}-${item.descricao}`)
                                        }} >
                                            VIZUALIZAR
                                        </td>
                                        <td onClick={() => changeText(`${item.codigo}-${item.descricao}`)} >
                                            +
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>

                    </table>
                </section>
                <section className={style.container_button} >
                    <button onClick={() => changeToogle(false)} >
                        FECHAR
                    </button>
                </section>
            </section>

        )
    }
    return {
        CardFilterImage,
        FetchData
    }

}