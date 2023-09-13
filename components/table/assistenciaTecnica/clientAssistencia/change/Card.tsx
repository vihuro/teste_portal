import InputUi from "../../../../UI/input/Input";
import style from "./style.module.css";

export default function Card() {
    const { Input } = InputUi();
    return (
        <form className={style.card} action="">
            <header className={style.container_title} >
                <h3>CLIENTE</h3>
            </header>
            <main className={style.container_body} >
                <div className={style.container_codigoRadar} >
                    <Input
                        id="txtCodigoRadarChange"
                        text="CÓDIGO RADAR"
                        autoComplete="off"
                    />
                </div>
                <div className={style.container_cnpj}>
                    <Input
                        id="txtCnpjChange"
                        text="CNPJ"
                        autoComplete="off"
                    />
                </div>
                <div className={style.container_nomeCliente} >
                    <Input
                        id="txtNomeClienteChange"
                        text="NOME CLIENTE"
                        autoComplete="off"
                    />

                </div>
                <div className={style.container_endereco} >
                    <Input
                        id="txtEnderecoChange"
                        text="ENDEREÇO"
                        autoComplete="off"
                    />

                </div>
            </main>
            <footer></footer>
        </form>
    )
}