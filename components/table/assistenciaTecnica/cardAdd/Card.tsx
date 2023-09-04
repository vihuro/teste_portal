import style from "./style.module.css";
import { useState, useEffect } from "react"
import InputUi from "../../../UI/input/Input";
import RadioButton from "../../../UI/input/radio/RadioButton";


interface props {
    changeToogle: Function
}

export default function Card({ changeToogle }: props) {
    const { Input } = InputUi();
    const { Radio } = RadioButton();
    const [textPrioridade, setTextPrioridade] = useState<string>("");
    const [txtTecnico, setTxtTecnico] = useState<string>("");

    return (
        <form className={style.card} action="">
            <section className={style.title} >
                <h3>
                    Nova Ordem
                </h3>
            </section>
            <section className={style.body} >
                <div className={style.container_radio} >
                    <Radio color="red" id="orcado" text="Orçamento" />
                    <Radio color="green" id="orcado" text="Manutenção" />
                </div>
                <div className={style.container_input} >
                    <Input
                        id="txtDescricao"
                        text="Descrição do serviço"
                    />
                </div>
                <div className={style.container_numeroSerie} >
                    <Input id="txtNumeroSerie" text="Numero de Serie" />
                </div>
                <div className={style.container_codigoCliente} >
                    <Input id="txtCodigoCliente" text="Código do cliente" />
                </div>
                <div className={style.container_prioridade} >
                    <input value={textPrioridade} required onChange={() => { }} type="text" />
                    <ul>
                        <li onClick={() => setTextPrioridade("ALTA")} >ALTA</li>
                        <li onClick={() => setTextPrioridade("MÉDIA")} >MÉDIA</li>
                        <li onClick={() => setTextPrioridade("BAIXA")} >BAIXA</li>
                    </ul>
                </div>
                <div className={style.container_tecnico} >
                    <input value={txtTecnico} required onChange={() => { }} type="text" />
                    <ul>
                        <li onClick={() => setTxtTecnico("AUDEMY")} >AUDEMY</li>
                        <li onClick={() => setTxtTecnico("BRUNO")} >BRUNO</li>
                        <li onClick={() => setTxtTecnico("JOSÉ LUIZ")} >JOSÉ LUIZ</li>
                    </ul>
                </div>

            </section>
            <section className={style.footer} >
                <div>
                    <button style={{
                        padding: 10,
                        border: "none",
                        background: "#ededed",
                        borderRadius: 5,
                        fontWeight: 800

                    }} >
                        Cadastrar
                    </button>
                </div>
                <div>
                    <button onClick={() => changeToogle(false)} style={{
                        padding: 10,
                        border: "none",
                        background: "#ededed",
                        borderRadius: 5,
                        fontWeight: 800
                    }} >
                        Fechar
                    </button>
                </div>
            </section>
        </form>
    )
}