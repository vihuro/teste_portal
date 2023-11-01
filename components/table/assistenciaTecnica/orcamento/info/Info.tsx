import style from "./style.module.css";
import { Icons } from "../../../../utils/IconDefault"
import InputUi from "../../../../UI/input/Input";
import Api from "../../../../../service/api/assistenciaTecnica/Assistencia";
import { useEffect, useRef, useState } from "react";
import { DateTimeStringFormat } from "../../../../utils/DateTimeString";
import { Card as CardFilter } from "./filterPecas/Pecas";
import { Form as FormDiario } from "./Diario/CardDiario";
import Obser from "./obs/Card";
import {
    IOrcamentoProps,
    IClienteProps,
    IMaquinaProps,
    IPecasProps,
    IStatusSitucaoProps,
    IUsuarioApontamentoSituacaoProps,
    ITechnicianProps,
    EStatus

} from "../IOrcamento";
import { handleTouchEnd, handleTouchStart } from "../../../../utils/HandleTouch";
import ConfirmStatus from "./ConfirmChangeStatus/Confirm";


interface props {
    changeToogle: Function,
    numeroOrcamento: number,
    valueToogle: boolean
}
// interface dataProps {
//     numeroOrcamento: number,
//     descricaoServico: string,
//     status: string,
//     statusSituacao: statusSitucaoProps[],
//     cliente: clienteProps,
//     maquina: maquinaProps,
// }
// interface clienteProps {
//     cep: string,
//     cidade: string,
//     cnpj: string,
//     contatoNomeCliente: string,
//     contatoTelefoneCliente: string,
//     codigoRadar: string,
//     estado: string,
//     nomeCliente: string,
//     numeroEstabelecimento: string,
//     regiao: string,
//     rua: string,
// }
// interface statusSitucaoProps {
//     dataHoraFim: Date,
//     dataHoraInicio: Date,
//     status: string,
//     statusId: string,
//     usuarioApontamento: string,
//     usuarioApontamentoFim: usuarioApontamentoSituacaoProps,
//     usuarioApontamentoInicio: usuarioApontamentoSituacaoProps
// }
// interface usuarioApontamentoSituacaoProps {
//     usuarioApontamentoApelido: string,
//     usuarioApotamentoNome: string
// }
// interface maquinaProps {
//     maquinaId: string,
//     codigoMaquina: string,
//     descricaoMaquina: string,
//     numeroSerie: string,
//     pecas: pecasProps[]
// }
// interface pecasProps {
//     pecaId: string,
//     conserto: boolean,
//     codigoPeca: string,
//     descricaoPeca: string,
//     enderecoImagem: string,
//     preco: number,
//     troca: boolean
// }

interface tecnicoProps {
    apelido: string,
    nome: string,
    idTecnico: string,
    idUsuario: string
}

function DataBudget() {
    const [data, setData] = useState<IOrcamentoProps>();

    return {
        data,
        setData
    }
}
function DataTechnician() {
    const [data, setData] = useState<ITechnicianProps[]>([]);

    return {
        data,
        setData
    }
}
const Loading = () => {
    const [loading, setLoading] = useState<boolean>(true);

    return {
        loading,
        setLoading
    }
}

function Fetchdata({ id }: { id: number }) {

    const { data: dataBudget, setData: setDataBudget } = DataBudget();
    const { data: dataTechnician, setData: setDateTechnician } = DataTechnician();

    const { loading, setLoading } = Loading()


    function getByNumeroOrcamento() {
        Api.get(`/orcamento/${id}`)
            .then((res) => {
                setLoading((cuurent) => cuurent = false);
                setDataBudget((current) => current = res.data)
            })
            .catch(err => console.log(err))
    }
    function getListTechnician() {
        Api.get("/tecnico")
            .then(res => setDateTechnician(res.data))
            .catch(err => console.log(err))
    }


    return {
        dataBudget,
        loading,
        setDataBudget,
        setLoading,
        getByNumeroOrcamento,
        getListTechnician,
        dataTechnician,
        setDateTechnician
    }
}

