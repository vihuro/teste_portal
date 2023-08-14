import { useState, useEffect } from "react";
import style from "./style.module.css";
import Api from "../../../../../service/api/matriz/estoque-grm";
import { MdLibraryAdd } from "react-icons/md";
import { CiMenuKebab } from "react-icons/ci";
import Message from "../../../../message/Message";
import Loading from "../../../../loading/Loading";
import TokenDrecriptor from "../../../../../service/DecriptorToken";
import { parseCookies } from "nookies";


interface ItemsProps {
    id: string,
    codigo: string,
    descricao: string,
    unidade: string,
    quantidade: number,
    localEstocagem: {
        guid: string,
        localEstocagem: string
    },
    tipoMaterial: {
        id: string,
        tipo: string
    },
}

export default function Card({
    toogle,
    changeToogle,
    idItem,
    refreshTable
}: {
    toogle: boolean,
    changeToogle: Function,
    idItem?: string,
    refreshTable: Function
}) {
    const [data, setData] = useState<ItemsProps[]>([]);
    const [id, setId] = useState<string>();

    const [novoSubstituto, setNovoSubstituto] = useState({
        produtoId: "",
        substitutoId: "",
        usuarioId: ""
    })

    useEffect(() => {
        if (idItem) {
            setId(idItem);
            console.log("Dentro de Card filter " + id)

            FetchData();
        }

    }, [toogle === true])



    async function FetchData() {
        if (id !== "") {

            await Api.get(`/without-substituto/${id}`)
                .then(res => setData(res.data))
                .catch(err => console.log(err))
        }

    }
    useEffect(() => {

    }, [novoSubstituto])

    const [toogleLoading, setLoadind] = useState(false);
    const [toogleMessage, setToogleMessage] = useState(false);
    const [dataMessage, setDataMessage] = useState({
        message: "ERRO",
        type: "WARNING"
    })
    const infoToken = TokenDrecriptor(parseCookies().ACCESS_TOKEN);


    async function AdicionarSubstituto({ id }: { id: string }) {
        setLoadind(true)

        setNovoSubstituto({
            produtoId: idItem ? idItem : "",
            substitutoId: id,
            usuarioId: infoToken.idUser
        });

        const novoSubstituto = {
            produtoId: idItem,
            substitutoId: id,
            usuarioId: "71ec31dc-57a6-4a53-b199-34157822f91b"
        }

        await Api.put("/substitutos", novoSubstituto)
            .then(res => {
                setDataMessage({
                    message: "SUBSTITUTO ADICIONADO COM SUCESSO!",
                    type: "SUCESS"
                })
                FetchData();
                refreshTable();
            })
            .catch(err => console.log(err))
            .finally(() => {
                setLoadind(false)
                setToogleMessage(true)
            })

    }


    return (
        <div className={style.card} >
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
            <div className={toogleLoading ?
                style.container_loading :
                style.container_loading_close} >
                <Loading />

            </div>
            <div className={style.title} >
                <span>
                    SUBSTITUTOS
                </span>

            </div>
            <div className={style.container_table} >
                <table>
                    <thead>
                        <tr>
                            <th>
                                <span>
                                    CÓDIGO
                                    <CiMenuKebab />
                                </span>
                            </th>
                            <th>DESCRIÇÃO</th>
                            <th>UND.</th>
                            <th>QTD.</th>
                            <th>TIPO</th>
                            <th>LOCAL</th>
                            <th>EDIT.</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && (
                            data.map((item, index) => (
                                <tr key={index} >
                                    <td>{item.codigo}</td>
                                    <td>{item.descricao}</td>
                                    <td>{item.unidade}</td>
                                    <td>{item.quantidade}</td>
                                    <td>{item.tipoMaterial.tipo}</td>
                                    <td>{item.localEstocagem.localEstocagem}</td>
                                    <td onClick={() => AdicionarSubstituto({ id: item.id })} ><MdLibraryAdd /></td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <div className={style.container_button} >
                <button onClick={() => {
                    setId("");
                    changeToogle(false)
                }}>
                    FECHAR
                </button>
            </div>
        </div>
    )

}