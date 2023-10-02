import style from "./style.module.css";
import { Icons } from "../../../../utils/IconDefault"
import InputUi from "../../../../UI/input/Input";
import Api from "../../../../../service/api/assistenciaTecnica/Assistencia";
import { useEffect, useState } from "react";
import { DateTimeStringFormat } from "../../../../utils/DateTimeString";
import FilterPecas from "./filterPecas/Pecas";

interface props {
    changeToogle: Function,
    numeroOrcamento: number
}
interface dataProps {
    numeroOrcamento: number,
    descricaoServico: string,
    status: string,
    statusSituacao: statusSitucaoProps[],
    cliente: clienteProps,
    maquina: maquinaProps,
}
interface clienteProps {
    cep: string,
    cidade: string,
    cnpj: string,
    contatoNomeCliente: string,
    contatoTelefoneCliente: string,
    codigoRadar: string,
    estado: string,
    nomeCliente: string,
    numeroEstabelecimento: string,
    regiao: string,
    rua: string,
}
interface statusSitucaoProps {
    dataHoraFim: Date,
    dataHoraInicio: Date,
    status: string,
    statusId: string,
    usuarioApontamento: string,
    usuarioApontamentoFim: usuarioApontamentoSituacaoProps,
    usuarioApontamentoInicio: usuarioApontamentoSituacaoProps
}
interface usuarioApontamentoSituacaoProps {
    usuarioApontamentoApelido: string,
    usuarioApotamentoNome: string
}
interface maquinaProps {
    maquinaId: string,
    codigoMaquina: string,
    descricaoMaquina: string,
    numeroSerie: string,
    pecas: pecasProps[]
}
interface pecasProps {
    pecaId: string,
    conserto: boolean,
    codigoPeca: string,
    descricaoPeca: string,
    enderecoImagem: string,
    preco: number,
    troca: boolean
}

