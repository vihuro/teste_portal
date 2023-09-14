import { BiSearchAlt2 } from "react-icons/bi";
import InputUi from "../../../../UI/input/Input";
import style from "./style.module.css";
import ButtonUi from "../../../../UI/button/Button";

interface props {
    changeToogle: Function
}

export default function Card({ changeToogle }: props) {
    const { Input } = InputUi();
    const { Button } = ButtonUi();
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
                <div className={style.container_cep} >
                    <Input
                        id="txtCepChange"
                        text="CEP"
                        autoComplete="off"
                        iconRight={{
                            action: () => console.log("aqui"),
                            icon: BiSearchAlt2
                        }}
                    />
                </div>
                <div className={style.container_rua} >
                    <Input
                        id="txtRuaChange"
                        text="RUA"
                        blocked
                        autoComplete="off"
                    />
                </div>
                <div className={style.container_numeroEstabelecimento}>
                    <Input
                        id="txtNumeroEstabelecimentoChange"
                        text="Nº"
                        autoComplete="off"

                    />
                </div>
                <div className={style.container_cidade} >
                    <Input
                        id="txtCidadeChange"
                        text="CIDADE"
                        autoComplete="off"
                        blocked
                    />
                </div>
                <div className={style.container_bairro} >
                    <Input
                        id="txtBairroChange"
                        text="BAIRRO"
                        autoComplete="off"
                        blocked
                    />

                </div>
                <div className={style.container_estado} >
                    <Input
                        id="txtEstadoChange"
                        text="EST."
                        autoComplete="off"
                        blocked
                    />

                </div>
                <div className={style.container_complemento} >
                    <Input
                        id="txtComplementoChange"
                        text="COMPLEMENTO"
                        autoComplete="off"
                    />

                </div>
                <div className={style.container_nomeContato} >
                    <Input
                        id="txtContatoNomeChange"
                        text="NOME/CONT."
                        autoComplete="off"
                    />

                </div>
                <div className={style.container_telefoneContato} >
                    <Input
                        id="txtTelefoneContatoChange"
                        text="TEL/CONT."
                        autoComplete="off"
                        maxLength={11}
                    />
                </div>
            </main>
            <footer className={style.footer} >
                <div className={style.button_cadastrar} >
                    <Button
                        classUi="glass"
                        color="green"
                        text="CADASTRAR"
                        type="button"
                        onClick={() => { }}
                    />
                </div>
                <div className={style.button_fechar} >
                    <Button
                        classUi="glass"
                        color="red"
                        text="ALTERAR"
                        type="button"
                        onClick={() => changeToogle()}
                    />
                </div>

            </footer>
        </form>
    )
}