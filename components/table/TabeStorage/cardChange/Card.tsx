import { useEffect, useState } from "react";
import style from "./style.module.css";
import {
    MdDelete,
    MdLibraryAdd
} from "react-icons/md";
import { BiFilterAlt } from "react-icons/bi"
import Message from "../../../message/Message";
import CardFilter from "./filter/CardFilter";
import Api from "../../../../service/api/matriz/estoque-grm";
import { parseCookies } from "nookies";
import TokenDrecriptor from "../../../../service/DecriptorToken";
import Loading from "../../../loading/Loading";

interface ItemsProps {
    id: string,
    codigo: string,
    descricao: string,
    quantidade: number,
    substitutos: [
        {
            produtoId: string,
            substitutoId: string,
            codigo: string,
            descricao: string,
            unidade: string,
            localEstocagem: string,
            quantidade: number,
            tipoMaterial: string,
        }
    ],
    localEstocagem: {
        guid: string,
        localEstocagem: string
    }
    tipoMaterial: {
        id: string,
        tipo: string
    },
    unidade: string,
    cadastro: {
        id: string,
        apelido: string,
        nome: string,
        dataHora: Date
    },
    alteracao: {
        id: string,
        apelido: string,
        nome: string,
        dataHora: Date
    }
}

interface TipoProps {
    id: string,
    tipo: string
}



