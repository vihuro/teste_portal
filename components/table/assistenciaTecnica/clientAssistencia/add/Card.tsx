import style from "./style.module.css";
import ButtonUi from "../../../../UI/button/Button";
import InputUi from "../../../../UI/input/Input";
import { CardFilterMaquinaDisponivel } from "../filterMaquinaDisponivel/Card";
import { useEffect, useRef, useState } from "react";
import Api from "../../../../../service/api/assistenciaTecnica/Assistencia";
import { BiFilterAlt, BiSearchAlt2 } from "react-icons/bi";
import Message from "../../../../message/Message";
import { AiOutlineDelete } from "react-icons/ai";
import Loading from "../../../../loading/Loading";
import { tokenProps } from "../../../../utils/infoToken";
import TokenDrecriptor from "../../../../../service/DecriptorToken";
import { parseCookies } from "nookies";
import { TipoAquisicao, maquinaProps } from "../IClienteAssistencia";
import { DateAndYearStringFormat } from "../../../../utils/DateTimeString";
import { HandleCnpj } from "../../../../utils/HandleCNPJ";
import { InsertClienteProps } from "../ICliente";
import { InsertCliente } from "../Cliente.Functions";
import { ETypeErro } from "../../../../utils/Erro";

interface props {
  changeToogleCard: Function;
  refreshTable: Function;
  toogle: boolean;
}

