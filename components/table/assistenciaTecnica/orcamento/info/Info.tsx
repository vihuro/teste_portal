import style from "./style.module.css";
import { Icons } from "../../../../utils/IconDefault";
import InputUi from "../../../../UI/input/Input";
import Api from "../../../../../service/api/assistenciaTecnica/Assistencia";
import { useEffect, useRef, useState } from "react";
import { DateTimeStringFormat } from "../../../../utils/DateTimeString";
import { Card as CardFilter } from "./filterPecas/Pecas";
import { Form as FormDiario } from "./Diario/CardDiario";
import CardSugestao from "../Sugestao/CardSugestao";
import Obser from "./obs/Card";
import {
  IOrcamentoProps,
  IUsuarioApontamentoSituacaoProps,
  ITechnicianProps,
  EStatus,
  IPecasProps,
} from "../IOrcamento";
import {
  handleTouchEnd,
  handleTouchStart,
} from "../../../../utils/HandleTouch";
import ConfirmStatus from "./ConfirmChangeStatus/Confirm";
import CardHistoric from "./historicMachine/Historic";
import SearchInfoOfUserOnToken from "../../../../utils/SearchInfoOfUserOnToken";

interface props {
  changeToogle: Function;
  numeroOrcamento: number;
  valueToogle: boolean;
}

function DataBudget() {
  const [data, setData] = useState<IOrcamentoProps>();

  return {
    data,
    setData,
  };
}
function DataTechnician() {
  const [data, setData] = useState<ITechnicianProps[]>([]);

  return {
    data,
    setData,
  };
}
const Loading = () => {
  const [loading, setLoading] = useState<boolean>(true);

  return {
    loading,
    setLoading,
  };
};

function Fetchdata({ id }: { id: number }) {
  const { data: dataBudget, setData: setDataBudget } = DataBudget();
  const { data: dataTechnician, setData: setDateTechnician } = DataTechnician();

  const { loading, setLoading } = Loading();

  function getByNumeroOrcamento() {
    Api.get(`/orcamento/${id}`)
      .then((res) => {
        setLoading(() => false);
        setDataBudget(() => res.data);
      })
      .catch((err) => console.log(err));
  }
  function getListTechnician() {
    Api.get("/tecnico")
      .then((res) => setDateTechnician(res.data))
      .catch((err) => console.log(err));
  }

  return {
    dataBudget,
    loading,
    setDataBudget,
    setLoading,
    getByNumeroOrcamento,
    getListTechnician,
    dataTechnician,
    setDateTechnician,
  };
}

