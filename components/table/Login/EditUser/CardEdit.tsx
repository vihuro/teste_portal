import ButtonUi from "../../../button/Button";
import style from "./style.module.css";

function Card({ toogle, changeToogle }:
    { toogle: boolean, changeToogle: Function }) {

    const { Button } = ButtonUi();

    return (
        <form className={style.card} >
            <header className={style.header} >
                <h3>Editar usuário</h3>
            </header>
            <main className={style.body} >

            </main>
            <footer className={style.footer} >
                <div className={style.container_cadastrar} >
                    <Button
                        color="green"
                        classUi="glass"
                        text="Salvar"
                        type="button"
                    />
                </div>
                <div className={style.container_fechar} >
                    <Button
                        color="red"
                        classUi="glass"
                        text="Salvar"
                        type="button"
                    />
                </div>

            </footer>
        </form>
    )
}

export default function CardEdit() {
    return {
        Card
    }
}