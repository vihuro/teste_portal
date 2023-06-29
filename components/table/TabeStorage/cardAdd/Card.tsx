"use client"
import { useState } from "react"
import style from "./style.module.css";

const CardStorage = ({
    toogle,
    changeToogle
}: {
    toogle: boolean,
    changeToogle: Function
}) => {
    const [testeText, setTesteText] = useState("");
    const [textUnidade, setTextUnidade] = useState("");



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
    const listTipo = [
        {
            "locale": "PET VIRGEM"
        },
        {
            "locale": "PET-2"
        }, {
            "locale": "PP VIRGEM"
        },
        {
            "locale": "PP-2"
        },
        {
            "locale": "STRETCH"
        },
        {
            "locale": "STRETCH ECO"
        },
        {
            "locale": "SHRINK"
        }
    ]


    return (
        <div className={style.cardAdd_background} >
            <div className={style.cardAdd} >
                <header className={style.title} >
                    <h1>NOVO PRODUTO</h1>
                </header>
                <section className={style.bodyCardAdd} >
                    <div className={style.select_locale} >
                        <fieldset>
                            <div className={style.titleBox} >
                                <label>
                                    LOCAL / ESTOQUE
                                </label>
                            </div>
                            <div className={style.todas}>
                                <input id="todos" name="local" type="radio" />
                                <label htmlFor="todos">Todas</label>

                            </div>
                            <div className={style.matriz}>
                                <input id="matriz" name="local" type="radio" />
                                <label htmlFor="matriz" >Matriz</label>
                            </div>
                            <div className={style.fabrica}>
                                <input id="fabrica" name="local" type="radio" />
                                <label htmlFor="fabrica" >Fabrica</label>
                            </div>

                        </fieldset>
                    </div>
                    <div className={style.column_codigo} >
                        <input autoComplete="off"
                            value={testeText}
                            onChange={(e) =>
                                setTesteText(e.target.value)}
                            id="codigo"
                            required
                        />
                        <label htmlFor="codigo" >CÓDIGO</label>
                    </div>
                    <div className={style.column_description} >
                        <input autoComplete="off" id="descricao" required />
                        <label htmlFor="descricao" >DESCRIÇÃO</label>
                    </div>
                    <div className={style.column_unidade} >
                        <div className={style.unidade} >
                            <input id="unidade"
                                value={textUnidade}
                                autoComplete="off"
                                onChange={() => { }}
                                required
                            />
                            <label htmlFor="unidade" >UNIDADE</label>
                            <div className={style.list} >
                                <ul>
                                    <li onClick={() => setTextUnidade("")} >Selecione...</li>
                                    {listUnidade.map((item: any, index: number) => {
                                        return (
                                            <li key={index}
                                                onClick={() => {
                                                    console.log(item.unidade),
                                                        setTextUnidade(item.unidade)
                                                }}
                                            >
                                                {item.unidade}
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className={style.column_type} >
                        <div className={style.type} >
                            <input autoComplete="off" id="type" required />
                            <label htmlFor="type">TIPO</label>
                            <div className={style.listTipo} >
                                <ul>
                                    <li>Selecione...</li>
                                    {listTipo.map((item: any, index: number) => (
                                        <li key={index} >{item.locale}</li>
                                    ))}

                                </ul>
                            </div>

                        </div>
                    </div>
                </section>
                <footer className={style.container_button} >
                    <div className={style.container_button_cadastrar}>
                        <div className={style.button} >
                            <button
                                className={style.button_cadastrar}
                                onClick={() => {}}
                            >
                                <span>
                                    CADASTRAR
                                </span>
                            </button>
                        </div>
                    </div>
                    <div className={style.container_button_cancelar}>
                        <div className={style.button} >
                            <button
                                className={style.button_cancelar}
                                onClick={() =>{ 

                                    changeToogle(false)
                                }}
                            >
                                <span>
                                    CANCELAR
                                </span>
                            </button>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    )
}

const toogleCard = () => {

    const [toogle, setToogle] = useState(false);

    return {
        toogle,
        setToogle
    };
}


export default function CardStorageTeste() {
    const { toogle, setToogle } = toogleCard();

    return {
        CardStorage,
        toogle,
        setToogle

    }
}