import { useEffect, useState } from "react";
import ButtonUi from "../../../../UI/button/Button";
import InputUi from "../../../../UI/input/Input";
import style from "./style.module.css";
import Message from "../../../../message/Message";
import Loading from "../../../../loading/Loading";
import Api from "../../../../../service/api/assistenciaTecnica/Assistencia";
import RadioButton from "../../../../UI/input/radio/RadioButton";
import InfoUser from "../../../../utils/SearchInfoOfUserOnToken";
import { IReturSugestao } from "../../orcamento/Sugestao/ISugestao";
import {
  FetchSugestao,
  FetchSugestaoByMaquinaId,
} from "../../orcamento/Sugestao/Sugestao.Functions";
import CardSugestao from "../../orcamento/Sugestao/CardSugestao";
import { Icons } from "../../../../utils/IconDefault";
import { maquinaReturnProps } from "../IClienteAssistencia";
import { GetHistorico } from "../../orcamento/Orcamento.Functions";
import { IOrcamentoProps } from "../../orcamento/IOrcamento";
import { DateTimeStringFormat } from "../../../../utils/DateTimeString";

interface props {
  changeToogle: Function;
  cliente?: dataProps;
  refreshTable: Function;
  maquinaId?: string;
  toogle: boolean;
}

interface dataProps {
  idCliente: string;
  cnpj: string;
  codigoRadar: string;
  contatoTelefone: string;
  contatoNome: string;
  nome: string;
  cadastro: userProps;
  alteracao: userProps;
  maquinaCliente: maquinaReturnProps;
  cep: string;
  estado: string;
  cidade: string;
  regiao: string;
  rua: string;
  complemento: string;
  numeroEstabelecimento: string;
}

interface userProps {
  usuarioId: string;
  nome: string;
  apelido: string;
  dataHora: Date;
}

const { tokenInfo } = InfoUser;

