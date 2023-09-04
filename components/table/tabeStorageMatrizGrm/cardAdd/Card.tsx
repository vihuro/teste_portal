"use client"
import { useEffect, useState } from "react"
import style from "./style.module.css";
import Api from "../../../../service/api/matriz/estoque-grm";
import Message from "../../../message/Message";
import Loading from "../../../loading/Loading";
import TokenDrecriptor from "../../../../service/DecriptorToken";
import { parseCookies } from "nookies";
import ButtonUi from "../../../UI/button/Button";

interface props {
    changeToogle: Function,
    refreshTable: Function,
    searchColor: Function
}

const CardStorage = ({ changeToogle, refreshTable, searchColor }: props) => {

    const [textUnidade, setTextUnidade] = useState("");
    const [textTipo, setTextTipo] = useState("");
    const [toogleMessage, setToogleMessage] = useState<boolean>(false);
    const [toogleLoading, setToogleLoading] = useState<boolean>(false);

    const [dataTipo, setDataTipo] = useState<TipoPros[]>([]);
    const [checboxLocal, setCheckboxLocal] = useState<ListCheckBoxProps[]>([]);

    const tokenInfo = TokenDrecriptor(parseCookies().ACCESS_TOKEN)


    interface LocalProps {
        alteraca: {
            apelido: string,
            dataHora: Date,
            id: string,
            nome: string
        },
        ativo: boolean,
        cadastro: {
            apelido: string,
            dataHora: Date,
            id: string,
            nome: string
        },
        id: string,
        local: string

    }
    interface ListCheckBoxProps {
        local: string,
        id: string,
        active: boolean
    }

    interface TipoPros {
        id: string,
        tipo: string,
        cadastro: {
            id: string,
            nome: string,
            apelido: string,
            dataHora: Date
        },
        alteracao: {
            id: string,
            nome: string,
            apelido: string,
            dataHora: Date
        }

    }


    const listUnidade = [
        {
            "unidade": "KG"
        },
        {
            "unidade": "ROL"
        },
        {
            "unidade": "MI"
        }
    ]

    async function FechTipo() {
        await Api.get("/tipo-material")
            .then(res => setDataTipo(res.data))
            .catch(err => {
                setMessage({
                    message: "Erro ao buscar tipos",
                    type: "ERROR"
                })
                setToogleMessage(true)
            })

    }
    async function FechLocal() {

        await Api.get("/local")
            .then(res => {
                if (res.data.data.length > 0) {
                    const localData: LocalProps[] = res.data.data;
                    setCheckboxLocal(localData.map(item => ({
                        active: false,
                        id: item.id,
                        local: item.local
                    })));
                }
            })
            .catch(err => console.log(err));

        // try {
        //     const response = await Api.get("/local");
        //     const localData: LocalProps[] = response.data.data;
        //     if (localData.length > 0) {


        //     }
        // } catch (error) {
        //     console.log(error);
        // }

    }


    interface propsColor {
        background: string,
        color: string
    }

    const colorsLocal: Record<string, propsColor> = {
        "MATRIZ-GRM": {
            background: "#B40000",
            color: "white"
        },
        "FABRICA-GRM": {
            background: "#5D60E9",
            color: "white"
        }
    }
    function getColorLocal(text: string) {
        const color = colorsLocal[text];
        return {
            background: color ? color.background : "",
            color: color ? color.color : ""
        }
    }
    const [valueDooble, setValueDooble] = useState(0);
    const [value, setValue] = useState("");
    const [message, setMessage] = useState({
        message: "ERRO INESPERADO!",
        type: "WARNING",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {

        const text = e.target.value;

        const string = text.replaceAll(".", "").replace(",", ".");

        const dooble = parseFloat(string)
        const stringInput = dooble.toLocaleString("pt-Br", {
            style: "decimal",
            maximumFractionDigits: 2
        })


        const caracteres = e.target.value.length;
        const lastCharacter = e.target.value.charAt(caracteres - 1);


        const testeInStringInput = lastCharacter === "," ? stringInput + "," : stringInput

        setValueDooble(valueDooble);

        setValue(testeInStringInput)

    };
    const [materialEstoque, setMaterialEstoque] = useState({
        codigo: "",
        descricao: "",
        tipoMaterialId: "",
        unidade: "",
        substitutos: [],
        localEstoqueId: "",
        quantidade: 0,
        usuarioId: ""

    })

    async function Verify() {
        setToogleLoading(true)
        if (materialEstoque.codigo === "" ||
            materialEstoque.descricao === "" ||
            materialEstoque.unidade === "" ||
            materialEstoque.tipoMaterialId === "" ||
            value === "") {
            setMessage({
                message: "Campo(s) obrigatório(s) vazio(s)!",
                type: "WARNING"
            })
            setToogleLoading(false);
            setToogleMessage(true)
            return;
        }

        await Cadastrar();

    }

    async function Cadastrar() {

        const promises = checboxLocal
            .filter(item => item.active)
            .map(valueCheckBox => {
                const formattedValue = value.replaceAll(".", "").replace(",", ".")
                return Api.post("", {
                    ...materialEstoque,
                    usuarioId: tokenInfo.idUser,
                    localEstoqueId: valueCheckBox.id,
                    quantidade: parseFloat(formattedValue)
                });
            });
        if (promises.length === 0) {
            setMessage({
                message: "Selecione pelo menos um local de estocagem!",
                type: "WARNING"
            });
            setToogleLoading(false);
            setToogleMessage(true);
        } else {

            Promise.all(promises)
                .then(res => {
                    setMessage({
                        message: "Item(ns) cadastrado(s) com sucesso!",
                        type: "SUCESS"
                    })
                    clearAll();

                })
                .catch(err => {
                    if (err.response.data) {
                        setMessage({
                            message: err.response.data,
                            type: "WARNING"
                        })
                    } else {
                        console.log(err)
                        setMessage({
                            message: "Erro no servidor!",
                            type: "ERROR"
                        });
                    }
                })
                .finally(() => {
                    setToogleLoading(false);
                    setToogleMessage(true);
                    refreshTable()
                    console.log("dentro do card")
                })

        }



    }

    function clearAll() {
        setMaterialEstoque({
            ...materialEstoque,
            codigo: "",
            descricao: "",
            tipoMaterialId: "",
            unidade: "",
            quantidade: 0,
            localEstoqueId: "",
            substitutos: []
        })
        setCheckboxLocal(checboxLocal.map(item => ({
            ...item,
            active: false
        })))
        setTextTipo("");
        setTextUnidade("");
        setValue("");
    }

    useEffect(() => {
        FechTipo();
        FechLocal();
    }, [])
    const { Button } = ButtonUi();

    return (
        <div className={style.cardAdd_background} >
            <div className={style.cardAdd} >
                <div className={toogleMessage ? style.card_message : style.card_message_close} >
                    <Message message={message.message}
                        type={message.type}
                        stateMessage={toogleMessage}
                        action={(e) => setToogleMessage(e)}
                    />
                </div>
                <div className={toogleLoading ? style.loading : style.loading_close} >
                    <Loading />
                </div>
                <header className={style.title} >
                    <h1>NOVO PRODUTO</h1>
                </header>
                <section className={style.bodyCardAdd} >
                    <div className={style.select_locale} >
                        <label className={style.title_local} >
                            LOCAL / ESTOQUE
                        </label>
                        <div className={style.wrap_body_local} >
                            {checboxLocal && checboxLocal.length > 0 ? (
                                checboxLocal.map((item, index: number) => (
                                    <div key={index}>
                                        <input
                                            id={item.id}
                                            type="checkbox"
                                            checked={item.active}
                                            onChange={(e) =>
                                                setCheckboxLocal(checboxLocal.map(item => ({
                                                    ...item,
                                                    active: item.id === e.currentTarget.id ? e.target.checked : item.active
                                                })))
                                            }
                                        />
                                        <label style={searchColor(item.local)} htmlFor={item.id}>{item.local}</label>
                                    </div>
                                ))
                            ) : (<div>Carregando...</div>)}
                        </div>
                    </div>
                    <div className={style.column_codigo} >
                        <input autoComplete="off"
                            value={materialEstoque.codigo}
                            onChange={e => setMaterialEstoque({
                                ...materialEstoque,
                                codigo: e.target.value
                            })}
                            id="codigo"
                            required
                        />
                        <label htmlFor="codigo" >CÓDIGO</label>
                    </div>
                    <div className={style.column_description} >
                        <input autoComplete="off"
                            id="descricao"
                            required
                            value={materialEstoque.descricao}
                            onChange={e => setMaterialEstoque({
                                ...materialEstoque,
                                descricao: e.target.value
                            })}
                        />
                        <label htmlFor="descricao" >DESCRIÇÃO</label>
                    </div>
                    <div className={style.column_unidade} >
                        <div className={style.unidade} >
                            <input id="unidade"
                                value={textUnidade}
                                autoComplete="off"
                                onChange={() => { }}
                                required
                            />
                            <label htmlFor="unidade" >UNIDADE</label>
                            <div className={style.list} >
                                <ul>
                                    <li onClick={() => setTextUnidade("")} >Selecione...</li>
                                    {listUnidade.map((item: any, index: number) => {
                                        return (
                                            <li key={index}
                                                onClick={() => {
                                                    setMaterialEstoque({
                                                        ...materialEstoque,
                                                        unidade: item.unidade
                                                    })
                                                    setTextUnidade(item.unidade)
                                                }
                                                }>
                                                {item.unidade}
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className={style.column_type} >
                        <div className={style.type} >
                            <input autoComplete="off"
                                id="type"
                                value={textTipo}
                                onChange={() => { }}
                                required />
                            <label htmlFor="type">TIPO</label>
                            <div className={style.listTipo} >
                                <ul>
                                    <li onClick={() => setTextTipo("")} >Selecione...</li>
                                    {dataTipo && dataTipo.length > 0 && (
                                        dataTipo.map((item) => (
                                            <li key={item.id}
                                                onClick={() => {
                                                    setMaterialEstoque({
                                                        ...materialEstoque,
                                                        tipoMaterialId: item.id
                                                    })
                                                    setTextTipo(item.tipo)
                                                }}
                                            >{item.tipo}</li>
                                        ))
                                    )}

                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className={style.column_quantidade} >
                        <div className={style.quantidade} >
                            <input autoComplete="off"
                                id="quantidade"
                                value={value}
                                onChange={handleChange}
                                required />
                            <label htmlFor="quantidade">QUANTIDADE</label>

                        </div>
                    </div>
                </section>
                <footer className={style.container_button} >
                    <div className={style.container_button_cadastrar}>
                        <div className={style.button} >
                            <Button
                                classUi="glass"
                                color="green"
                                text="Cadastrar"
                                onClick={() => Verify()}
                            />
                        </div>
                    </div>
                    <div className={style.container_button_cancelar}>
                        <div className={style.button} >
                            <Button
                                classUi="glass"
                                color="red"
                                text="Cancelar"
                                onClick={() => changeToogle(false)}
                            />
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    )
}

const toogleCard = () => {

    const [toogle, setToogle] = useState(false);

    return {
        toogle,
        setToogle
    };
}


export default function CardStorageTeste() {
    const { toogle, setToogle } = toogleCard();

    return {
        CardStorage,
        toogle,
        setToogle

    }
}