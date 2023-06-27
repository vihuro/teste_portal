"use client"

import { useState } from "react"
import style from "./style.module.css";

const CardStorage = () => {
    const [testeText, setTesteText] = useState("");
    const [textUnidade, setTextUnidade] = useState("");

    const [widgets, setWidget] = useState<string[]>([]);

    function handleOnDrag(e: React.DragEvent, widgetType: string) {
        e.dataTransfer?.setData("widgetType", widgetType);
    }

    function handleOnDrop(e: React.DragEvent) {
        const widgetType = e.dataTransfer.getData("widgetType") as string;
        setWidget([...widgets, widgetType])
    }
    function handleDragOver(e: React.DragEvent) {

        e.preventDefault();

    }

    const listUnidade = [
        {
            "unidade": "KG"
        },
        {
            "unidade": "ROL"
        },
        {
            "unidade": "MI"
        }
    ]

    return (
        <div className={style.cardAdd_background} >
            <div className={style.cardAdd} >
                <header className={style.title} >
                    <h1>NOVO PRODUTO</h1>
                </header>
                <section className={style.bodyCardAdd} >
                    <div className={style.column_codigo} >
                        <input value={testeText} onChange={(e) => setTesteText(e.target.value)} id="codigo" required />
                        <label htmlFor="codigo" >CÓDIGO</label>
                    </div>
                    <div className={style.column_description} >
                        <div className={style.description} >
                            <input id="descricao" required />
                            <label htmlFor="descricao" >DESCRIÇÃO</label>
                        </div>
                        <div className={style.unidade} >
                            <input id="unidade" value={textUnidade} autoComplete="off" onChange={() => { }} required />
                            <label htmlFor="unidade" >UNIDADE</label>
                            <div className={style.list} >
                                <ul>
                                    <li onClick={() => setTextUnidade("")} >Selecione...</li>
                                    {listUnidade.map((item: any, index: number) => {
                                        return (
                                            <li onClick={() => setTextUnidade(item.unidade)} key={index} >{item.unidade}</li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className={style.column_locale} >
                    </div>
                    <div className={style.column_type} >
                    </div>

                </section>

                <footer>
                </footer>
            </div>
        </div>
    )
}
const aquiVai = () => {
    const [texto, setTeso] = useState("teste");

    return texto;
}


export default function CardStorageTeste() {
    return {
        CardStorage,
        aquiVai
    }
}