export default function Card({
  changeToogle,
  cliente,
  maquinaId,
  refreshTable,
  toogle,
}: props) {
  const { Input } = InputUi();
  const { Button } = ButtonUi();

  const [toogleLoading, setToogleLoading] = useState<boolean>(false);
  const [toogleMessage, setToogleMessage] = useState<boolean>(false);
  const [dataMessage, setDataMessage] = useState({
    message: "",
    type: "WARNING",
  });
  const [externo, setExterno] = useState<boolean>(false);
  const [descricaoServico, setDescricaoServico] = useState<string>("");

  const [dataSugestoes, setDataSugestoes] = useState<IReturSugestao[]>([]);

  const [toogleCardSugestao, setToogleCardSugestacao] =
    useState<boolean>(false);
  const [historico, setHistorico] = useState<IOrcamentoProps[]>([]);

  async function InsertOrcamento() {
    const obj = {
      descricaoServico: descricaoServico,
      userId: tokenInfo.idUser,
      MaquinaId: cliente?.maquinaCliente.maquinaId,
      externo: externo,
    };
    await Api.post("/orcamento", obj)
      .then(() => {
        setDataMessage({
          message: "Orçamento cadastrado com sucesso!",
          type: "SUCESS",
        });
        setDescricaoServico(() => "");
        refreshTable();
      })
      .catch((err) => {
        if (err && err.response && err.response.data) {
          setDataMessage({
            message: err.response.data,
            type: "WARNING",
          });
        } else {
          setDataMessage({
            message: "ERRO NO SERVIDOR",
            type: "ERROR",
          });
        }
      })
      .finally(() => {
        setToogleLoading(false);
        setToogleMessage(true);
      });
  }
  const { Radio } = RadioButton();

  useEffect(() => {
    if (!toogle || !cliente) return;
    const historicoData = async () => {
      await GetHistorico(cliente.maquinaCliente.numeroSerie)
        .then((res) => setHistorico(() => res))
        .catch((err) => console.log(err));
    };
    historicoData();
  }, [cliente]);

  return (
    <form className={style.card}>
      <div
        className={
          toogleMessage
            ? style.container_message
            : style.container_message_close
        }
      >
        <Message
          stateMessage={toogleMessage}
          message={dataMessage.message}
          action={setToogleMessage}
          type={dataMessage.type}
        />
      </div>
      <div
        className={`${style.containerSugestao} ${
          !toogleCardSugestao && style["--close"]
        }`}
      >
        <CardSugestao
          maquinaId={maquinaId}
          changeToogle={setToogleCardSugestacao}
        />
      </div>
      <div
        className={
          toogleLoading
            ? style.container_loading
            : style.container_loading_close
        }
      >
        <Loading />
      </div>
      <header className={style.container_title}>
        <h3>CRIAR ORÇAMENTO</h3>
      </header>
      <main className={style.container_body}>
        <div className={style.containerRadioButton}>
          <div>
            <button
              title="Sugestões"
              type="button"
              className={style.buttonSugestao}
              onClick={() => setToogleCardSugestacao((current) => !current)}
            >
              <Icons.InfoIdea />
            </button>
            <Radio
              checked={!externo}
              onChange={(e) => {
                setExterno(() => false);
              }}
              id="rdbInterno"
              name="LocalServico"
              text="INTERNO"
              color="purple"
            />
            <Radio
              checked={externo}
              onChange={(e) => {
                setExterno(() => true);
              }}
              id="rdbExterno"
              name="LocalServico"
              text="EXTERNO"
              color="green"
            />
          </div>
        </div>
        <div className={style.container_NomeCliente}>
          <Input
            id="txtClienteOrcamento"
            text="CLIENTE"
            value={cliente ? cliente.nome : ""}
            onChange={() => {}}
            blocked
          />
        </div>
        <div className={style.container_numeroSerie}>
          <Input
            id="txtMaquinaOrcamento2"
            text="Nº SÉRIE"
            value={
              cliente && cliente.maquinaCliente
                ? cliente.maquinaCliente.numeroSerie
                : ""
            }
            onChange={() => {}}
            blocked
          />
        </div>
        <div className={style.container_codigoMaquina}>
          <Input
            id="txtCodigoMaquinaOrcamento"
            text="CÓD. MAQ"
            value={
              cliente && cliente.maquinaCliente
                ? cliente.maquinaCliente.codigoMaquina
                : ""
            }
            onChange={() => {}}
            blocked
          />
        </div>
        <div className={style.container_descricaoMaquina}>
          <Input
            id="txtMaquinaOrcamento"
            text="MÁQUINA"
            value={
              cliente && cliente.maquinaCliente
                ? cliente.maquinaCliente.descricaoMaquina
                : ""
            }
            onChange={() => {}}
            blocked
          />
        </div>
        <div className={style.container_descricaoServico}>
          <Input
            id="txtDescricaoOrcamento"
            text="DESCRIÇÃO"
            autoComplete="off"
            value={descricaoServico}
            onChange={(e) => setDescricaoServico(e.target.value)}
          />
        </div>
        <div className={style.containerHistorico}>
          <span className={style.titleHistorico}>HISTÓRICO</span>
          <div className={style.wrapContainerHistorico}>
            {historico &&
              historico.map((item, index) => (
                <ul className={style.listHistorico} key={index}>
                  Número do orçamento: {item.numeroOrcamento}
                  <li>
                    Técnico da manutenção:{" "}
                    <strong> {item.tecnicoOrcamento.nome}</strong>
                  </li>
                  <li>
                    Data da manutenção:{" "}
                    <strong>
                      {DateTimeStringFormat(item.statusSituacao[3].dataHoraFim)}
                    </strong>
                  </li>
                  <ul >
                    Peças trocadas:
                    <br />
                    Código - Descrição - Quantidade
                    {item.maquina.pecas.map((pecasItem, indexPecasItem) => (
                      <li className={style.listPecas} key={indexPecasItem}>
                        {pecasItem.codigoPeca} - {pecasItem.descricaoPeca} -{" "}
                        {pecasItem.quantidade}
                      </li>
                    ))}
                  </ul>
                </ul>
              ))}
          </div>
        </div>
      </main>
      <footer className={style.footer}>
        <div>
          <Button
            classUi="glass"
            color="green"
            text="ABRIR ORÇAMENTO"
            type="button"
            onClick={() => {
              setToogleLoading(true), InsertOrcamento();
            }}
          />
        </div>
        <div>
          <Button
            classUi="glass"
            color="red"
            text="FECHAR"
            onClick={() => {
              setHistorico(() => []);
              changeToogle(false);
            }}
            type="button"
          />
        </div>
      </footer>
    </form>
  );
}