export default function Info({ changeToogle, numeroOrcamento }: props) {

    const { Input } = InputUi();
    const [data, setData] = useState<dataProps>();
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        if (data) {
            setData(undefined);
            setLoading(true)
        }
    }, [numeroOrcamento])
    const { Card, FetchDataPecas } = FilterPecas()

    async function FetchData(id: number) {
        Api.get(`/orcamento/${id}`)
            .then((res) => {
                setLoading(false);
                setData(res.data)
            })
            .catch(err => console.log(err))
    }

    function validadeUserApontamentoDiferenteNulo(usuarioApontamento: usuarioApontamentoSituacaoProps) {
        if (!usuarioApontamento) return {
            nome: "",
            apelido: ""
        };

        const usuarioApontamentoValido = {
            nome: usuarioApontamento.usuarioApotamentoNome,
            apelido: usuarioApontamento.usuarioApontamentoApelido
        }

        return usuarioApontamentoValido

    }
    function validateDataHoraApontamento(dateApontamento: Date) {
        if (DateTimeStringFormat(dateApontamento) === "01-01-1 00:00")
            return "00-00-0000 00:00";

        return DateTimeStringFormat(dateApontamento)
    }

    function InfoForm() {
        const [toogleNotification, setToogleNotification] = useState<boolean>(false);

        return (
            <main className={style.container} >
                <div>
                <Card />
                </div>
                <header className={style.container_header} >
                    <button onClick={() => {
                        setData(undefined);
                        changeToogle(false);
                        setLoading(true)
                    }} >
                        <Icons.ArrowLeft onClick={() => changeToogle(false)} />
                    </button>
                    <div className={style.containerNumeroOrcamento} >
                        <Input
                            id="txtNumeroOrcamentoInfo"
                            text="Nº ORÇAMENTO"
                            value={numeroOrcamento}
                            onChange={() => { }}
                            blocked
                        />
                    </div>
                </header>

                <main className={loading ?
                    style.container_body_loading :
                    style.container_body} >
                    <div className={style.wrapContainer_body} >
                        <div className={style.containerCodigoCliente} >
                            <Input
                                id="txtCodigoClienteInfo"
                                text="CÓDIGO CLIENTE"
                                value={data ? data.cliente.codigoRadar : ""}
                                onChange={() => { }}
                                blocked
                            />
                        </div>
                        <div className={style.containerNomeCliente} >
                            <Input
                                id="txtNomeClienteInfo"
                                text="NOME CLIENTE"
                                value={data ? data.cliente.nomeCliente : ""}
                                onChange={() => { }}
                                blocked
                            />
                        </div>
                        <div className={style.containerCNPJCliente} >
                            <Input
                                id="txtCnpjClienteInfo"
                                text="CNPJ"
                                value={data ? data.cliente.cnpj : ""}
                                onChange={() => { }}
                                blocked
                            />
                        </div>
                        <div className={style.containerCEPCliente} >
                            <Input
                                id="txtCEPClienteInfo"
                                text="CEP"
                                value={data ? data.cliente.cep : ""}
                                onChange={() => { }}
                                blocked
                            />
                        </div>
                        <div className={style.containerRuaCliente} >
                            <Input
                                id="txtRuaEnderecoInfo"
                                text="RUA"
                                value={data ? data.cliente.rua : ""}
                                onChange={() => { }}
                                blocked
                            />
                        </div>
                        <div className={style.containerNumeroEstabelecimento}>
                            <Input
                                id="txtNumeroEstabelecimentoInfo"
                                text="Nº ESTELECIMENTO"
                                value={data ? data.cliente.numeroEstabelecimento : ""}
                                onChange={() => { }}
                                blocked
                            />
                        </div>
                        <div className={style.containerCidadeCliente} >
                            <Input
                                id="txtCidadeClienteInfo"
                                text="CIDADE"
                                value={data ? data.cliente.cidade : ""}
                                onChange={() => { }}
                                blocked
                            />
                        </div>
                        <div className={style.containerRegiaoCliente} >
                            <Input
                                id="txtRegiaoClienteInfo"
                                text="REGIÃO"
                                value={data ? data.cliente.regiao : ""}
                                onChange={() => { }}
                                blocked
                            />
                        </div>
                        <div className={style.containerComplementoCliente} >
                            <Input
                                id="txtComplementoClienteInfo"
                                text="COMPLEMENTO"
                                value={data ? data.cliente.cidade : ""}
                                onChange={() => { }}
                                blocked
                            />
                        </div>
                        <div className={style.containerNomeContatoCliente} >
                            <Input
                                id="txtNomeContatoCliente"
                                text="CONT. CLIENTE"
                                value={data ? data.cliente.contatoNomeCliente : ""}
                                onChange={() => { }}
                                blocked
                            />
                        </div>
                        <div className={style.containerTelefoneContatoCliente} >
                            <Input
                                id="txtTelefoneContatoCliente"
                                text="TEL/ CLIENTE"
                                value={data ? data.cliente.contatoTelefoneCliente : ""}
                                onChange={() => { }}
                                blocked
                            />
                        </div>
                        <div className={style.containerDescricaoServico} >
                            <Input
                                id="txtDescricaoServico"
                                text="DESCRIÇÃO SERVIÇO"
                                value={data ? data.descricaoServico : ""}
                                onChange={() => { }}
                                blocked
                            />
                        </div>
                        <div className={style.containerMaquina} >
                            <div className={style.container_infoMaquina} >
                                <Input
                                    id="txtMaquinaClienteInfo"
                                    text="MÁQUINA"
                                    value={data ? data.maquina.codigoMaquina : ""}
                                    onChange={() => { }}
                                    blocked
                                />
                                <Input
                                    id="txtDescricaoMaquinaCliente"
                                    text="DESCRIÇÃO"
                                    value={data ? data.maquina.descricaoMaquina : ""}
                                    onChange={() => { }}
                                    blocked
                                />
                                <Input
                                    id="txtNumeroSerieMaquinaCliente"
                                    text="Nº SÉRIE"
                                    value={data ? data.maquina.numeroSerie : ""}
                                    onChange={() => { }}
                                    blocked
                                />
                            </div>
                            <div className={style.containerTablePecas} >
                                <div className={style.wrapContainerTable} >
                                    <table className={style.table} >
                                        <thead>
                                            <tr>
                                                <th>CÓDIGO PEÇA</th>
                                                <th>DESCRIÇÃO </th>
                                                <th>QTD</th>
                                                <th>IMG.</th>
                                                <th>TROCA</th>
                                                <th>REUSO</th>
                                            </tr>
                                        </thead>
                                        <tbody className={style.container_tableBody} >
                                            {data && data.maquina && (
                                                data.maquina.pecas.map((item, index) => (
                                                    <tr key={index} >
                                                        <td>{item.codigoPeca}</td>
                                                        <td>{item.descricaoPeca}</td>
                                                        <td>{4}</td>
                                                        <td>VISUALIZAR</td>
                                                        <td>
                                                            <input className={style.checked}
                                                                type="radio"
                                                                name={`rdb${item.codigoPeca}`}

                                                            />
                                                        </td>
                                                        <td>
                                                            <input className={style.checked}
                                                                type="radio"
                                                                name={`rdb${item.codigoPeca}`}

                                                            />
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className={style.containerStatus} >
                                <div className={style.wrapContainerStatus} >
                                    <table className={style.table_status} >
                                        <thead>
                                            <tr>
                                                <th>SITUAÇÃO</th>
                                                <th>HORA INÍCIO</th>
                                                <th>USUÁRIO INÍCIO</th>
                                                <th>HORA FIM</th>
                                                <th>USUÁRIO FIM</th>
                                                <th>AÇÃO</th>
                                            </tr>
                                        </thead>
                                        <tbody className={style.container_tableBody_status} >
                                            {data && (
                                                <>
                                                    <tr>
                                                        <td className={style.container_notification} >
                                                            <div className={style.tag_notification} onClick={() => setToogleNotification(!toogleNotification)} >
                                                                <Icons.BellNotification />
                                                            </div>
                                                            <div className={toogleNotification ?
                                                                style.descriptionNotification :
                                                                style.descriptionNotification_close} >

                                                            </div>
                                                            <p>
                                                                ORÇAMENTO
                                                            </p>
                                                        </td>
                                                        <td>{validateDataHoraApontamento(data.statusSituacao[1].dataHoraInicio)}</td>
                                                        <td>
                                                            {validadeUserApontamentoDiferenteNulo(data.statusSituacao[1].usuarioApontamentoInicio).nome}
                                                        </td>
                                                        <td>{validateDataHoraApontamento(data.statusSituacao[1].dataHoraFim)}</td>
                                                        <td>
                                                            {validadeUserApontamentoDiferenteNulo(data.statusSituacao[1].usuarioApontamentoFim).nome}
                                                        </td>
                                                        <td>
                                                            <p>FINALIZAR ORÇAMENTO</p>
                                                        </td>
                                                        {/* <td>{DateTimeStringFormat(data.statusSituacao[1].dataHoraFim)}</td>
                                                    <td>{data.statusSituacao[1].usuarioApontamentoFim.usuarioApontamentoNome}</td> */}
                                                    </tr>
                                                    <tr>
                                                        <td className={style.container_notification} >
                                                            <div className={style.tag_notification} style={{
                                                                background: "rgb(187,180,180)",
                                                                color: "#5f5b5b"
                                                            }} onClick={() => setToogleNotification(!toogleNotification)} >
                                                                <Icons.BellNotification />
                                                            </div>
                                                            <div className={toogleNotification ?
                                                                style.descriptionNotification :
                                                                style.descriptionNotification_close} >

                                                            </div>
                                                            <p>
                                                                NEGOCIAÇÃO
                                                            </p>
                                                        </td>
                                                        <td>{validateDataHoraApontamento(data.statusSituacao[2].dataHoraInicio)}</td>
                                                        <td>
                                                            {validadeUserApontamentoDiferenteNulo(data.statusSituacao[2].usuarioApontamentoInicio).nome}
                                                        </td>
                                                        <td>{validateDataHoraApontamento(data.statusSituacao[2].dataHoraFim)}</td>
                                                        <td>
                                                            {validadeUserApontamentoDiferenteNulo(data.statusSituacao[2].usuarioApontamentoFim).nome}
                                                        </td>
                                                        <td>
                                                            <p>FINALIZAR NEGOCIAÇÃO</p>
                                                        </td>
                                                    </tr>
                                                    <tr>

                                                        <td className={style.container_notification} >
                                                            <div className={style.tag_notification} style={{
                                                                background: "rgb(187,180,180)",
                                                                color: "#5f5b5b"
                                                            }} onClick={() => setToogleNotification(!toogleNotification)} >
                                                                <Icons.BellNotification />
                                                            </div>
                                                            <div className={toogleNotification ?
                                                                style.descriptionNotification :
                                                                style.descriptionNotification_close} >

                                                            </div>
                                                            <p>
                                                                MANUTENÇÃO
                                                            </p>
                                                        </td>
                                                        <td>{validateDataHoraApontamento(data.statusSituacao[3].dataHoraInicio)}</td>
                                                        <td>
                                                            {validadeUserApontamentoDiferenteNulo(data.statusSituacao[3].usuarioApontamentoInicio).nome}
                                                        </td>
                                                        <td>{validateDataHoraApontamento(data.statusSituacao[3].dataHoraFim)}</td>
                                                        <td>
                                                            {validadeUserApontamentoDiferenteNulo(data.statusSituacao[3].usuarioApontamentoFim).nome}
                                                        </td>
                                                        <td>
                                                            <p>FINALIZAR MANUTENÇÃO</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>LIMPEZA</td>
                                                        <td>{validateDataHoraApontamento(data.statusSituacao[3].dataHoraInicio)}</td>
                                                        <td>
                                                            {validadeUserApontamentoDiferenteNulo(data.statusSituacao[3].usuarioApontamentoInicio).nome}
                                                        </td>
                                                        <td>{validateDataHoraApontamento(data.statusSituacao[3].dataHoraFim)}</td>
                                                        <td>
                                                            {validadeUserApontamentoDiferenteNulo(data.statusSituacao[3].usuarioApontamentoFim).nome}
                                                        </td>
                                                        <td>
                                                            <p>LIMPEZA</p>
                                                        </td>
                                                    </tr>
                                                </>
                                            )}

                                            {/* <tr>
                                                <td>ORÇAMENTO</td>
                                                <td>25/09/2023 16:00:00</td>
                                                <td>00/00/0000 00:00:00</td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>NEGOCIAÇÃO</td>
                                                <td>00/00/0000 00:00:00</td>
                                                <td>00/00/0000 00:00:00</td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>MANUTENÇÃO</td>
                                                <td>00/00/0000 00:00:00</td>
                                                <td>00/00/0000 00:00:00</td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>MANUTENÇÃO</td>
                                                <td>00/00/0000 00:00:00</td>
                                                <td>00/00/0000 00:00:00</td>
                                                <td></td>
                                            </tr> */}
                                        </tbody>
                                    </table>
                                </div>

                            </div>

                        </div>
                    </div>


                </main>
            </main>
        )
    }

    return {
        InfoForm,
        FetchData
    }


}