export default function Card({
  changeToogleCard,
  refreshTable,
  toogle,
}: props) {
  const { Button } = ButtonUi();
  const { Input } = InputUi();

  const [valueCnpj, setValueCnpj] = useState<string>("");
  const [novoCliente, setNovoCliente] = useState<InsertClienteProps>({
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
    contatoTelefone: "",
    maquinas: [],
    userId: "",
  });
  const [listMaquinas, setListMaquina] = useState<maquinaProps[]>([]);
  const [textCep, setTextCep] = useState<string>("");
  const videoRef = useRef(null);
  const [toogleMessage, setToogleMessage] = useState<boolean>(false);
  const [toogleLoading, setToogleLoading] = useState<boolean>(false);
  const [dataMessage, setDataMessage] = useState({
    message: "",
    type: "WARNING",
  });
  const [toogleFilterMaquina, setToogleFilterMaquina] =
    useState<boolean>(false);
  const tokenInfo: tokenProps = TokenDrecriptor(parseCookies().ACCESS_TOKEN);

  const handleChangeCEP = (text: string) => {
    const cep = text.replace(/[^\d./-]/g, "");

    setTextCep(cep);
  };
  async function Cadastrar() {
    setToogleLoading((current) => !current);
    // const {
    //   cnpj,
    //   codigoRadar,
    //   contatoTelefone,
    //   cep,
    //   cidade,
    //   complemento,
    //   estado,
    //   numeroEstabelecimento,
    //   rua,
    //   nome,
    //   nomeContatoCliente,
    //   regiao,
    // } = novoCliente;

    // if (
    //   codigoRadar === "" ||
    //   valueCnpj === "" ||
    //   nome === "" ||
    //   cep === "" ||
    //   rua === "" ||
    //   numeroEstabelecimento === "" ||
    //   cidade === "" ||
    //   estado === "" ||
    //   regiao === ""
    // ) {
    //   setDataMessage({
    //     message: "Campo(s) obrigatório(s) vazio(s)!",
    //     type: "WARNING",
    //   });
    //   setToogleMessage(true);
    //   setToogleLoading((current) => !current);

    //   return;
    // }

    // const obj = {
    //   codigoRadar: codigoRadar,
    //   contatoTelefone: contatoTelefone,
    //   cep: cep,
    //   estado: estado,
    //   cidade: cidade,
    //   rua: rua,
    //   regiao: regiao,
    //   numeroEstabelecimento: numeroEstabelecimento,
    //   complemento: complemento,
    //   nome: nome,
    //   nomeContatoCliente: nomeContatoCliente,
    //   cnpj: valueCnpj.replaceAll(".", "").replace("/", "").replace("-", ""),
    //   userId: tokenInfo.idUser,
    //   maquinas: listMaquinas.map((item) => ({
    //     maquinaId: item.id,
    //     tipoAquisicao: item.tipoAquisicao,
    //     dataSugestaoRetorno: item.dataSugeridaRetorno
    //       ? new Date(item.dataSugeridaRetorno)
    //       : null,
    //   })),
    // };
    const obj: InsertClienteProps = {
      ...novoCliente,
      cnpj: valueCnpj,
      userId: tokenInfo.idUser,
      maquinas: listMaquinas.map((item) => ({
        maquinaId: item.id,
        tipoAquisicao: item.tipoAquisicao,
        dataSugestaoRetorno: item.dataSugeridaRetorno
          ? new Date(item.dataSugeridaRetorno)
          : undefined,
      })),
    };

    setNovoCliente({
      ...novoCliente,
      cnpj: valueCnpj,
    });
    await InsertCliente(obj)
      .then((res) => {
        console.log("then acessado");
        console.log(res);
        setDataMessage(() => ({
          message: "Cliente cadastrados com sucesso!",
          type: "SUCESS",
        }));
        ClearAll();
        refreshTable();
      })
      .catch((err) => {
        console.log(err);
        const validate = err && err.cause;

        console.log(validate);
        if (err && err.cause && err.cause === ETypeErro.CUSTOM_ERROR) {
          console.log("funcionu aqui");
        }
        console.log("dentro do ssssssssss");
        console.log(err);
      })
      .finally(() => {
        setToogleMessage((current) => !current);
        setToogleLoading((current) => !current);
      });
    // await Api.post("/cliente", obj)
    //   .then((res) => {
    //     setDataMessage({
    //       message: "Cliente Cadastrado!",
    //       type: "SUCESS",
    //     });
    //     ClearAll();
    //     refreshTable();
    //   })
    //   .catch((err) => {
    //     if (err.response && err.response.data) {
    //       setDataMessage({
    //         message: err.response.data,
    //         type: "WARNING",
    //       });
    //     } else {
    //       setDataMessage({
    //         message: "ERRO NO SERVIDOR!",
    //         type: "ERROR",
    //       });
    //     }
    //   })
    //   .finally(() => {
    //     setToogleMessage((current) => !current);
    //     setToogleLoading((current) => !current);
    //   });
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
    });
    setTextCep("");
    setValueCnpj("");
    setListMaquina([]);
  }
  async function SearchCEP() {
    if (textCep === "") {
      setDataMessage({
        message: "Digite um cep!",
        type: "WARNING",
      });
      setToogleMessage((cuurent) => !cuurent);
      setToogleLoading((current) => !current);
      return;
    }
    const cep = parseInt(textCep);

    await Api.get(`/cep/${cep}`)
      .then((res) => {
        setNovoCliente({
          ...novoCliente,
          cidade: res.data.cidade,
          estado: res.data.estado,
          rua: res.data.rua,
          cep: res.data.cep,
          regiao: res.data.regiao,
        });
      })
      .catch((res) => {
        if (res.response && res.response.data) {
          setDataMessage({
            message: res.response.data,
            type: "WARNING",
          });
          setToogleMessage(true);
          setNovoCliente({
            ...novoCliente,
            cidade: "",
            estado: "",
            rua: "",
            cep: "",
            regiao: "",
          });
        }
      })
      .finally(() => {
        setToogleLoading(false);
      });
  }
  //   function changeList(idMaquina: string) {
  //     const list = listMaquina.filter((item) => item.id !== idMaquina);

  //     setListMaquina(list);
  //   }

  return (
    <form className={style.card} action="">
      <div
        className={
          toogleMessage
            ? style.container_message
            : style.container_message_close
        }
      >
        <Message
          stateMessage={toogleMessage}
          action={setToogleMessage}
          message={dataMessage.message}
          type={dataMessage.type}
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
      <div
        className={
          toogleFilterMaquina
            ? style.container_filterMaquina
            : style.container_filterMaquina_close
        }
      >
        <CardFilterMaquinaDisponivel
          changeToogle={setToogleFilterMaquina}
          toogle={toogleFilterMaquina}
          listMaquinas={listMaquinas}
          setListMaquinas={setListMaquina}
        />
      </div>
      <div></div>
      <header className={style.container_title}>
        <h3>NOVO CLIENTE</h3>
      </header>
      <main className={style.container_body}>
        <div className={style.container_codigoRadar}>
          <Input
            id="txtCodigoRadar"
            text="CÓDIGO RADAR"
            autoComplete="off"
            maxLength={20}
            value={novoCliente.codigoRadar}
            onChange={(e) =>
              setNovoCliente({
                ...novoCliente,
                codigoRadar: e.target.value,
              })
            }
          />
        </div>
        <div className={style.container_cnpj}>
          <Input
            id="txtCnpj"
            text="CNPJ"
            autoComplete="off"
            maxLength={18}
            value={valueCnpj}
            onChange={(e) => setValueCnpj(() => HandleCnpj(e.target))}
          />
        </div>
        <div className={style.container_nomeCliente}>
          <Input
            id="txtNomeCliente"
            text="NOME CLIENTE"
            autoComplete="off"
            maxLength={50}
            value={novoCliente.nome}
            onChange={(e) =>
              setNovoCliente({
                ...novoCliente,
                nome: e.target.value,
              })
            }
          />
        </div>
        <div className={style.container_cep}>
          <Input
            id="txtCEP"
            text="CEP"
            autoComplete="off"
            iconRight={{
              icon: BiSearchAlt2,
              action: () => {
                setToogleLoading(true);
                SearchCEP();
              },
            }}
            maxLength={150}
            value={textCep}
            onChange={(e) => handleChangeCEP(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") setToogleLoading(true), SearchCEP();
            }}

            // onChange={e => setNovoCliente({
            //     ...novoCliente,
            //     endereco: e.target.value
            // })}
          />
        </div>
        <div className={style.container_rua}>
          <Input
            id="txtRua"
            text="RUA"
            blocked
            autoComplete="off"
            value={novoCliente.rua}
            onChange={() => {}}
          />
        </div>
        <div className={style.container_numeroEstabelecimento}>
          <Input
            id="txtNumeroEstabelecimento"
            text="Nº"
            autoComplete="off"
            value={novoCliente.numeroEstabelecimento}
            onChange={(e) =>
              setNovoCliente({
                ...novoCliente,
                numeroEstabelecimento: e.target.value,
              })
            }
          />
        </div>
        <div className={style.container_cidade}>
          <Input
            id="txtCidade"
            text="CIDADE"
            autoComplete="off"
            blocked
            value={novoCliente.cidade}
            onChange={() => {}}
          />
        </div>
        <div className={style.container_estado}>
          <Input
            id="txtEstado"
            text="EST."
            autoComplete="off"
            blocked
            value={novoCliente.estado}
            onChange={() => {}}
          />
        </div>
        <div className={style.container_bairro}>
          <Input
            id="txtBairro"
            text="BAIRRO"
            autoComplete="off"
            value={novoCliente.regiao}
            blocked
            onChange={() => {}}
          />
        </div>
        <div className={style.container_complemento}>
          <Input
            id="txtComplemento"
            text="COMPLEMENTO"
            autoComplete="off"
            value={novoCliente.complemento}
            onChange={(e) =>
              setNovoCliente({
                ...novoCliente,
                complemento: e.target.value,
              })
            }
          />
        </div>

        <div className={style.container_nomeContato}>
          <Input
            id="txtContantoNome"
            text="NOME/CONT."
            autoComplete="off"
            maxLength={150}
            value={novoCliente.nomeContatoCliente}
            onChange={(e) =>
              setNovoCliente({
                ...novoCliente,
                nomeContatoCliente: e.target.value,
              })
            }
          />
        </div>
        <div className={style.container_telefoneContato}>
          <Input
            id="txtTelefoneContato"
            text="TEL/CONT."
            autoComplete="off"
            maxLength={11}
            value={novoCliente.contatoTelefone}
            onChange={(e) =>
              setNovoCliente({
                ...novoCliente,
                contatoTelefone: e.target.value,
              })
            }
          />
        </div>
        <div className={style.container_filterMaquinas}>
          <section className={style.container_table}>
            <table className={style.table}>
              <thead>
                <tr>
                  <th>CÓD/MAQ</th>
                  <th>DESCRIÇÃO</th>
                  <th>Nº SÉRIE</th>
                  <th>TIPO/AQUISIÇÃO</th>
                  <th>DATA/SUG/RETOR.</th>
                  <th>DEL.</th>
                </tr>
              </thead>
              <tbody className={style.table_body}>
                {listMaquinas &&
                  listMaquinas.map((item, index) => (
                    <tr key={index}>
                      <td>{item.codigoMaquina}</td>
                      <td>{item.descricaoMaquina}</td>
                      <td>{item.numeroSerie}</td>
                      <td>{TipoAquisicao[item.tipoAquisicao]}</td>
                      <td>
                        {DateAndYearStringFormat(item.dataSugeridaRetorno)}
                      </td>
                      <td
                        onClick={() =>
                          setListMaquina((current) => {
                            const listUpdate = current.filter(
                              (currentItem) => currentItem.id !== item.id
                            );

                            return listUpdate;
                          })
                        }
                      >
                        <AiOutlineDelete />
                      </td>
                    </tr>
                  ))}
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
                setToogleFilterMaquina(true);
              }}
            />
          </section>
        </div>
      </main>
      <footer className={style.footer}>
        <div className={style.button_cadastrar}>
          <Button
            classUi="glass"
            color="green"
            text="CADASTRAR"
            type="button"
            onClick={() => Cadastrar()}
          />
        </div>
        <div className={style.button_fechar}>
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
  );
}
