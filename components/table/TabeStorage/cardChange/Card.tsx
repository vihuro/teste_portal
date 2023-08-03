import { useState } from "react";
import style from "./style.module.css";
import {
    MdDelete,
    MdLibraryAdd
} from "react-icons/md";
import { BiFilterAlt } from "react-icons/bi"
import Message from "../../../message/Message";
import CardFilter from "./filter/CardFilter";

interface itemProps {
    id: string,
    codigo: string,
    descricao: string,
    quantidade: Number,
    substitutos: [
        {
            id: string
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

const Card = ({
    toogle,
    changeToogle,
    data
}: {
    toogle: boolean,
    changeToogle: Function,
    data?: itemProps
}) => {

    const [dataMessagem, setDataMessage] = useState({
        message: "ERRO",
        type: "WARNING"
    });
    const [toogleMessage, setToogleMessage] = useState(false);
    const [toogleFilter, setToogleFilter] = useState(true);
    const [toogleLoading, setToogleLoading] = useState(false);

    return (
        <div className={style.cardBackground} >
            <div className={style.card} >
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
                <div className={toogleFilter ?
                    style.container_filter :
                    style.container_filter_close} >
                    <CardFilter
                        changeToogle={setToogleFilter}
                        toogle={toogleFilter}
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
                            value={data?.codigo}
                            onChange={() => { }}
                        />
                        <label htmlFor="txtCodigo">CÓDIGO</label>
                    </div>
                    <div className={style.container_descricao}>
                        <input id="txtDescricao"
                            type="text"
                            required
                            value={data?.descricao}
                            onChange={() => { }}
                        />
                        <label htmlFor="txtDescricao">DESCRIÇÃO</label>
                    </div>
                    <div className={style.container_unidade}>
                        <input id="txtUnidade"
                            type="text"
                            required
                            value={data?.unidade}
                            onChange={() => { }}
                        />
                        <label htmlFor="txtUnidade">UND.</label>
                    </div>
                    <div className={style.container_quantidade}>
                        <input id="txtQuantidade"
                            type="text"
                            required
                            value={data?.quantidade.toLocaleString()}
                            onChange={() => { }}
                        />
                        <label htmlFor="txtQuantidade">QTD.</label>

                    </div>
                    <div className={style.container_tipoMaterial}>
                        <input id="txtTipo"
                            type="text"
                            required
                            value={data?.tipoMaterial.tipo}
                            onChange={() => { }}
                        />
                        <label htmlFor="txtTipo">TIPO</label>

                    </div>
                    <div className={style.container_localEstocagem}>
                        <input id="txtLocal"
                            type="text"
                            required
                            value={data?.localEstocagem.localEstocagem}
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
                                    {data?.substitutos.map((item, index) => (
                                        <tr key={index} >
                                            <td>{item.codigo}</td>
                                            <td>{item.descricao}</td>
                                            <td>{item.unidade}</td>
                                            <td>{item.quantidade}</td>
                                            <td>{item.localEstocagem}</td>
                                            <td>{item.tipoMaterial}</td>
                                            <td>
                                                <MdDelete />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className={style.container_filterSubstituto} >
                        <div className={style.wrap_filterSubstituto}>
                            <input type="text" />
                            <label htmlFor=""></label>
                        </div>
                        <div className={style.wrap_filterSubstituto_button}>
                            <button 
                            onClick={() => setToogleFilter(true)} >
                                <span>
                                    <BiFilterAlt />
                                </span>
                            </button>
                            <button onClick={() => {
                                setDataMessage({
                                    message: "Substituto adicionado!",
                                    type: "SUCESS"
                                });
                                setToogleMessage(true)
                            }}>
                                <span>
                                    <MdLibraryAdd />
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
                <footer className={style.container_button} >
                    <button>
                        <span>SALVAR</span>
                    </button>
                    <button onClick={() => {
                        changeToogle(false)
                        // setToogleMessage(true)
                    }} >
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