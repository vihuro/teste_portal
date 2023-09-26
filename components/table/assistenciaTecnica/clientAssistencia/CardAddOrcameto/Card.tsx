import { useState } from "react";
import ButtonUi from "../../../../UI/button/Button";
import InputUi from "../../../../UI/input/Input";
import style from "./style.module.css";
import Message from "../../../../message/Message";
import Loading from "../../../../loading/Loading";
import Api from "../../../../../service/api/assistenciaTecnica/Assistencia";

interface props {
    changeToogle: Function,
    cliente?: dataProps
}

interface dataProps {
    idCliente: string,
    cnpj: string,
    codigoRadar: string,
    contatoTelefone: string,
    contatoNome: string,
    nome: string,
    cadastro: userProps,
    alteracao: userProps,
    maquinaCliente: maquinaClienteProps[],
    cep: string,
    estado: string,
    cidade: string,
    regiao: string,
    rua: string,
    complemento: string,
    numeroEstabelecimento: string,
}

interface userProps {
    usuarioId: string,
    nome: string,
    apelido: string,
    dataHora: Date
}
interface maquinaClienteProps {
    maquinaId: string,
    codigoMaquina: string,
    numeroSerie: string,
    tipoMaquina: string,
    status: string
}

export default function Card({ changeToogle, cliente }: props) {
    const { Input } = InputUi();
    const { Button } = ButtonUi();

    const [toogleLoading, setToogleLoading] = useState<boolean>(false);
    const [toogleMessage, setToogleMessage] = useState<boolean>(false);
    const [dataMessage, setDataMessage] = useState({
        message: "",
        type: "WARNING"
    })
    const [toogleListTecnico, setToogleListTecnico] = useState<boolean>(false);
    const [descricaoServico, setDescricaoServico] = useState<string>("");
    console.log(cliente)

    async function InsertOrcamento() {
        const obj = {
            descricaoServico: descricaoServico,
            userId: "96afb069-c572-4302-b631-8b6b16c825e7",
            MaquinaId: cliente?.maquinaCliente[0].maquinaId
        }
        await Api.post("/orcamento", obj)
            .then(res => {
                setDataMessage({
                    message: "Orçamento cadastrado com sucesso!",
                    type: "SUCESS"
                })
            })
            .catch(err => {
                if (err && (err.response) && (err.response.data)) {
                    setDataMessage({
                        message: err.response.data,
                        type: "WARNING"
                    })
                } else {
                    setDataMessage({
                        message: "ERRO NO SERVIDOR",
                        type: "ERROR"
                    })
                }
            })
            .finally(() => {
                setToogleLoading(false)
                setToogleMessage(true);
            })
    }

    return (
        <form className={style.card} onClick={() => {
            setToogleListTecnico(false)
        }} >
            <div className={toogleMessage ?
                style.container_message :
                style.container_message_close} >
                <Message
                    stateMessage={toogleMessage}
                    message={dataMessage.message}
                    action={setToogleMessage}
                    type={dataMessage.type}
                />
            </div>
            <div className={toogleLoading ?
                style.container_loading :
                style.container_loading_close} >
                <Loading />
            </div>
            <header className={style.container_title} >
                <h3>CRIAR ORÇAMENTO</h3>
            </header>
            <main className={style.container_body} >
                <div className={style.container_NomeCliente} >
                    <Input
                        id="txtClienteOrcamento"
                        text="CLIENTE"
                        value={cliente?.nome}
                        blocked
                    />
                </div>
                <div className={style.container_numeroSerie} >
                    <Input
                        id="txtMaquinaOrcamento2"
                        text="Nº SÉRIE"
                        value={cliente?.maquinaCliente[0].numeroSerie}
                        blocked
                    />
                </div>
                <div className={style.container_codigoMaquina} >
                    <Input
                        id="txtCodigoMaquinaOrcamento"
                        text="CÓD. MAQ"
                        value={cliente?.maquinaCliente[0].codigoMaquina}
                        blocked
                    />
                </div>
                <div className={style.container_descricaoMaquina}>
                    <Input
                        id="txtMaquinaOrcamento"
                        text="MÁQUINA"
                        value={cliente?.maquinaCliente[0].tipoMaquina}
                        blocked
                    />
                </div>
                <div className={style.container_descricaoServico} >
                    <Input
                        id="txtDescricaoOrcamento"
                        text="DESCRIÇÃO"
                        value={descricaoServico}
                        onChange={(e) => setDescricaoServico(e.target.value)}
                    />
                </div>
                <div className={style.container_tecnico} onClick={(e) => e.stopPropagation()} >
                    <div className={style.wrap_containerTecnico} >
                        <input onClick={() => setToogleListTecnico(!toogleListTecnico)} type="text" />
                        <label htmlFor="">TÉCNICO</label>
                        <ul className={toogleListTecnico ?
                            style.listTecnico :
                            style.listTecnico_close} >
                            <li>VITOR HUGO</li>
                            <li>NIETTO</li>
                            <li>VITOR HUGO</li>
                            <li>NIETTO</li>
                        </ul>
                    </div>
                </div>
            </main>
            <footer className={style.footer} >
                <div>
                    <Button
                        classUi="glass"
                        color="green"
                        text="ABRIR ORÇAMENTO"
                        type="button"
                        onClick={() => {
                            setToogleLoading(true),
                                InsertOrcamento()
                        }}
                    />
                </div>
                <div>
                    <Button
                        classUi="glass"
                        color="red"
                        text="FECHAR"
                        onClick={() => changeToogle(false)}
                        type="button"
                    />
                </div>
            </footer>
        </form>
    )
}