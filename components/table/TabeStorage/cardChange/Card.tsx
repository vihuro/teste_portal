import { useState } from "react"
import style from "./style.module.css";

const Card = ({
    toogle,
    changeToogle
}: {
    toogle: boolean,
    changeToogle: Function
}) => {

    return (
        <div className={style.cardBackground} >
            <div className={style.card} >
                <div className={style.title} >
                    <span>PRODUTO</span>
                </div>
                <div className={style.body} >
                    <div className={style.container_codigo} >
                        <input type="text" />
                        <label htmlFor="">CÓDIGO</label>
                    </div>
                    <div className={style.container_descricao}>
                        <input type="text" />
                        <label htmlFor="">DESCRIÇÃO</label>
                    </div>
                    <div className={style.container_unidade}>
                        <input type="text" />
                        <label htmlFor="">UND.</label>
                    </div>
                    <div className={style.container_quantidade}>
                        <input type="text" />
                        <label htmlFor="">QTD.</label>

                    </div>
                    <div className={style.container_tipoMaterial}>
                        <input type="text" />
                        <label htmlFor="">TIPO</label>

                    </div>
                    <div className={style.container_localEstocagem}>
                        <input type="text" />
                        <label htmlFor="">LOCAL</label>

                    </div>
                </div>
                <footer className={style.container_button} >
                    <button>
                        <span>SALVAR</span>
                    </button>
                    <button>
                        <span>CANCELAR</span>
                    </button>
                </footer>
            </div>
        </div>
    )
}

const toogleCard = () => {
    const [toogle, setToogle] = useState(true);

    return {
        toogle,
        setToogle
    }
}

export default function CardChange() {
    const { toogle, setToogle } = toogleCard();
    return {
        Card,
        toogle,
        setToogle

    }

}