import style from "./style.module.css";
import ButtonUi from "../../../../UI/button/Button";
import InputUi from "../../../../UI/input/Input";
import { useRef, useState } from "react";
import Api from "../../../../../service/api/assistenciaTecnica/Assistencia";
import { BiFilterAlt } from "react-icons/bi";


interface props {
    changeToogleCard: Function,
    refreshTable: Function
}

export default function Card({ changeToogleCard, refreshTable }: props) {
    const { Button } = ButtonUi();
    const { Input } = InputUi();
    const [valueCnpj, setValueCnpj] = useState<string>("");
    const [novoCliente, setNovoCliente] = useState({
        nome: "",
        codigoRadar: "",
        cnpj: "",
        endereco: "",
        nomeContatoCliente: "",
        contatoTelefone: ""
    })
    const videoRef = useRef(null);


    function handleCnpj(text: HTMLInputElement) {
        let cnpj = text.value.replace(/[^\d./-]/g, '');
        switch (cnpj.length) {
            case 2:
            case 6:
                cnpj += '.';
                break;
            case 10:
                cnpj += '/';
                break;
            case 15:
                cnpj += '-';
                break;
        }
        setValueCnpj(cnpj)

    }
    async function Cadastrar() {
        const { cnpj, codigoRadar, contatoTelefone, endereco, nome, nomeContatoCliente } = novoCliente;

        if (valueCnpj === "" || codigoRadar === "" ||
            contatoTelefone === "" || endereco === "" ||
            nome === "" || nomeContatoCliente === "") {
            console.log("Campo(s) obrigatório(s) vazio(s)!");
            return;
        }
        const obj = {
            codigoRadar: codigoRadar,
            contatoTelefone: contatoTelefone,
            endereco: endereco,
            nome: nome,
            nomeContatoCliente: nomeContatoCliente,
            cnpj: valueCnpj.replaceAll(".", "").replace("/", "").replace("-", ""),
            userId:"2cb75138-9232-454e-8784-d777e50f7547"
        }
        setNovoCliente({
            ...novoCliente,
            cnpj: valueCnpj
        })
        await Api.post("/cliente", obj)
            .then(res => res.data)
            .catch(err => console.log(err))
            .finally(() => {
                refreshTable()
                ClearAll()
            })
    }
    function ClearAll() {
        setNovoCliente({
            ...novoCliente,
            cnpj: "",
            codigoRadar: "",
            contatoTelefone: "",
            endereco: "",
            nome: "",
            nomeContatoCliente: "",
        })
        setValueCnpj("");
    }


    return (
        <form className={style.card} action="">
            <header className={style.container_title} >
                <h3>NOVO CLIENTE</h3>
            </header>
            <main className={style.container_body} >
                <div className={style.container_codigoRadar} >
                    <Input
                        id="txtCodigoRadar"
                        text="CÓDIGO RADAR"
                        autoComplete="off"
                        maxLength={20}
                        value={novoCliente.codigoRadar}
                        onChange={e => setNovoCliente({
                            ...novoCliente,
                            codigoRadar: e.target.value
                        })}
                    />
                </div>
                <div className={style.container_cnpj} >
                    <Input
                        id="txtCnpj"
                        text="CNPJ"
                        autoComplete="off"
                        maxLength={18}
                        value={valueCnpj}
                        onChange={e => handleCnpj(e.target)}
                    />
                </div>
                <div className={style.container_nomeCliente} >
                    <Input
                        id="txtNomeCliente"
                        text="NOME CLIENTE"
                        autoComplete="off"
                        maxLength={50}
                        value={novoCliente.nome}
                        onChange={e => setNovoCliente({
                            ...novoCliente,
                            nome: e.target.value
                        })}
                    />
                </div>
                <div className={style.container_endereco} >
                    <Input
                        id="txtEndereco"
                        text="ENDEREÇO"
                        autoComplete="off"
                        maxLength={150}
                        value={novoCliente.endereco}
                        onChange={e => setNovoCliente({
                            ...novoCliente,
                            endereco: e.target.value
                        })}
                    />
                </div>
                <div className={style.container_nomeContato} >
                    <Input
                        id="txtContantoNome"
                        text="CONT/CLIEN."
                        autoComplete="off"
                        maxLength={150}
                        value={novoCliente.nomeContatoCliente}
                        onChange={e => setNovoCliente({
                            ...novoCliente,
                            nomeContatoCliente: e.target.value
                        })}
                    />
                </div>
                <div className={style.container_telefoneContato} >
                    <Input
                        id="txtTelefoneContato"
                        text="TEL/CONT."
                        autoComplete="off"
                        maxLength={11}
                        value={novoCliente.contatoTelefone}
                        onChange={e => setNovoCliente({
                            ...novoCliente,
                            contatoTelefone: e.target.value
                        })}
                    />
                </div>
                <div className={style.container_filterMaquinas} >
                    <section className={style.container_table} >
                        <table className={style.table} >
                            <thead>
                                <tr>
                                    <th>CÓD/MAQ</th>
                                    <th>DESCRIÇÃO</th>
                                    <th>Nº SÉRIE</th>
                                </tr>
                            </thead>
                            <tbody className={style.table_body} >
                                <tr>
                                    <td>teste</td>
                                    <td>testeee</td>
                                    <td>testetete</td>
                                </tr>
                                <tr>
                                    <td>teste</td>
                                    <td>testeee</td>
                                    <td>testetetedmssmdldksljdkljsdk</td>
                                </tr>
                                <tr>
                                    <td>teste</td>
                                    <td>testeee</td>
                                    <td>testetete</td>
                                </tr>
                                <tr>
                                    <td>teste</td>
                                    <td>testeee</td>
                                    <td>testetete</td>
                                </tr>
                                <tr>
                                    <td>teste</td>
                                    <td>testeee</td>
                                    <td>testetete</td>
                                </tr>
                                <tr>
                                    <td>teste</td>
                                    <td>testeee</td>
                                    <td>testetete</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>
                    <section>

                        <Button
                            classUi="default"
                            color="blue"
                            icon={BiFilterAlt}
                        />
                    </section>
                </div>
            </main>
            <footer className={style.footer} >
                <div className={style.button_cadastrar} >
                    <Button
                        classUi="glass"
                        color="green"
                        text="CADASTRAR"
                        type="button"
                        onClick={() => Cadastrar()}
                    />
                </div>
                <div className={style.button_fechar} >
                    <Button
                        classUi="glass"
                        color="red"
                        text="FECHAR"
                        type="button"
                        onClick={() => changeToogleCard(false)}
                    />
                </div>

            </footer>
        </form>
    )
}