const Card = ({
    toogle,
    changeToogle,
    data,
    refreshTable
}: {
    toogle: boolean,
    changeToogle: Function,
    data: ItemsProps,
    refreshTable: Function
}) => {


    const [dataMessagem, setDataMessage] = useState({
        message: "ERRO",
        type: "WARNING"
    });
    const [toogleMessage, setToogleMessage] = useState<boolean>(false);
    const [toogleFilter, setToogleFilter] = useState<boolean>(false);
    const [toogleLoading, setToogleLoading] = useState<boolean>(false);
    const infoToken = TokenDrecriptor(parseCookies().ACCESS_TOKEN);
    const [valueTipo, setValueTipo] = useState<TipoProps>();
    const [dataTipo, setDataTipo] = useState<TipoProps[]>([]);
    const [valueQuantidade, setValueQuantidade] = useState<string>("")
    const [valueUnidade, setValueUnidade] = useState<string>("");

    const [toogleTipo, setToogleTipo] = useState<boolean>(false);
    const [toogleUnidade, setToogleUnidade] = useState<boolean>(false)
    const [item, setItem] = useState<ItemsProps>();

    useEffect(() => {
        setItem(data);
        setValueQuantidade(data?.quantidade.toLocaleString())
        setValueTipo({
            id: data?.tipoMaterial.id,
            tipo: data?.tipoMaterial.tipo
        })
        setValueUnidade(data?.unidade)
        fechDataTipo();

    }, [data, toogleLoading])

    async function fechDataTipo() {
        await Api.get("/tipo-material")
            .then(res => setDataTipo(res.data))
            .catch(err => console.log(err))
    }


    async function Alterar() {
        const validateQuantidade = data?.quantidade.toLocaleString() !== valueQuantidade;
        const validateUnidadeOrTipoMaterial = data.unidade !== valueUnidade || data.tipoMaterial.id !== valueTipo?.id;

        const userId = infoToken.idUser;
        const produtoId = data.id;

        if (validateQuantidade || validateUnidadeOrTipoMaterial) {
            setToogleLoading(true);


            const promises: Promise<any>[] = [];

            if (validateQuantidade) promises.push(AtualizarQuantidade({ idUser: userId, produtoId: produtoId }))

            if (validateUnidadeOrTipoMaterial) promises.push(AtualizarTipoOrUnidade({ idUser: userId, produtoId: produtoId }));

            await Promise.all(promises)


            const results = await Promise.all(promises);

            const allPromisesSuccess = results.every(res => res.status === 200);
            if (allPromisesSuccess) {
                setDataMessage({
                    message: "Alterações feitas com sucesso!",
                    type: "SUCESS"
                })
            } else {
                setDataMessage({
                    message: "ERRO no servidor!",
                    type: "ERROR"
                })
            }
            setToogleLoading(false);
            setToogleMessage(true);
            refreshTable()


        } else {
            setDataMessage({
                message: "Nenhuma mudança realizada!",
                type: "WARNING"
            })
            setToogleMessage(true)
        }
    }

    async function AtualizarTipoOrUnidade({
        idUser,
        produtoId
    }: {
        idUser: string,
        produtoId: string
    }) {
        const alteracao = {
            usuarioId: idUser,
            produtoId: produtoId,
            tipoId: valueTipo?.id,
            unidade: valueUnidade
        }
        const reponse = await Api.put("", alteracao)
            .then(res => res)
            .catch(err => err)

        return reponse

    }
    async function AtualizarQuantidade({
        idUser,
        produtoId
    }: {
        idUser: string,
        produtoId: string
    }) {

        const valueNumber = Number(valueQuantidade);



        const quantidadeMovimentada = valueNumber - data.quantidade;

        const tipoMovimentacao = quantidadeMovimentada < 0 ? 1 : 0;

        const alteracao = {
            materialId: produtoId,
            quantidadeMovimentada: tipoMovimentacao === 1 ? quantidadeMovimentada * -1 : quantidadeMovimentada,
            usuarioId: idUser,
            tipo: tipoMovimentacao
        }
        console.log(tipoMovimentacao)


        const response = await Api.post("/movimentacao", alteracao)
            .then(res => res)
            .catch(err => err)

        return response;


    }

    async function RemoverSubstituto({ id }: { id: string }) {
        setToogleLoading(true)
        const infoToken = TokenDrecriptor(parseCookies().ACCESS_TOKEN);
        var substituto = {
            produtoId: data?.id,
            substitutoId: id,
            usuarioId: infoToken.idUser
        }

        await Api.delete(`substitutos/unico`, { data: substituto })
            .then(res => {
                setDataMessage({
                    message: "SUBSTITUTO DELETADO!",
                    type: "SUCESS"
                })
                refreshTable()
            })
            .catch(err => console.log(err))
            .finally(() => {
                setToogleLoading(false)
                setToogleMessage(true)

            })

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


    return (
        <div className={style.cardBackground} >
            <div className={style.card} onClick={() => {
                setToogleTipo(false)
                setToogleUnidade(false)
            }} >
                <div className={toogleMessage ?
                    style.container_message :
                    style.container_message_close}
                >
                    <Message
                        message={dataMessagem.message}
                        type={dataMessagem.type}
                        action={setToogleMessage}
                        stateMessage={toogleMessage}
                    />
                </div>
                <div className={toogleLoading ?
                    style.container_loading :
                    style.container_loading_close} >
                    <Loading />
                </div>
                <div className={toogleFilter ?
                    style.container_filter :
                    style.container_filter_close} >
                    <CardFilter
                        changeToogle={setToogleFilter}
                        toogle={toogleFilter}
                        idItem={item?.id}
                        refreshTable={() => refreshTable()}
                    />
                </div>
                <div className={style.title} >
                    <span>PRODUTO</span>
                </div>
                <div className={style.body} >
                    <div className={style.container_codigo} >
                        <input id="txtCodigo"
                            type="text"
                            required
                            value={item?.codigo ?? ''}
                            onChange={() => { }}
                        />
                        <label htmlFor="txtCodigo">CÓDIGO</label>
                    </div>
                    <div className={style.container_descricao}>
                        <input id="txtDescricao"
                            type="text"
                            required
                            value={item?.descricao ?? ''}
                            onChange={() => { }}
                        />
                        <label htmlFor="txtDescricao">DESCRIÇÃO</label>
                    </div>
                    <div className={style.container_unidade} onClick={e => e.stopPropagation()} >
                        <input id="txtUnidade"
                            type="text"
                            required
                            value={valueUnidade}
                            onChange={() => { }}
                            onClick={() => {
                                setToogleUnidade(!toogleUnidade)
                                setToogleTipo(false)
                            }}
                        />
                        <label htmlFor="txtUnidade">UND.</label>
                        <ul className={toogleUnidade ? style.listUnidade : style.listUnidade_close} >
                            {listUnidade.map((item, index) => (
                                <li onClick={() => {
                                    setValueUnidade(item.unidade)
                                    setToogleUnidade(false)
                                }} key={index} >{item.unidade}</li>
                            ))}

                        </ul>
                    </div>
                    <div className={style.container_quantidade}>
                        <input id="txtQuantidade"
                            type="text"
                            required
                            value={valueQuantidade ?? ''}
                            onChange={(e) => { setValueQuantidade(e.target.value) }}
                            autoComplete="off"
                        />
                        <label htmlFor="txtQuantidade">QTD.</label>

                    </div>
                    <div className={style.container_tipoMaterial} onClick={(e) => e.stopPropagation()} >
                        <input id="txtTipo"
                            type="text"
                            required
                            value={valueTipo?.tipo ?? ''}
                            onChange={() => { }}
                            onClick={() => {
                                setToogleTipo(!toogleTipo)
                                setToogleUnidade(false)
                            }}
                            autoComplete="off"
                        />
                        <label htmlFor="txtTipo">TIPO</label>
                        <ul className={toogleTipo ? style.listTipo : style.listTipo_close} >
                            {dataTipo.map((item, index) => (
                                <li onClick={(e) => {
                                    item
                                    setValueTipo({
                                        id: item.id,
                                        tipo: item.tipo
                                    })
                                    setToogleTipo(false)

                                }} key={index} >
                                    {item.tipo}

                                </li>
                            ))}
                        </ul>

                    </div>
                    <div className={style.container_localEstocagem}>
                        <input id="txtLocal"
                            type="text"
                            required
                            value={item?.localEstocagem.localEstocagem ?? ''}
                            onChange={() => { }}
                        />
                        <label htmlFor="txtLocal">LOCAL</label>

                    </div>
                    <div className={style.container_substituto} >
                        <div className={style.wrap_container_list_substituto}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>CÓDIGO</th>
                                        <th>DESCRIÇÃO</th>
                                        <th>UND.</th>
                                        <th>QTD.</th>
                                        <th>LOCAL</th>
                                        <th>TIPO</th>
                                        <th>DEL.</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {item?.substitutos.map((item, index) => (
                                        <tr key={index} >
                                            <td>{item.codigo}</td>
                                            <td>{item.descricao}</td>
                                            <td>{item.unidade}</td>
                                            <td>{item.quantidade}</td>
                                            <td>{item.localEstocagem}</td>
                                            <td>{item.tipoMaterial}</td>
                                            <td>
                                                <p onClick={() => {
                                                    RemoverSubstituto({
                                                        id: item.substitutoId
                                                    })
                                                }} >
                                                    <MdDelete />
                                                </p>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className={style.container_filterSubstituto} >
                        <div className={style.wrap_filterSubstituto_button}>
                            <button
                                onClick={() => setToogleFilter(true)} >
                                <span>
                                    <BiFilterAlt />
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
                <footer className={style.container_button} >
                    <button onClick={() => Alterar()} >
                        <span>SALVAR</span>
                    </button>
                    <button onClick={() => {
                        changeToogle(false)
                    }} >
                        <span>CANCELAR</span>
                    </button>
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