function validadeUserApontamentoDiferenteNulo(
  usuarioApontamento: IUsuarioApontamentoSituacaoProps
) {
  if (!usuarioApontamento)
    return {
      nome: "",
      apelido: "",
    };

  const usuarioApontamentoValido = {
    nome: usuarioApontamento.usuarioApotamentoNome,
    apelido: usuarioApontamento.usuarioApontamentoApelido,
  };

  return usuarioApontamentoValido;
}
function validateDataHoraApontamento(dateApontamento: Date) {
  if (DateTimeStringFormat(dateApontamento) === "01-01-1 00:00")
    return "00-00-0000 00:00";

  return DateTimeStringFormat(dateApontamento);
}
function InfoForm({ changeToogle, numeroOrcamento, valueToogle }: props) {
  const { Input } = InputUi();
  const touchTimeout = useRef(null);
  const { tokenInfo } = SearchInfoOfUserOnToken;

  const [tecnicoOrcamento, setTecnicoOrcamento] = useState<ITechnicianProps>();
  const [tecnicoManutencao, setTecnicoManutencao] =
    useState<ITechnicianProps>();

  const {
    dataBudget,
    loading,
    setDataBudget,
    dataTechnician,
    setDateTechnician,
    setLoading,
    getByNumeroOrcamento,
    getListTechnician,
  } = Fetchdata({ id: numeroOrcamento });

  useEffect(() => {
    if (dataBudget) {
      setDataBudget(undefined);
      setLoading(true);
    }
  }, [numeroOrcamento]);

  useEffect(() => {
    if (valueToogle) {
      getByNumeroOrcamento();
      getListTechnician();
    }
  }, [valueToogle]);

  useEffect(() => {
    if (dataBudget) {
      setTecnicoOrcamento(() => dataBudget.tecnicoOrcamento);
      setTecnicoManutencao(() => dataBudget.tecnicoManutencao);
    }
  }, [dataBudget]);

  const [toogleNotification, setToogleNotification] = useState<boolean>(false);
  const [listTecnicoOrcamento, setListTecnicoOrcamento] =
    useState<boolean>(false);
  const [listTecnicoManutecao, setListTecnicoManutencao] =
    useState<boolean>(false);

  const [toogleFilterPecas, setToogleFilterPecas] = useState<boolean>(false);
  const [toogleDiario, setToogleDiario] = useState<boolean>(false);
  const [toogleConfirmStatus, setToogleConfirmStaus] = useState<boolean>(false);
  const [toogleConfirmTecnicoManutencao, setToogleConfirmTecnicoManutencao] =
    useState<boolean>(false);
  const [toogleConfirmTecnicoOrcamento, setToogleConfirmTecnicoOrcamento] =
    useState<boolean>(false);
  const [toogleCardRemoverPeca, setToolgeRemoverCard] =
    useState<boolean>(false);
  const [toogleCardSugestao, setToogleCardSugestao] = useState<boolean>(false);
  const [toogleHistoric, setToogleHistoric] = useState<boolean>(false);

  const [status, setStatus] = useState(
    EStatus.STATUS_AGUARDANDO_LIBERACAO_ORCAMENTO
  );
  const [numeroStatus, setNumeroStatus] = useState<number>(0);

  const [tempoEstimaOrcamento, setTempoEstimadoOrcamento] = useState<number>(0);

  const [pecaDelete, setPecaDelet] = useState<IPecasProps | undefined>();

  const [indexSituacao, setIndexSituacao] = useState<string | undefined>();

  function changeToogleFilterParts() {
    setToogleFilterPecas((current) => !current);
  }

  function ValidateServiceExternal() {
    if (!dataBudget) return false;

    const validate = ValidateRuleUser();

    if (!ValidateRuleUser() && !dataBudget.externo) return false;

    return true;
  }
  function ValidateRuleUser() {
    if (
      tokenInfo["GERENCIAL"] === "TI" ||
      tokenInfo["ASSISTÊNCIA TÉCNICA"] === "ADM"
    )
      return true;

    return false;
  }
  function ValidateStatusNotManutencaoFinalizada() {
    if (dataBudget && dataBudget.status !== "MANUTENÇÃO FINALIZADA")
      return true;

    return false;
  }
  function ValidateRuleForRequestParts() {
    if (
      tokenInfo["GERENCIAL"] === "TI" ||
      tokenInfo["ASSISTÊNCIA TÉCNICA"] === "ADM"
    ) {
      return true;
    } else if (
      tokenInfo["ASSISTÊNCIA TÉCNICA"] === "TÉCNICO" &&
      dataBudget?.status === "AGURDANDO ORÇAMENTO"
    ) {
      return true;
    } else {
      return false;
    }
  }

  async function deletePeca() {
    const { tokenInfo } = SearchInfoOfUserOnToken;
    const deletePecaNoORcamento = {
      pecaNoOrcamentoId: pecaDelete?.id,
      ususarioId: tokenInfo.idUser,
    };

    await Api.delete("orcamento/pecas", {
      data: deletePecaNoORcamento,
    })
      .then((res) => {
        getByNumeroOrcamento();
      })
      .catch((err) => console.log(err));
  }

  async function insertTecnicoNoOrcamento() {
    const { tokenInfo } = SearchInfoOfUserOnToken;

    const obj = {
      tecnicoId: tecnicoOrcamento?.idTecnico,
      usuarioAlteracaoId: tokenInfo.idUser,
      orcamentoId: numeroOrcamento,
      tempoEstimadoOrcamento: tempoEstimaOrcamento,
    };

    await Api.put("orcamento/insert-tecnico", obj)
      .then((res) => {
        getByNumeroOrcamento();
      })
      .catch((err) => console.log(err));
  }
  function ValidateAguardandoAtribuicao({
    text,
    statusId,
  }: {
    text: string;
    statusId: number;
  }) {
    switch (text) {
      case "AGUARDANDO ATRIBUIÇÃO":
        return <p></p>;
      case "AGUARDANDO ORÇAMENTO":
        return (
          <p
            onClick={() => {
              setStatus(() => EStatus.STATUS_AGUARDANDO_ORCAMENTO);
              setNumeroStatus(() => statusId);
              setToogleConfirmStaus((current) => !current);
            }}
          >
            INICIAR ORÇAMENTO
          </p>
        );
      case "ORÇANDO":
        return (
          <p
            onClick={() => {
              setStatus(() => EStatus.STATUS_AGUARDANDO_LIBERACAO_ORCAMENTO);
              setNumeroStatus(() => statusId);
              setToogleConfirmStaus((current) => !current);
            }}
          >
            FINALIZAR ORÇAMENTO
          </p>
        );
      default:
        return <p></p>;
    }
  }
  function ValidateAguardandoOrcamento({
    text,
    statusId,
  }: {
    text: string;
    statusId: number;
  }) {
    if (
      tokenInfo["GERENCIAL"] !== "TI" &&
      tokenInfo["ASSISTÊNCIA TÉCNICA"] !== "ADM"
    )
      return <p></p>;

    switch (text) {
      case "AGUARDANDO LIBERAÇÃO DO ORÇAMENTO":
        return (
          <>
            <p
              onClick={() => {
                setStatus(() => EStatus.STATUS_AGUARDANDO_SEPARACAO_PECAS);
                setNumeroStatus(() => statusId);
                setToogleConfirmStaus((current) => !current);
              }}
              className={style.aprovado}
            >
              ORÇAMENTO APROVADO
            </p>
            <p
              onClick={() => {
                setStatus(() => EStatus.STATUS_ORCAMENTO_RECUSADO);
                setNumeroStatus(() => statusId);
                setToogleConfirmStaus((current) => !current);
              }}
              className={style.reprovado}
            >
              ORÇAMENTO RECUSADO
            </p>
          </>
        );
      default:
        return <p></p>;
    }
  }
  function ValidateAguardandoSeparacaoPecas({
    text,
    statusId,
  }: {
    text: string;
    statusId: number;
  }) {
    if (
      tokenInfo["GERENCIAL"] !== "TI" &&
      tokenInfo["ASSISTÊNCIA TÉCNICA"] !== "ADM"
    )
      return <p></p>;

    switch (text) {
      case "AGUARDANDO PEÇAS":
        return (
          <>
            <p
              onClick={() => {
                setStatus(() => EStatus.STATUS_SEPARACAO_PECAS_FINALIZADA);
                setNumeroStatus(() => statusId);
                setToogleConfirmStaus((current) => !current);
              }}
            >
              FINALIZAR SEPARAÇÃO DE PEÇAS
            </p>
          </>
        );
      default:
        return <p></p>;
    }
  }
  function ValidateAguardandoManutencao({
    text,
    statusId,
  }: {
    text: string;
    statusId: number;
  }) {
    switch (text) {
      case "AGUARDANDO MANUTENÇÃO":
        return (
          <p
            onClick={() => {
              setStatus(() => EStatus.STATUS_EM_MANUTENCAO);
              setNumeroStatus(() => statusId);
              setToogleConfirmStaus((current) => !current);
            }}
          >
            INICIAR MANUTENÇÃO
          </p>
        );
      case "MANUTENÇÃO INICIADA":
        return (
          <p
            onClick={() => {
              setStatus(() => EStatus.STATUS_MANUTENCAO_FINALIZA);
              setNumeroStatus(() => statusId);
              setToogleConfirmStaus((current) => !current);
            }}
          >
            FINALIZAR MANUTENÇÃO
          </p>
        );
      default:
        return <p></p>;
    }
  }
  function ValidateLimpandoMaquina(text: string) {
    switch (text) {
      case "REALIZANDO LIMPEZA":
        return "FINALIZAR";
      default:
        return "";
    }
  }

  function validateStatus({
    index,
    statusId,
  }: {
    index: number;
    statusId: string;
  }) {
    if (dataBudget) {
      switch (index) {
        case 0:
          return ValidateAguardandoAtribuicao({
            text: dataBudget?.status,
            statusId: parseInt(statusId),
          });
        case 1:
          return ValidateAguardandoOrcamento({
            text: dataBudget?.status,
            statusId: parseInt(statusId),
          });
        case 2:
          return ValidateAguardandoSeparacaoPecas({
            text: dataBudget?.status,
            statusId: parseInt(statusId),
          });
        case 3:
          return ValidateAguardandoManutencao({
            text: dataBudget?.status,
            statusId: parseInt(statusId),
          });
        default:
          return <p></p>;
      }
    }

    return <p></p>;
  }

  return (
    <main
      className={style.container}
      onClick={(e) => {
        setListTecnicoManutencao(false);
        setListTecnicoOrcamento(false);
      }}
    >
      <div
        className={`${style.containerSugestao} ${
          !toogleCardSugestao && style["--close"]
        }`}
      >
        <CardSugestao
          changeToogle={setToogleCardSugestao}
          maquinaId={dataBudget?.maquina.maquinaClienteId}
        />
      </div>
      {dataBudget && (
        <div
          className={`${style.containerHistoric} ${
            !toogleHistoric && style["--close"]
          }`}
        >
          <CardHistoric
            changeToogle={setToogleHistoric}
            numeroSerie={dataBudget.maquina.numeroSerie}
            toogle={toogleHistoric}
          />
        </div>
      )}

      <div
        className={
          toogleConfirmStatus
            ? style.containerConfirmStatus
            : style.containerConfirmStatus_close
        }
      >
        <ConfirmStatus
          changeInfo={setDataBudget}
          changeToogle={setToogleConfirmStaus}
          typeStatus={status}
          numeroOrcamento={numeroOrcamento}
          numeroStatus={numeroStatus}
          maquinaId={dataBudget ? dataBudget.maquina.maquinaId : ""}
        />
      </div>
      <div
        className={`${style.containerConfirmTecnico} 
            ${!toogleConfirmTecnicoOrcamento && style["--close"]}`}
      >
        <div className={style.cardConfirmTecnico}>
          <span>
            Deseja atribuir esse orçamento para o técnico
            <strong> {tecnicoOrcamento?.nome}?</strong>
            <br />
            Se sim, coloque a estimativa de minutos para esse orçamento!
          </span>
          <div className={style.container_input_horas}>
            <div>
              <input
                id="txtHorasCard"
                required
                type="number"
                value={tempoEstimaOrcamento}
                onChange={(e) =>
                  setTempoEstimadoOrcamento(Number(e.target.value))
                }
              />
              <label htmlFor="txtHorasCard">MINUTOS</label>
            </div>
          </div>
          <div className={style.container_button_card_horas}>
            <button
              onClick={() => {
                insertTecnicoNoOrcamento();
              }}
            >
              ATRIBUIR
            </button>
            <button
              onClick={() =>
                setToogleConfirmTecnicoOrcamento((current) => !current)
              }
            >
              FECHAR
            </button>
          </div>
        </div>
      </div>
      <div
        className={`${style.containerConfirmTecnico} 
            ${!toogleConfirmTecnicoManutencao && style["--close"]}`}
      >
        <div className={style.cardConfirmTecnico}>
          <span>
            Deseja atribuir esse manutenção para o técnico
            <strong> {tecnicoManutencao?.nome}?</strong>?
            <br />
            Se sim, coloque a estimativa em minutos para essa manutenção!
          </span>
          <div className={style.container_input_horas}>
            <div>
              <input
                id="txtHorasCard"
                required
                type="number"
                value={tempoEstimaOrcamento}
                onChange={(e) =>
                  setTempoEstimadoOrcamento(Number(e.target.value))
                }
              />
              <label htmlFor="txtHorasCard">MINUTOS</label>
            </div>
          </div>
          <div className={style.container_button_card_horas}>
            <button
              onClick={() => {
                // insertTecnicoNoOrcamento();
              }}
            >
              ATRIBUIR
            </button>
            <button
              onClick={() =>
                setToogleConfirmTecnicoManutencao((current) => !current)
              }
            >
              FECHAR
            </button>
          </div>
        </div>
      </div>
      {pecaDelete && (
        <div
          className={`${style.containerExcluirPeca}
                ${!toogleCardRemoverPeca && style["--close"]}`}
        >
          <div className={style.cardExcluirPeca}>
            <span>
              Deseja mesmo remover a peça
              <strong>
                {" "}
                {pecaDelete.codigoPeca} ({pecaDelete.descricaoPeca})?
              </strong>
            </span>
            <div className={style.container_button_excluirPecas}>
              <button
                onClick={() => {
                  deletePeca(), setToolgeRemoverCard((current) => !current);
                }}
              >
                SIM
              </button>
              <button
                onClick={() => setToolgeRemoverCard((current) => !current)}
              >
                NÃO
              </button>
            </div>
          </div>
        </div>
      )}
      <div
        className={
          toogleFilterPecas
            ? style.containerFilter
            : style.containerFilter_close
        }
      >
        <div className={style.wrapContainerFilter}>
          <CardFilter
            changeToogle={setToogleFilterPecas}
            toogle={toogleFilterPecas}
            refreshInfo={getByNumeroOrcamento}
            numeroOrcamento={numeroOrcamento}
          />
        </div>
      </div>
      <div
        className={
          toogleDiario ? style.containerDiario : style.containerDiario_close
        }
      >
        <div className={style.wrapDiario}>
          <FormDiario changeToogle={setToogleDiario} />
        </div>
      </div>
      <header className={style.container_header}>
        <div className={style.containerActions}>
          <div className={style.container_buttonBack}>
            <button
              title="Voltar"
              onClick={() => {
                setDataBudget(undefined);
                changeToogle(false);
                setLoading(true);
              }}
            >
              <Icons.ArrowLeft
                onClick={() => {
                  changeToogle(false);
                }}
              />
            </button>
          </div>
          <div className={style.container_history}>
            <button onClick={() => setToogleHistoric((current) => !current)}>
              <Icons.Historic />
            </button>
          </div>
          <div className={style.containerButtonDaily}>
            <button
              title="Diário"
              onClick={() => setToogleDiario((current) => !current)}
            >
              <Icons.Book />
            </button>
          </div>
          <div className={style.containerButtonDailyDir}>
            <button
              title="Diário privado"
              onClick={() => setToogleDiario((current) => !current)}
            >
              <Icons.Book />
            </button>
          </div>
          <div className={style.containerButtonSugestao}>
            <button
              onClick={() => setToogleCardSugestao((current) => !current)}
            >
              <Icons.InfoIdea />
            </button>
          </div>
          <div title="Mapa" className={style.containerMap}>
            {dataBudget && ValidateServiceExternal() && (
              <a
                target="_blank"
                href={` https://www.google.com/maps/search/?api=1&query=
                                    ${
                                      dataBudget?.cliente.rua +
                                      dataBudget?.cliente.numeroEstabelecimento
                                    }`}
              >
                <Icons.Map />
              </a>
            )}
          </div>
        </div>
        <div className={style.containerNumeroOrcamento}>
          <Input
            id="txtNumeroOrcamentoInfo"
            text="Nº ORÇAMENTO"
            value={numeroOrcamento}
            onChange={() => {}}
            blocked
          />
        </div>
        <div className={style.containerStatusOrcamento}>
          <p className={style.status}>
            {dataBudget ? dataBudget.status : ""}
            {dataBudget && dataBudget.externo ? " - (EXTERNO)" : " - (INTERNO)"}
          </p>
        </div>
      </header>
      <main
        className={
          loading ? style.container_body_loading : style.container_body
        }
      >
        <div className={style.wrapContainer_body}>
          <div
            className={`${style.containerCodigoCliente} 
                    ${!ValidateServiceExternal() && style["--block"]}`}
          >
            <Input
              id="txtCodigoClienteInfo"
              text="CÓDIGO CLIENTE"
              value={dataBudget ? dataBudget.cliente.codigoRadar : ""}
              onChange={() => {}}
              blocked
            />
          </div>
          <div
            className={`${style.containerNomeCliente}
                    ${!ValidateServiceExternal() && style["--block"]}`}
          >
            <Input
              id="txtNomeClienteInfo"
              text="NOME CLIENTE"
              value={dataBudget ? dataBudget.cliente.nomeCliente : ""}
              onChange={() => {}}
              blocked
            />
          </div>
          <div
            className={`${style.containerCNPJCliente}
                    ${!ValidateServiceExternal() && style["--block"]}`}
          >
            <Input
              id="txtCnpjClienteInfo"
              text="CNPJ"
              value={dataBudget ? dataBudget.cliente.cnpj : ""}
              onChange={() => {}}
              blocked
            />
          </div>
          <div
            className={`${style.containerCEPCliente}
                    ${!ValidateServiceExternal() && style["--block"]}`}
          >
            <Input
              id="txtCEPClienteInfo"
              text="CEP"
              value={dataBudget ? dataBudget.cliente.cep : ""}
              onChange={() => {}}
              blocked
            />
          </div>
          <div
            className={`${style.containerRuaCliente}
                    ${!ValidateServiceExternal() && style["--block"]}`}
          >
            <Input
              id="txtRuaEnderecoInfo"
              text="RUA"
              value={dataBudget ? dataBudget.cliente.rua : ""}
              onChange={() => {}}
              blocked
            />
          </div>
          <div
            className={`${style.containerNumeroEstabelecimento}
                    ${!ValidateServiceExternal() && style["--block"]}`}
          >
            <Input
              id="txtNumeroEstabelecimentoInfo"
              text="Nº ESTELECIMENTO"
              value={dataBudget ? dataBudget.cliente.numeroEstabelecimento : ""}
              onChange={() => {}}
              blocked
            />
          </div>
          <div
            className={`${style.containerCidadeCliente}
                    ${!ValidateServiceExternal() && style["--block"]}`}
          >
            <Input
              id="txtCidadeClienteInfo"
              text="CIDADE"
              value={dataBudget ? dataBudget.cliente.cidade : ""}
              onChange={() => {}}
              blocked
            />
          </div>
          <div
            className={`${style.containerRegiaoCliente}
                    ${!ValidateServiceExternal() && style["--block"]}`}
          >
            <Input
              id="txtRegiaoClienteInfo"
              text="REGIÃO"
              value={dataBudget ? dataBudget.cliente.regiao : ""}
              onChange={() => {}}
              blocked
            />
          </div>
          <div
            className={`${style.containerComplementoCliente}
                    ${!ValidateServiceExternal() && style["--block"]}`}
          >
            <Input
              id="txtComplementoClienteInfo"
              text="COMPLEMENTO"
              value={dataBudget ? dataBudget.cliente.cidade : ""}
              onChange={() => {}}
              blocked
            />
          </div>
          <div
            className={`${style.containerNomeContatoCliente}
                    ${!ValidateServiceExternal() && style["--block"]}`}
          >
            <Input
              id="txtNomeContatoCliente"
              text="CONT. CLIENTE"
              value={dataBudget ? dataBudget.cliente.contatoNomeCliente : ""}
              onChange={() => {}}
              blocked
            />
          </div>
          <div
            className={`${style.containerTelefoneContatoCliente}
                    ${!ValidateServiceExternal() && style["--block"]}`}
          >
            <Input
              id="txtTelefoneContatoCliente"
              text="TEL/ CLIENTE"
              value={
                dataBudget ? dataBudget.cliente.contatoTelefoneCliente : ""
              }
              onChange={() => {}}
              blocked
            />
          </div>
          <div className={`${style.containerDescricaoServico}`}>
            <Input
              id="txtDescricaoServico"
              text="DESCRIÇÃO SERVIÇO"
              value={dataBudget ? dataBudget.descricaoServico : ""}
              onChange={() => {}}
              blocked
            />
          </div>
          <div
            className={style.containerTecnicoOrcamento}
            onClick={(e) => e.stopPropagation()}
          >
            <input
              type="text"
              required
              autoComplete="off"
              id="txtTecnicoOrcamento"
              value={
                dataBudget && dataBudget.tecnicoOrcamento
                  ? dataBudget.tecnicoOrcamento.nome
                  : ""
              }
              onChange={() => {}}
              onClick={() => {
                if (
                  ValidateRuleUser() &&
                  ValidateStatusNotManutencaoFinalizada()
                )
                  setListTecnicoOrcamento(!listTecnicoOrcamento);
              }}
            />
            <label htmlFor="txtTecnicoOrcamento">TÉCNICO ORÇ.</label>
            <ul
              className={
                listTecnicoOrcamento
                  ? style.listTecnicoOrcamento
                  : style.listTecnicoOrcamento_close
              }
            >
              {dataTechnician &&
                dataTechnician.map((item, index) => (
                  <li
                    onClick={() => {
                      setListTecnicoOrcamento(false);
                      setTecnicoOrcamento(item);
                      setToogleConfirmTecnicoOrcamento((current) => !current);
                    }}
                    key={index}
                  >
                    {item.nome}
                  </li>
                ))}
            </ul>
          </div>
          <div className={style.containerTempoEstimadoOrcamento}>
            <input
              type="number"
              onChange={() => {}}
              value={
                dataBudget ? dataBudget.tempoEstimadoOrcamento.toString() : 0
              }
            />
            <label htmlFor="">TEMPO - ORÇ.</label>
          </div>
          <div className={style.containerTempoEstimadoManutencao}>
            <input
              type="number"
              onChange={() => {}}
              value={
                dataBudget ? dataBudget.tempoEstimadoManutencao.toString() : 0
              }
            />
            <label htmlFor="">TEMPO - MANUT.</label>
          </div>
          <div
            className={style.containerTecnicoManutencao}
            onClick={(e) => e.stopPropagation()}
          >
            <input
              type="text"
              required
              autoComplete="off"
              id="txtTecnicoManutencao"
              value={
                dataBudget && dataBudget?.tecnicoManutencao
                  ? dataBudget.tecnicoManutencao.nome
                  : ""
              }
              onChange={() => {}}
              onClick={() => {
                if (
                  ValidateRuleUser() &&
                  ValidateStatusNotManutencaoFinalizada()
                )
                  setListTecnicoManutencao(!listTecnicoManutecao);
              }}
            />
            <label htmlFor="txtTecnicoManutencao">TÉCNICO MANUT.</label>
            <ul
              className={
                listTecnicoManutecao
                  ? style.listTecnicoOrcamento
                  : style.listTecnicoOrcamento_close
              }
            >
              {dataTechnician &&
                dataTechnician.map((item, index) => (
                  <li
                    onClick={() => {
                      setToogleConfirmTecnicoManutencao((current) => !current);
                      setListTecnicoManutencao(false);
                      setTecnicoManutencao(item);
                    }}
                    key={index}
                  >
                    {item.nome}
                  </li>
                ))}
            </ul>
          </div>
          <div className={style.containerMaquina}>
            <div className={style.container_infoMaquina}>
              <Input
                id="txtMaquinaClienteInfo"
                text="MÁQUINA"
                value={dataBudget ? dataBudget.maquina.codigoMaquina : ""}
                onChange={() => {}}
                blocked
              />
              <Input
                id="txtDescricaoMaquinaCliente"
                text="DESCRIÇÃO"
                value={dataBudget ? dataBudget.maquina.descricaoMaquina : ""}
                onChange={() => {}}
                blocked
              />
              <Input
                id="txtNumeroSerieMaquinaCliente"
                text="Nº SÉRIE"
                value={dataBudget ? dataBudget.maquina.numeroSerie : ""}
                onChange={() => {}}
                blocked
              />
            </div>
            <div
              className={style.containerTablePecas}
              onDoubleClick={() => {
                if (ValidateRuleForRequestParts())
                  setToogleFilterPecas((current) => (current = !current));
              }}
              onTouchStart={() => {
                if (ValidateRuleForRequestParts()) {
                  handleTouchStart({
                    action: changeToogleFilterParts,
                    touchTimeout: touchTimeout,
                  });
                }
              }}
              onTouchEnd={() => {
                if (ValidateRuleForRequestParts()) {
                  handleTouchEnd({
                    touchTimeout: touchTimeout,
                  });
                }
              }}
            >
              <div className={style.wrapContainerTable}>
                <table className={style.table}>
                  <thead>
                    <tr>
                      <th>CÓDIGO PEÇA</th>
                      <th>DESCRIÇÃO </th>
                      <th>QTD</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody className={style.container_tableBody}>
                    {dataBudget &&
                      dataBudget.maquina &&
                      dataBudget.maquina.pecas.map((item, index) => (
                        <tr key={index}>
                          <td>{item.codigoPeca}</td>
                          <td>{item.descricaoPeca}</td>
                          <td>{item.quantidade}</td>
                          <td
                            className={style["button-delete"]}
                            onClick={() => {
                              setPecaDelet(() => item);
                              setToolgeRemoverCard((current) => !current);
                            }}
                          >
                            <Icons.Delete />
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className={style.containerStatus}>
              <div className={style.wrapContainerStatus}>
                <table className={style.table_status}>
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
                  <tbody className={style.container_tableBody_status}>
                    {dataBudget && dataBudget.statusSituacao.length > 0 && (
                      <>
                        {dataBudget.statusSituacao.map((item, index) => (
                          <tr key={index}>
                            <td className={style.container_notification}>
                              <div
                                className={style.tag_notification}
                                onClick={() => {
                                  if (item.statusId === indexSituacao) {
                                    setToogleNotification(
                                      (current) => !current
                                    );
                                  } else if (
                                    item.statusId !== indexSituacao &&
                                    toogleNotification
                                  ) {
                                    setIndexSituacao(() => item.statusId);
                                  } else {
                                    setIndexSituacao(() => item.statusId);
                                    setToogleNotification(
                                      (current) => !current
                                    );
                                  }
                                }}
                              >
                                <Icons.BellNotification />
                              </div>
                              <div
                                className={`${style.descriptionNotification} ${
                                  toogleNotification &&
                                  indexSituacao === item.statusId
                                    ? ""
                                    : style["--close"]
                                }`}
                              ></div>
                              {item.status}
                            </td>
                            <td>
                              {validateDataHoraApontamento(item.dataHoraInicio)}
                            </td>
                            <td>
                              {
                                validadeUserApontamentoDiferenteNulo(
                                  item.usuarioApontamentoInicio
                                ).nome
                              }
                            </td>
                            <td>
                              {validateDataHoraApontamento(item.dataHoraFim)}
                            </td>
                            <td>
                              {
                                validadeUserApontamentoDiferenteNulo(
                                  item.usuarioApontamentoFim
                                ).nome
                              }
                            </td>
                            <td className={style.actionApontamento}>
                              {validateStatus({
                                index: index,
                                statusId: item.statusId,
                              })}
                            </td>
                          </tr>
                        ))}
                        {/* <tr>
                                                    <td className={style.container_notification} >
                                                        <div className={style.tag_notification} onClick={() => {
                                                            setIndexSituacao(() => 0)
                                                            setToogleNotification((current) => !current)
                                                        }} >
                                                            <Icons.BellNotification />
                                                        </div>
                                                        <div className={toogleNotification && indexSituacao === 0 ?
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
                                                </tr>
                                                <tr>
                                                    <td className={style.container_notification} >
                                                        <div className={style.tag_notification} style={{
                                                            background: "rgb(187,180,180)",
                                                            color: "#5f5b5b"
                                                        }} onClick={() => {
                                                            setIndexSituacao(() => 1)
                                                            setToogleNotification((current) => !current)
                                                        }} >
                                                            <Icons.BellNotification />
                                                        </div>
                                                        <div className={toogleNotification && indexSituacao === 1 ?
                                                            style.descriptionNotification :
                                                            style.descriptionNotification_close} >
                                                            <Obser text={dataBudget.statusSituacao[3].observacao} />
                                                        </div>
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
                                                </tr> */}
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
  );
}

export { InfoForm, Fetchdata };
