import { useState } from "react";
import InputUi from "../../../UI/input/Input";
import styles from "./style.module.css";
import ButtonUi from "../../../UI/button/Button";


export default function Card({ changeToogle }: { changeToogle: Function }) {

    const { Button } = ButtonUi();

    const [textAondeSeraExecutado, setTextAondeSeraExecutado] = useState<string>("");
    const [textTipoServico, setTextTipoServico] = useState<string>("");
    const [textCategoriaServico, setTextCategoriaServico] = useState<string>("");

    const [textDescricaoServico, setTextDescricaoServico] = useState<string>("");


    const [toogleListAondeSeraExecutado, setToogleListAondeSeraExecutado] = useState<boolean>(false);
    const [toogleListTipoServico, setToogleListTipoServico] = useState<boolean>(false);
    const [toogleListCategoriaServico, setToogleListCategoriaServico] = useState<boolean>(false);

    const [caracteresRestante, setCaracteresRestante] = useState<string>("2.000");


    const handleDescricaoServico = (text: string) => {
        const quantidadeDisponivel = 2000 - text.length
        const valueDisponivel = quantidadeDisponivel.toLocaleString()
        setCaracteresRestante(valueDisponivel)

        setTextDescricaoServico(text)
    }

    const listAOndeSeraExecutado = [
        "ABASTECIMENTO",
        "ARQUEADORA 1",
        "ARQUEADORA 2",
        "ARQUEADORA 3",
        "ARQUEADORA 4",
        "ARQUEADORA 5",
        "FITILHO"
    ]
    const listTipoServico = [
        "ELÉTRICO",
        "MÊCANICO",
        "SERRALHERIA",
        "JARDINAGEM",
        "ALVENARIA"
    ]
    const listCategoriaServico = [
        "PREVENTIVA",
        "PREDITIVA",
        "CORRETIVA"
    ]



    return (
        <form className={styles.form} action="">
            <div className={styles.container} onClick={() => {
                setToogleListAondeSeraExecutado(false)
                setToogleListTipoServico(false)
                setToogleListCategoriaServico(false)
            }} >
                <header className={styles.title} >
                    <h3>NOVA OS</h3>
                </header>
                <main className={styles.body} >
                    <div className={styles.containerAondeSeraExecutado}
                        onClick={(e) => {
                            e.stopPropagation()
                            setToogleListAondeSeraExecutado(!toogleListAondeSeraExecutado)
                            setToogleListTipoServico(false)
                            setToogleListCategoriaServico(false)
                        }}>
                        <input id="txtAondeSeraExecutado"
                            value={textAondeSeraExecutado}
                            onChange={() => { }}
                            type="text"
                            required />
                        <label htmlFor="txtAondeSeraExecutado">
                            AONDE SERÁ EXECUTADO
                        </label>
                        <ul className={toogleListAondeSeraExecutado ?
                            styles.containerListAondeSeraExecutado :
                            styles.containerListAondeSeraExecutado_close} >
                            {listAOndeSeraExecutado.map((item, index) => (
                                <li onClick={() => setTextAondeSeraExecutado(item)} key={index} >{item}</li>
                            ))}
                        </ul>
                    </div>
                    <div className={styles.containerTipoDeServico}
                        onClick={(e) => {
                            e.stopPropagation()
                            setToogleListAondeSeraExecutado(false)
                            setToogleListTipoServico(!toogleListTipoServico)
                            setToogleListCategoriaServico(false)
                        }} >
                        <input id="txtTipoServico"
                            value={textTipoServico}
                            onChange={() => { }}
                            type="text"
                            required />
                        <label htmlFor="txtTipoServico">
                            TIPO DE SERVIÇO
                        </label>
                        <ul className={toogleListTipoServico ?
                            styles.containerListTipoServico :
                            styles.containerListTipoServico_close} >
                            {listTipoServico.map((item, index) => (
                                <li key={index} onClick={() => setTextTipoServico(item)} >{item}</li>
                            ))}
                            {/* <li>ELÉTRICO</li>
                            <li>MÊCANICO</li>
                            <li>SERRALHERIA</li>
                            <li>JARDINAGEM</li>
                            <li>ALVENARIA</li> */}
                        </ul>
                    </div>
                    <div className={styles.cotnainerCategoriaServico}
                        onClick={(e) => {
                            e.stopPropagation()
                            setToogleListAondeSeraExecutado(false)
                            setToogleListTipoServico(false)
                            setToogleListCategoriaServico(!toogleListCategoriaServico)
                        }}>
                        <input id="txtCategoriaServico"
                            value={textCategoriaServico}
                            onChange={() => { }}
                            type="text"
                            required />
                        <label htmlFor="txtCategoriaServico">
                            CATEGORIA DO SERVIÇO
                        </label>
                        <ul className={toogleListCategoriaServico ?
                            styles.containerListCategoriaServico :
                            styles.containerListCategoriaServico_close} >
                            {listCategoriaServico.map((item, index) => (
                                <li key={index} onClick={() => setTextCategoriaServico(item)}>{item}</li>
                            ))}
                            {/* <li>CORRETIVA</li>
                            <li>PREDITIVA</li>
                            <li>PREVENTIVA</li> */}

                        </ul>
                    </div>
                    <div className={styles.containerDataIdeal} >
                        <input type="date" required />
                        <label htmlFor="">
                            DATA/IDEAL
                        </label>
                    </div>
                    <div className={styles.containerDescricaoServico} >
                        <textarea cols={70} rows={1}
                            maxLength={2000}
                            value={textDescricaoServico}
                            onChange={(e) => handleDescricaoServico(e.target.value)}
                        />
                        <label htmlFor="">DECRIÇÃO DO SERVIÇO</label>
                    </div>
                    <div className={styles.containerCaracteres} >
                        <p>CARACTERES RESTANTES: {caracteresRestante}</p>
                    </div>
                </main>
                <footer className={styles.footer} >
                    <div className={styles.containerButtonCadatrar} >
                        <Button
                            classUi="glass"
                            color="green"
                            text="CADASTRAR"
                            type="button"
                        />
                    </div>
                    <div>
                        <Button
                            classUi="glass"
                            color="red"
                            text="FECHAR"
                            type="button"
                            onClick={() => changeToogle(false)}
                        />
                    </div>

                </footer>
            </div>
        </form>
    )
}