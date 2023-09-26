import stye from "./style.module.css";
import InputUi from "../../../../UI/input/Input";
import ButtonUi from "../../../../UI/button/Button";
import { Icons } from "../../../../utils/IconDefault";
import { useEffect, useState } from "react";
import Message from "../../../../message/Message";
import Loading from "../../../../loading/Loading";
import Api from "../../../../../service/api/assistenciaTecnica/Assistencia";
import TokenDrecriptor from "../../../../../service/DecriptorToken";
import { tokenProps } from "../../../../utils/infoToken";
import { parseCookies } from "nookies";

interface props {
    changeToogle: Function,
    refreshTable: Function,
    data: maquinaProps

}
interface maquinaProps {
    ativo: boolean,
    codigo: string,
    atribuida: boolean,
    id: string,
    pecas: pecasProps[],
    descricaoMaquina: string,
    numeroSerie: string,
    cadastro: userProps,
    alteracao: userProps
}
interface userProps {
    apelido: string,
    nome: string,
    dataHora: Date,
    id: string
}
interface pecasProps {
    pecaId: string,
    codigoRadar: string,
    descricaoPeca: string,
    preco: number
}


export default function Card({ changeToogle, refreshTable, data }: props) {

    const { Input } = InputUi();
    const { Button } = ButtonUi();

    const [dataItem, setDataItem] = useState<maquinaProps>();

    const [dataMessage, setDataMessage] = useState({
        message: "",
        type: "WARNING"
    })
    const [toogleMessage, setToogleMessage] = useState<boolean>(false);
    const [toogleLoading, setToogleLoading] = useState<boolean>(false);
    const [toogleFilter, setToogleFilter] = useState<boolean>(false);

    useEffect(() => {
        setDataItem(data);
    }, [data])
    const tokenInfo: tokenProps = TokenDrecriptor(parseCookies().ACCESS_TOKEN)

    async function Change() {
        if (dataItem &&
            (dataItem.codigo === "" ||
                dataItem.descricaoMaquina === "" ||
                dataItem.numeroSerie === "")) {
            setDataMessage({
                message: "CAMPO(S) OBRIGATÓRIO(S) VAZIO(S)!",
                type: "WARNING"
            })
            setToogleLoading(false);
            setToogleMessage(true);
            return;
        }

        const obj = {
            maquinaId: dataItem?.id,
            codigoMaquina: dataItem?.codigo,
            descricaoMaquina: dataItem?.descricaoMaquina,
            numeroSerie: dataItem?.numeroSerie,
            ativo: true,
            pecas: dataItem?.pecas.map(item => ({
                idPeca: item.pecaId
            })),
            UserId: tokenInfo.idUser
        }
        console.log(toogleLoading)
        console.log(obj)
        await Api.put("/maquina", obj)
            .then(res => {
                setDataMessage({
                    message: "ALTERAÇÃO FEITA COM SUCESSO!",
                    type: "SUCESS"
                })

            })
            .catch(err => {

                if (err && (err.response && err.response.data)) {
                    setDataMessage({
                        message: err.response.data,
                        type: "WARNING"
                    });
                } else {
                    setDataMessage({
                        message: "ERRO NO SERVIDOR!",
                        type: "ERROR"
                    })
                }
            })
            .finally(() => {
                setToogleLoading(false);
                setToogleMessage(true);
            })
    }


    return (
        <form className={stye.card}>
            <div className={toogleMessage ?
                stye.container_message :
                stye.container_message_close} >
                <Message
                    stateMessage={toogleMessage}
                    action={setToogleMessage}
                    message={dataMessage.message}
                    type={dataMessage.type}
                />
            </div>
            <div className={toogleLoading ?
                stye.container_loading :
                stye.container_loading_close} >
                <Loading />
            </div>
            <div className={toogleFilter ?
                stye.containerFilter :
                stye.containerFilter_close} >

            </div>
            <header className={stye.title}>
                <h3>
                    MÁQUINA
                </h3>
            </header>
            <main className={stye.body} >
                <div className={stye.container_codigo} >
                    <Input
                        id="txtCodigoMaquinaChange"
                        text="CÓDIGO"
                        value={dataItem?.codigo ?? ""}
                        onChange={() => { }}
                    />
                </div>
                <div className={stye.container_nomeMaquina} >
                    <Input
                        id="txtDescricaoMaquinaChange"
                        text="DESCRIÇÃO"
                        value={dataItem?.descricaoMaquina ?? ""}
                    />
                </div>
                <div className={stye.container_numeroSerie} >
                    <Input
                        id="txNumeroSerieChange"
                        text="Nº SÉRIE"
                        value={dataItem?.numeroSerie}
                    />
                </div>
                <div className={stye.container_table} >
                    <div className={stye.wrapContainer_table} >
                        <table className={stye.table} >
                            <thead>
                                <tr>
                                    <th>
                                        CÓDIGO
                                    </th>
                                    <th>
                                        DESCRIÇÃO
                                    </th>
                                    <th>
                                        IMG
                                    </th>
                                    <th>
                                        DEL.
                                    </th>
                                </tr>
                            </thead>
                            <tbody className={stye.table_body} >
                                {dataItem && dataItem.pecas.length > 0 && (
                                    dataItem.pecas.map((item, index) => (
                                        <tr key={index} >
                                            <td>{item.codigoRadar}</td>
                                            <td>{item.descricaoPeca}</td>
                                            <td>VISUALIZAR</td>
                                            <td onClick={() => {
                                                setDataItem({
                                                    ...dataItem,
                                                    pecas: dataItem.pecas.filter(peca => peca.pecaId !== item.pecaId)
                                                })
                                            }} >
                                                <Icons.Delete />
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                    <section>
                        <Button
                            classUi="default"
                            color="blue"
                            icon={Icons.Filter}
                            type="button"
                            onClick={() => {
                                // setToogleLoading(true),
                                //Change()
                            }}
                        />
                    </section>

                </div>
            </main>
            <footer className={stye.button} >
                <div className={stye.container_cadastrar} >
                    <Button
                        classUi="glass"
                        color="green"
                        text="CADASTRAR"
                        type="button"
                        onClick={() => {
                            setToogleLoading(true),
                                Change()
                        }}
                    />
                </div>
                <div className={stye.container_fechar} >
                    <Button
                        classUi="glass"
                        color="red"
                        text="FECHAR"
                        type="button"
                        onClick={() => changeToogle(false)}
                    />
                </div>
            </footer>
        </form>
    )
}