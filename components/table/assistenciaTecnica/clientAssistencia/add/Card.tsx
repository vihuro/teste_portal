import style from "./style.module.css";
import ButtonUi from "../../../../UI/button/Button";
import InputUi from "../../../../UI/input/Input";
import FilterMaquinaDisponivel from "../filterMaquinaDisponivel/Card";
import { useRef, useState } from "react";
import Api from "../../../../../service/api/assistenciaTecnica/Assistencia";
import { BiFilterAlt, BiSearchAlt2 } from "react-icons/bi";
import Message from "../../../../message/Message";
import { AiOutlineDelete } from "react-icons/ai";


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
        cep: "",
        estado: "",
        cidade: "",
        regiao: "",
        rua: "",
        numeroEstabelecimento: "",
        complemento: "",
        nomeContatoCliente: "",
        contatoTelefone: ""
    })
    const [listIdMaquinas, setListIdMaquinas] = useState<string[]>([]);
    const [textCep, setTextCep] = useState<string>("");
    const videoRef = useRef(null);
    const [toogleMessage, setToogleMessage] = useState<boolean>(false);
    const [toogleLoading, setToogleLoading] = useState<boolean>(false);
    const [dataMessage, setDataMessage] = useState({
        message: "",
        type: "WARNING"
    });
    const [thisListMaquinaId, setThisListMaquinaId] = useState<string[]>([])
    const [toogleFilterMaquina, setToogleFilterMaquina] = useState<boolean>(false);

    const { CardFilterMaquinaDisponivel,
        listMaquina,
        setListMaquina,
        FetchData: FetchDataMaquina } = FilterMaquinaDisponivel({
            changeToogle: setToogleFilterMaquina
        });

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
        const { cnpj,
            codigoRadar,
            contatoTelefone,
            cep,
            cidade,
            complemento,
            estado,
            numeroEstabelecimento,
            rua,
            nome,
            nomeContatoCliente,
            regiao,
        } = novoCliente;


        if (valueCnpj === "" || codigoRadar === "" ||
            contatoTelefone === "" || cep === "" ||
            cidade === "" || estado === "" || numeroEstabelecimento === "" ||
            rua === "" ||
            nome === "" || nomeContatoCliente === "") {
            setDataMessage({
                message: "Campo(s) obrigatório(s) vazio(s)!",
                type: "WARNING"
            })
            setToogleMessage(true);

            return;
        }

        const obj = {
            codigoRadar: codigoRadar,
            contatoTelefone: contatoTelefone,
            cep: cep,
            estado: estado,
            cidade: cidade,
            rua: rua,
            regiao: regiao,
            numeroEstabelecimento: numeroEstabelecimento,
            complemento: complemento,
            nome: nome,
            nomeContatoCliente: nomeContatoCliente,
            cnpj: valueCnpj.replaceAll(".", "").replace("/", "").replace("-", ""),
            userId: "2cb75138-9232-454e-8784-d777e50f7547",
            maquinas: listMaquina.map(item => ({
                maquinaId: item.id
            }))
        }

        setNovoCliente({
            ...novoCliente,
            cnpj: valueCnpj
        })
        await Api.post("/cliente", obj)
            .then(res => {
                setDataMessage({
                    message: "Cliente Cadastrado!",
                    type: "SUCESS"
                })
                ClearAll()
                refreshTable()
            })
            .catch(err => {
                console.log(err)
                if (err.response && (err.response.data)) {
                    setDataMessage({
                        message: err.response.data,
                        type: "WARNING"
                    })
                    console.log(err)
                }
                else {
                    setDataMessage({
                        message: "ERRO NO SERVIDOR!",
                        type: "ERROR"
                    })
                }
            })
            .finally(() => {
                setToogleMessage(true)
            })
    }
    function ClearAll() {
        setNovoCliente({
            ...novoCliente,
            cnpj: "",
            codigoRadar: "",
            contatoTelefone: "",
            cep: "",
            cidade: "",
            regiao: "",
            complemento: "",
            estado: "",
            numeroEstabelecimento: "",
            rua: "",
            nome: "",
            nomeContatoCliente: "",
        })
        setTextCep("");
        setValueCnpj("");
    }
    async function SearchCEP() {
        const cep = parseInt(textCep)
        console.log(cep)
        const response = await Api.get(`/cep/${cep}`)
            .then(res => res)
            .catch(res => res)

        if (response.status === 200) {
            setNovoCliente({
                ...novoCliente,
                cidade: response.data.cidade,
                estado: response.data.estado,
                rua: response.data.rua,
                cep: response.data.cep,
                regiao: response.data.regiao
            })
        }
    }

    function changeList(idMaquina: string) {
        const list = listMaquina.filter(item => item.id !== idMaquina);

        setListMaquina(list);
    }

    return (
        <form className={style.card} action="">
            <div className={toogleMessage ?
                style.container_message :
                style.container_message_close} >
                <Message
                    stateMessage={toogleMessage}
                    action={setToogleMessage}
                    message={dataMessage.message}
                    type={dataMessage.type}
                />
            </div>
            <div className={toogleFilterMaquina ?
                style.container_filterMaquina :
                style.container_filterMaquina_close} >
                <CardFilterMaquinaDisponivel />
            </div>
            <div>

            </div>
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
                <div className={style.container_cep} >
                    <Input
                        id="txtCEP"
                        text="CEP"
                        autoComplete="off"
                        iconRight={{
                            icon: BiSearchAlt2,
                            action: () => SearchCEP(),
                        }}
                        maxLength={150}
                        value={textCep}
                        onChange={(e) => setTextCep(e.target.value)}
                    // onChange={e => setNovoCliente({
                    //     ...novoCliente,
                    //     endereco: e.target.value
                    // })}
                    />
                </div>
                <div className={style.container_rua} >
                    <Input
                        id="txtRua"
                        text="RUA"
                        blocked
                        autoComplete="off"
                        value={novoCliente.rua}
                        onChange={() => { }}
                    />
                </div>
                <div className={style.container_numeroEstabelecimento} >
                    <Input
                        id="txtNumeroEstabelecimento"
                        text="Nº"
                        autoComplete="off"
                        value={novoCliente.numeroEstabelecimento}
                        onChange={(e) => setNovoCliente({
                            ...novoCliente,
                            numeroEstabelecimento: e.target.value
                        })}
                    />
                </div>
                <div className={style.container_cidade} >
                    <Input
                        id="txtCidade"
                        text="CIDADE"
                        autoComplete="off"
                        blocked
                        value={novoCliente.cidade}
                        onChange={() => { }}
                    />
                </div>
                <div className={style.container_estado} >
                    <Input
                        id="txtEstado"
                        text="EST."
                        autoComplete="off"
                        blocked
                        value={novoCliente.estado}
                        onChange={() => { }}
                    />
                </div>
                <div className={style.container_bairro} >
                    <Input
                        id="txtBairro"
                        text="BAIRRO"
                        autoComplete="off"
                        value={novoCliente.regiao}
                        blocked
                        onChange={() => { }}
                    />
                </div>
                <div className={style.container_complemento} >
                    <Input
                        id="txtComplemento"
                        text="COMPLEMENTO"
                        autoComplete="off"
                        value={novoCliente.complemento}
                        onChange={(e) => setNovoCliente({
                            ...novoCliente,
                            complemento: e.target.value
                        })}
                    />
                </div>

                <div className={style.container_nomeContato} >
                    <Input
                        id="txtContantoNome"
                        text="NOME/CONT."
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
                                    <th>
                                        CÓD/MAQ

                                    </th>
                                    <th>DESCRIÇÃO</th>
                                    <th>Nº SÉRIE</th>
                                    <th>DEL.</th>
                                </tr>
                            </thead>
                            <tbody className={style.table_body} >
                                {listMaquina && (
                                    listMaquina.map((item, index) => (
                                        <tr key={index} >
                                            <td>{item.codigo}</td>
                                            <td>{item.tipoMaquina}</td>
                                            <td>{item.numeroSerie}</td>
                                            <td onClick={() => changeList(item.id)} >
                                                <AiOutlineDelete />
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </section>
                    <section>

                        <Button
                            classUi="default"
                            color="blue"
                            icon={BiFilterAlt}
                            type="button"
                            onClick={() => {
                                FetchDataMaquina()
                                setToogleFilterMaquina(true)
                            }}
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