function validadeUserApontamentoDiferenteNulo(usuarioApontamento: IUsuarioApontamentoSituacaoProps) {
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
function InfoForm({ changeToogle, numeroOrcamento, valueToogle }: props) {

    const { Input } = InputUi();
    const [dataTecnico, setDataTecnico] = useState<tecnicoProps[]>([]);
    const touchTimeout = useRef(null);

    const [tecnicoOrcamento, setTecnicoOrcamento] = useState<tecnicoProps>({
        apelido: "",
        idTecnico: "",
        idUsuario: "",
        nome: ""
    });
    const { dataBudget, loading, setDataBudget,
        dataTechnician, setDateTechnician,
        setLoading, getByNumeroOrcamento, getListTechnician } =
        Fetchdata({ id: numeroOrcamento })

    useEffect(() => {
        if (dataBudget) {
            setDataBudget(undefined);
            setLoading(true);
        }
    }, [numeroOrcamento])


    useEffect(() => {
        if (valueToogle) {
            getByNumeroOrcamento()
            getListTechnician()
        }
    }, [valueToogle])


    const [toogleNotification, setToogleNotification] = useState<boolean>(false);
    const [listTecnicoOrcamento, setListTecnicoOrcamento] = useState<boolean>(false);
    const [listTecnicoManutecao, setListTecnicoManutencao] = useState<boolean>(false);
    const [toogleFilterPecas, setToogleFilterPecas] = useState<boolean>(false);
    const [toogleDiario, setToogleDiario] = useState<boolean>(false);
    const [toogleConfirmStatus, setToogleConfirmStaus] = useState<boolean>(false);

    const [status, setStatus] = useState(EStatus.STATUS_AGUARDANDO_LIBERACAO_ORCAMENTO);
    const [numeroStatus, setNumeroStatus] = useState<number>(0);

    // const { Card } = FilterPecas()
    // useEffect(() => {
    //     getByNumeroOrcamento()
    // }, [numeroOrcamento])
    function changeToogleFilterParts() {
        setToogleFilterPecas((current) => !current)
    }

    function ValidateAguardandoAtribuicao(text: string) {

        switch (text) {
            case "AGUARDANDO ATRIBUIÇÃO":
                return "INICIAR ORÇAMENTO";
            case "AGURDANDO ORÇAMENTO":
                return "FINALIZAR ORÇAMENTO"
            default: return ""
        }

    }
    function ValidateAguardandoOrcamento(text: string) {

        switch (text) {
            case "AGUARDANDO LIBERAÇÃO DO ORÇAMENTO":
                return "FINALIZAR APROVAÇÃO";
            default: return ""
        }
    }
    function ValidateAguardandoManutencao(text: string) {

        switch (text) {
            case "AGUARDANDO MANUTENÇÃO":
                return "INICIAR MANUTENÇÃO";
            case "MANUTENÇÃO INICIADA":
                return "FINALIZAR MANUTENÇÃO"
            default: return ""
        }
    }
    function ValidateLimpandoMaquina(text: string) {
        switch (text) {
            case "REALIZANDO LIMPEZA":
                return "FINALIZAR";
            default: return ""
        }
    }


    return (
        <main className={style.container} onClick={(e) => {
            setListTecnicoManutencao(false)
            setListTecnicoOrcamento(false)
        }}>
            <div className={toogleConfirmStatus ?
                style.containerConfirmStatus :
                style.containerConfirmStatus_close} >
                <ConfirmStatus
                    changeInfo={setDataBudget}
                    changeToogle={setToogleConfirmStaus}
                    typeStatus={status}
                    numeroOrcamento={numeroOrcamento}
                    numeroStatus={numeroStatus} />
            </div>
            <div className={toogleFilterPecas ?
                style.containerFilter :
                style.containerFilter_close} >
                <div className={style.wrapContainerFilter} >
                    <CardFilter
                        changeToogle={setToogleFilterPecas}
                        toogle={toogleFilterPecas}
                        refreshInfo={getByNumeroOrcamento}
                        numeroOrcamento={numeroOrcamento} />
                </div>
            </div>
            <div className={toogleDiario ?
                style.containerDiario :
                style.containerDiario_close} >
                <div className={style.wrapDiario} >
                    <FormDiario changeToogle={setToogleDiario} />
                </div>
            </div>
            <header className={style.container_header} >
                <div className={style.containerActions} >
                    <div className={style.container_buttonBack} >
                        <button onClick={() => {
                            setDataBudget(undefined);
                            changeToogle(false);
                            setLoading(true)
                        }} >
                            <Icons.ArrowLeft onClick={() => { changeToogle(false) }} />
                        </button>
                    </div>
                    <div className={style.containerButtonDaily} >
                        <button onClick={() => setToogleDiario((current) => !current)} >
                            <Icons.Book />
                        </button>
                    </div>
                    <div className={style.containerMap} >
                        {dataBudget && (

                            <a target="_blank"
                                href={`https://www.google.com/maps/search/?api=1&query=
                                    ${dataBudget?.cliente.rua + dataBudget?.cliente.numeroEstabelecimento}`}>
                                <Icons.Map />
                            </a>
                        )}
                    </div>
                </div>

                <div className={style.containerNumeroOrcamento} >
                    <Input
                        id="txtNumeroOrcamentoInfo"
                        text="Nº ORÇAMENTO"
                        value={numeroOrcamento}
                        onChange={() => { }}
                        blocked
                    />
                </div>
                <div className={style.containerStatusOrcamento} >
                    <p className={style.status} >
                        {dataBudget ? dataBudget.status : ""}
                    </p>
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
                            value={dataBudget ? dataBudget.cliente.codigoRadar : ""}
                            onChange={() => { }}
                            blocked
                        />
                    </div>
                    <div className={style.containerNomeCliente} >
                        <Input
                            id="txtNomeClienteInfo"
                            text="NOME CLIENTE"
                            value={dataBudget ? dataBudget.cliente.nomeCliente : ""}
                            onChange={() => { }}
                            blocked
                        />
                    </div>
                    <div className={style.containerCNPJCliente} >
                        <Input
                            id="txtCnpjClienteInfo"
                            text="CNPJ"
                            value={dataBudget ? dataBudget.cliente.cnpj : ""}
                            onChange={() => { }}
                            blocked
                        />
                    </div>
                    <div className={style.containerCEPCliente} >
                        <Input
                            id="txtCEPClienteInfo"
                            text="CEP"
                            value={dataBudget ? dataBudget.cliente.cep : ""}
                            onChange={() => { }}
                            blocked
                        />
                    </div>
                    <div className={style.containerRuaCliente} >
                        <Input
                            id="txtRuaEnderecoInfo"
                            text="RUA"
                            value={dataBudget ? dataBudget.cliente.rua : ""}
                            onChange={() => { }}
                            blocked
                        />
                    </div>
                    <div className={style.containerNumeroEstabelecimento}>
                        <Input
                            id="txtNumeroEstabelecimentoInfo"
                            text="Nº ESTELECIMENTO"
                            value={dataBudget ? dataBudget.cliente.numeroEstabelecimento : ""}
                            onChange={() => { }}
                            blocked
                        />
                    </div>
                    <div className={style.containerCidadeCliente} >
                        <Input
                            id="txtCidadeClienteInfo"
                            text="CIDADE"
                            value={dataBudget ? dataBudget.cliente.cidade : ""}
                            onChange={() => { }}
                            blocked
                        />
                    </div>
                    <div className={style.containerRegiaoCliente} >
                        <Input
                            id="txtRegiaoClienteInfo"
                            text="REGIÃO"
                            value={dataBudget ? dataBudget.cliente.regiao : ""}
                            onChange={() => { }}
                            blocked
                        />
                    </div>
                    <div className={style.containerComplementoCliente} >
                        <Input
                            id="txtComplementoClienteInfo"
                            text="COMPLEMENTO"
                            value={dataBudget ? dataBudget.cliente.cidade : ""}
                            onChange={() => { }}
                            blocked
                        />
                    </div>
                    <div className={style.containerNomeContatoCliente} >
                        <Input
                            id="txtNomeContatoCliente"
                            text="CONT. CLIENTE"
                            value={dataBudget ? dataBudget.cliente.contatoNomeCliente : ""}
                            onChange={() => { }}
                            blocked
                        />
                    </div>
                    <div className={style.containerTelefoneContatoCliente} >
                        <Input
                            id="txtTelefoneContatoCliente"
                            text="TEL/ CLIENTE"
                            value={dataBudget ? dataBudget.cliente.contatoTelefoneCliente : ""}
                            onChange={() => { }}
                            blocked
                        />
                    </div>
                    <div className={style.containerDescricaoServico} >
                        <Input
                            id="txtDescricaoServico"
                            text="DESCRIÇÃO SERVIÇO"
                            value={dataBudget ? dataBudget.descricaoServico : ""}
                            onChange={() => { }}
                            blocked
                        />
                    </div>
                    <div className={style.containerTecnicoOrcamento} onClick={(e) => e.stopPropagation()}>
                        <input type="text"
                            required
                            id="txtTecnicoOrcamento"
                            value={tecnicoOrcamento.nome}
                            onChange={() => { }}
                            onClick={() => {
                                setListTecnicoOrcamento(!listTecnicoOrcamento)
                            }} />
                        <label htmlFor="txtTecnicoOrcamento">TÉCNICO ORÇ.</label>
                        <ul className={listTecnicoOrcamento ?
                            style.listTecnicoOrcamento :
                            style.listTecnicoOrcamento_close} >
                            {dataTechnician && (
                                dataTechnician.map((item, index) => (
                                    <li onClick={() => {
                                        setListTecnicoOrcamento(false)
                                        setTecnicoOrcamento(item);
                                    }} key={index} >{item.nome}</li>
                                ))
                            )}
                        </ul>
                    </div>
                    <div className={style.containerTempoEstimadoOrcamento} >
                        <input type="number"
                            value={dataBudget ?
                                dataBudget.tempoEstimadoOrcamento.toString() :
                                0} />
                    </div>
                    <div className={style.containerTempoEstimadoManutencao} >
                        <input type="number"
                            value={dataBudget ?
                                dataBudget.tempoEstimadoManutencao.toString() :
                                0} />
                    </div>
                    <div className={style.containerTecnicoManutencao} onClick={(e) => e.stopPropagation()}>
                        <input type="text"
                            required
                            id="txtTecnicoManutencao"
                            value={tecnicoOrcamento.nome}
                            onChange={() => { }}
                            onClick={() => {
                                setListTecnicoManutencao(!listTecnicoManutecao)
                            }} />
                        <label htmlFor="txtTecnicoManutencao">TÉCNICO MANUT.</label>
                        <ul className={listTecnicoManutecao ?
                            style.listTecnicoOrcamento :
                            style.listTecnicoOrcamento_close} >
                            {dataTechnician && (
                                dataTechnician.map((item, index) => (
                                    <li onClick={() => {
                                        setListTecnicoManutencao(false)
                                        setTecnicoOrcamento(item);
                                    }} key={index} >{item.nome}</li>
                                ))
                            )}
                        </ul>
                    </div>
                    <div className={style.containerMaquina} >
                        <div className={style.container_infoMaquina} >
                            <Input
                                id="txtMaquinaClienteInfo"
                                text="MÁQUINA"
                                value={dataBudget ? dataBudget.maquina.codigoMaquina : ""}
                                onChange={() => { }}
                                blocked
                            />
                            <Input
                                id="txtDescricaoMaquinaCliente"
                                text="DESCRIÇÃO"
                                value={dataBudget ? dataBudget.maquina.descricaoMaquina : ""}
                                onChange={() => { }}
                                blocked
                            />
                            <Input
                                id="txtNumeroSerieMaquinaCliente"
                                text="Nº SÉRIE"
                                value={dataBudget ? dataBudget.maquina.numeroSerie : ""}
                                onChange={() => { }}
                                blocked
                            />
                        </div>
                        <div className={style.containerTablePecas}
                            onDoubleClick={() => {
                                setToogleFilterPecas((current) => current = !current)
                            }}
                            onTouchStart={() =>
                                handleTouchStart({
                                    action: changeToogleFilterParts,
                                    touchTimeout: touchTimeout
                                })}
                            onTouchEnd={() => {
                                handleTouchEnd({
                                    touchTimeout: touchTimeout
                                })
                            }}>
                            <div className={style.wrapContainerTable} >
                                <table className={style.table} >
                                    <thead>
                                        <tr>
                                            <th>CÓDIGO PEÇA</th>
                                            <th>DESCRIÇÃO </th>
                                            <th>QTD</th>
                                            <th>IMG.</th>
                                            <th>TROCA</th>
                                            <th>TR/RU.</th>
                                        </tr>
                                    </thead>
                                    <tbody className={style.container_tableBody} >
                                        {dataBudget && dataBudget.maquina && (
                                            dataBudget.maquina.pecas.map((item, index) => (
                                                <tr key={index} >
                                                    <td>{item.codigoPeca}</td>
                                                    <td>{item.descricaoPeca}</td>
                                                    <td>{item.quantidade}</td>
                                                    <td>VISUALIZAR</td>
                                                    <td>
                                                        <input className={style.checked}
                                                            type="radio"
                                                            name={`rdb${item.codigoPeca}`}
                                                            checked={item.troca}
                                                            readOnly
                                                        />
                                                    </td>
                                                    <td>
                                                        <input className={style.checked}
                                                            type="radio"
                                                            name={`rdb${item.codigoPeca}`}
                                                            checked={!item.troca}
                                                            readOnly
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
                                        {dataBudget && dataBudget.statusSituacao.length > 0 && (
                                            <>
                                                <tr>
                                                    <td className={style.container_notification} >
                                                        <div className={style.tag_notification} onClick={() => setToogleNotification(!toogleNotification)} >
                                                            <Icons.BellNotification />
                                                        </div>
                                                        <div className={toogleNotification ?
                                                            style.descriptionNotification :
                                                            style.descriptionNotification_close} >
                                                            <Obser text={dataBudget.statusSituacao[1].observacao} />

                                                        </div>
                                                        <p>
                                                            ORÇAMENTO
                                                        </p>
                                                    </td>
                                                    <td>{validateDataHoraApontamento(dataBudget.statusSituacao[1].dataHoraInicio)}</td>
                                                    <td>
                                                        {validadeUserApontamentoDiferenteNulo(dataBudget.statusSituacao[1].usuarioApontamentoInicio).nome}
                                                    </td>
                                                    <td>{validateDataHoraApontamento(dataBudget.statusSituacao[1].dataHoraFim)}</td>
                                                    <td>
                                                        {validadeUserApontamentoDiferenteNulo(dataBudget.statusSituacao[1].usuarioApontamentoFim).nome}
                                                    </td>
                                                    <td className={style.actionApontamento} onClick={() => {
                                                        if (ValidateAguardandoAtribuicao(dataBudget.status) !== "") {
                                                            setStatus(() => dataBudget.status === "AGUARDANDO ATRIBUIÇÃO" ?
                                                                EStatus.STATUS_AGUARDANDO_ORCAMENTO :
                                                                EStatus.STATUS_AGUARDANDO_LIBERACAO_ORCAMENTO)
                                                            setNumeroStatus(() => parseInt(dataBudget.statusSituacao[1].statusId))
                                                            setToogleConfirmStaus((current) => !current)
                                                        }
                                                    }} >
                                                        <p>{ValidateAguardandoAtribuicao(dataBudget.status)} </p>
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
                                                        {/* <div className={toogleNotification ?
                                                            style.descriptionNotification :
                                                            style.descriptionNotification_close} >

                                                        </div> */}
                                                        <p>
                                                            NEGOCIAÇÃO
                                                        </p>
                                                    </td>
                                                    <td>{validateDataHoraApontamento(dataBudget.statusSituacao[2].dataHoraInicio)}</td>
                                                    <td>
                                                        {validadeUserApontamentoDiferenteNulo(dataBudget.statusSituacao[2].usuarioApontamentoInicio).nome}
                                                    </td>
                                                    <td>{validateDataHoraApontamento(dataBudget.statusSituacao[2].dataHoraFim)}</td>
                                                    <td>
                                                        {validadeUserApontamentoDiferenteNulo(dataBudget.statusSituacao[2].usuarioApontamentoFim).nome}
                                                    </td>
                                                    <td className={style.actionApontamento} >
                                                        {ValidateAguardandoOrcamento(dataBudget.status) ?
                                                            <>
                                                                <p onClick={() => {
                                                                    setStatus(() => EStatus.STATUS_AGUARDANDO_MANUTENCAO)
                                                                    setNumeroStatus(() => parseInt(dataBudget.statusSituacao[2].statusId))
                                                                    setToogleConfirmStaus((current) => !current)
                                                                }} className={style.aprovado} > ORÇAMENTO APROVADO</p>
                                                                <p onClick={() => {
                                                                    setStatus(() => EStatus.STATUS_ORCAMENTO_RECUSADO)
                                                                    setNumeroStatus(() => parseInt(dataBudget.statusSituacao[2].statusId))
                                                                    setToogleConfirmStaus((current) => !current)
                                                                }} className={style.reprovado} > ORÇAMENTO REPROVADO</p>
                                                            </>
                                                            :
                                                            <p></p>
                                                        }
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
                                                        {/* <div className={toogleNotification ?
                                                            style.descriptionNotification :
                                                            style.descriptionNotification_close} >

                                                        </div> */}
                                                        <p>
                                                            MANUTENÇÃO
                                                        </p>
                                                    </td>
                                                    <td>{validateDataHoraApontamento(dataBudget.statusSituacao[6].dataHoraInicio)}</td>
                                                    <td>
                                                        {validadeUserApontamentoDiferenteNulo(dataBudget.statusSituacao[6].usuarioApontamentoInicio).nome}
                                                    </td>
                                                    <td>{validateDataHoraApontamento(dataBudget.statusSituacao[7].dataHoraInicio)}</td>
                                                    <td>
                                                        {validadeUserApontamentoDiferenteNulo(dataBudget.statusSituacao[7].usuarioApontamentoInicio).nome}
                                                    </td>
                                                    <td className={style.actionApontamento} onClick={() => {
                                                        if (ValidateAguardandoManutencao(dataBudget.status) !== "") {
                                                            setStatus((current) => {
                                                                const text = ValidateAguardandoManutencao(dataBudget.status);
                                                                switch (text) {
                                                                    case "INICIAR MANUTENÇÃO":
                                                                        return EStatus.STATUS_EM_MANUTENCAO;
                                                                    case "FINALIZAR MANUTENÇÃO":
                                                                        return EStatus.STATUS_MANUTENCAO_FINALIZA
                                                                    default:
                                                                        return current
                                                                }
                                                            })
                                                            setNumeroStatus((current) => {
                                                                const text = ValidateAguardandoManutencao(dataBudget.status);
                                                                switch (text) {
                                                                    case "INICIAR MANUTENÇÃO":
                                                                        return parseInt(dataBudget.statusSituacao[5].statusId);
                                                                    case "FINALIZAR MANUTENÇÃO":
                                                                        return parseInt(dataBudget.statusSituacao[6].statusId)
                                                                    default:
                                                                        return current
                                                                }

                                                            })
                                                            setToogleConfirmStaus((current) => !current)
                                                        }
                                                    }} >
                                                        <p>{ValidateAguardandoManutencao(dataBudget.status)}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>LIMPEZA</td>
                                                    <td>{validateDataHoraApontamento(dataBudget.statusSituacao[7].dataHoraInicio)}</td>
                                                    <td>
                                                        {validadeUserApontamentoDiferenteNulo(dataBudget.statusSituacao[7].usuarioApontamentoInicio).nome}
                                                    </td>
                                                    <td>{validateDataHoraApontamento(dataBudget.statusSituacao[7].dataHoraFim)}</td>
                                                    <td>
                                                        {validadeUserApontamentoDiferenteNulo(dataBudget.statusSituacao[7].usuarioApontamentoFim).nome}
                                                    </td>
                                                    <td className={style.actionApontamento} onClick={() => {
                                                        if (ValidateLimpandoMaquina(dataBudget.status) !== "") {
                                                            setStatus((cuurent) => {
                                                                const text = ValidateLimpandoMaquina(dataBudget.status);
                                                                switch (text) {
                                                                    case "FINALIZAR":
                                                                        return EStatus.STATUS_FINALIZADO;
                                                                    default:
                                                                        return cuurent
                                                                }
                                                            })
                                                            setNumeroStatus(() => parseInt(dataBudget.statusSituacao[5].statusId))
                                                            setToogleConfirmStaus((current) => !current)
                                                        }
                                                    }} >
                                                        <p>{ValidateLimpandoMaquina(dataBudget.status)} </p>
                                                    </td>
                                                </tr>
                                            </>
                                        )}

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

export { InfoForm, Fetchdata }

