import { useEffect, useState } from "react";
import InputUi from "../../../UI/input/Input";
import styles from "./style.module.css";
import ButtonUi from "../../../UI/button/Button";
import Api from "../../../../service/api/manutencao/Manutencao";
import { ILocation } from "../ILocationService";
import Message from "../../../message/Message";
import Loading from "../../../loading/Loading";
import InfoToken from "../../../utils/SearchInfoOfUserOnToken";


interface Props {
    changeToogle: Function,
    toogle: boolean,
    refreshTable: Function
}

export default function Card({ changeToogle, toogle, refreshTable }: Props) {

    const { Button } = ButtonUi();

    const [textAondeSeraExecutado, setTextAondeSeraExecutado] = useState<string | undefined>(undefined);
    const [textTipoServico, setTextTipoServico] = useState<string>("");
    const [textCategoriaServico, setTextCategoriaServico] = useState<string>("");
    const [textDescricaoServico, setTextDescricaoServico] = useState<string>("");
    const [textDateSugerida, setTextDateSugerida] = useState<string>("");
    const [textPrioridade, setTextPrioridade] = useState<string>("");

    const [toogleListAondeSeraExecutado, setToogleListAondeSeraExecutado] = useState<boolean>(false);
    const [toogleListTipoServico, setToogleListTipoServico] = useState<boolean>(false);
    const [toogleListCategoriaServico, setToogleListCategoriaServico] = useState<boolean>(false);
    const [toogleListPrioridade, setToogleListPrioridade] = useState<boolean>(false);

    const [caracteresRestante, setCaracteresRestante] = useState<string>("2.000");

    const [listExecucao, setListExecucao] = useState<ILocation[]>([]);

    const [toogleMessage, setToogleMessage] = useState<boolean>(false);
    const [toogleLoading, setToogleLoading] = useState<boolean>(false);
    const [infoMessage, setInfoMessage] = useState({
        message: "",
        type: "WARNING"
    })

    const handleDescricaoServico = (text: string) => {
        const quantidadeDisponivel = 2000 - text.length
        const valueDisponivel = quantidadeDisponivel.toLocaleString()
        setCaracteresRestante(valueDisponivel)

        setTextDescricaoServico(text)
    }



    useEffect(() => {
        if (toogle) {
            FetchDateLocation()
        }
    }, [toogle == true])

    async function FetchDateLocation() {
        await Api("location")
            .then(res => {
                setListExecucao(res.data);
            })
            .catch(err => console.log(err))
    }
    const CATEGORIA = [
        {
            index: 0,
            text: "ELÉTRICO"
        },
        {
            index: 1,
            text: "MECÂNICO"
        },
        {
            index: 2,
            text: "HIDRÁULICO"
        },
        {
            index: 3,
            text: "SERRALHERIA"
        },
        {
            index: 4,
            text: "JARDINAGEM"
        },
        {
            index: 5,
            text: "ALVENARIA"
        },
        {
            index: 6,
            text: "OUTRO"
        }
    ]

    const TIPO_SERVICO = [
        {
            index: 0,
            text: "CORRETIVA"
        },
        {
            index: 1,
            text: "PREVENTIVA"
        },
        {
            index: 2,
            text: "PREDITIVA"
        }
    ]
    const PRIORIDADE = [
        {
            index: 0,
            text: "BAIXO"
        },
        {
            index: 1,
            text: "MÉDIO"
        },
        {
            index: 2,
            text: "ALTO"
        }
    ]

    async function Cadastrar() {

        if (textAondeSeraExecutado === "" ||
            textCategoriaServico === "" ||
            textDescricaoServico === "" ||
            textTipoServico === "") {
            setInfoMessage(() => ({
                message: "CAMPO(S) OBRIGATÓRIO(S) VAZIO(S)!",
                type: "WARNING"
            }))
            setToogleMessage(current => !current);
            return;
        }
        setToogleLoading(current => !current);

        const locationMainteneace = listExecucao.find(item => item.name == textAondeSeraExecutado)
        const tipoServico = TIPO_SERVICO.find(item => item.text == textTipoServico);
        const categoriaServico = CATEGORIA.find(item => item.text == textCategoriaServico);
        const prioridade = PRIORIDADE.find(item => item.text == textPrioridade);


        const obj = {
            description: textDescricaoServico,
            locationMainteneaceId: locationMainteneace?.id,
            userCreatedId: InfoToken.tokenInfo.idUser,
            typeService: tipoServico?.index,
            priority: prioridade?.index,
            category: categoriaServico?.index,
            suggestdMainteneaceDate: new Date(textDateSugerida)
        }

        await Api.post("order-service", obj)
            .then(() => {
                UpdateAll();
            })
            .catch(err => console.log(err))

        setToogleLoading((current) => !current)

    }
    function UpdateAll() {
        setTextAondeSeraExecutado(() => "");
        setTextCategoriaServico(() => "");
        setTextDateSugerida(() => "")
        setTextDescricaoServico(() => "")
        setTextPrioridade(() => "");
        setTextTipoServico(() => "");
        refreshTable()
    }


    return (
        <form className={styles.form} action="">
            <div className={styles.container} onClick={() => {
                setToogleListAondeSeraExecutado(false)
                setToogleListTipoServico(false)
                setToogleListCategoriaServico(false)
            }} >
                <div className={toogleMessage ?
                    styles.container_message :
                    styles.container_message_close} >
                    <Message
                        stateMessage={toogleMessage}
                        action={setToogleMessage}
                        message={infoMessage.message}
                        type={infoMessage.type}
                    />
                </div>
                <div className={toogleLoading ?
                    styles.container_loading :
                    styles.container_loading_close} >
                    <Loading />
                </div>
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
                            {listExecucao.map((item, index) => (
                                <li onClick={() => setTextAondeSeraExecutado(item.name)} key={index} >{item.name}</li>
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
                            {TIPO_SERVICO.map((item, index) => (
                                <li key={index} onClick={() => setTextTipoServico(item.text)} >{item.text}</li>
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
                            {CATEGORIA.map((item, index) => (
                                <li key={index} onClick={() => setTextCategoriaServico(item.text)}>{item.text}</li>
                            ))}

                        </ul>
                    </div>
                    <div className={styles.containerDataIdeal} >
                        <input type="date" required
                            value={textDateSugerida}
                            onChange={(e) => setTextDateSugerida(e.target.value)} />
                        <label htmlFor="">
                            DATA/IDEAL
                        </label>
                    </div>
                    <div className={styles.containerPrioridade}
                        onClick={(e) => {
                            e.stopPropagation()
                            setToogleListAondeSeraExecutado(false)
                            setToogleListTipoServico(false)
                            setToogleListCategoriaServico(false)
                            setToogleListPrioridade(!toogleListPrioridade)
                        }} >
                        <input type="text" required value={textPrioridade} onChange={() => { }} />
                        <label htmlFor="">PRIORIDADE</label>
                        <ul className={toogleListPrioridade ?
                            styles.containerListPrioridade :
                            styles.containerListPrioridade_close} >
                            {PRIORIDADE.map((item, index) => (
                                <li onClick={() => setTextPrioridade(item.text)} key={index} >{item.text}</li>
                            ))}

                        </ul>
                    </div>
                    <div className={styles.containerDescricaoServico} >
                        <textarea rows={1}
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
                            onClick={() => Cadastrar()}
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