import { Fragment, useEffect, useState } from "react";
import style from "./style.module.css";
import { BiArrowFromTop } from "react-icons/bi";
import { CiMenuKebab } from "react-icons/ci";
import FormAdd from "./add/Card";
import FormChange from "./change/Card";
import FormOrcamento from "./CardAddOrcameto/Card";
import FilterCNPJ from "./filterCnpj/Card";
import FilterColuna from "../../filterColunaTable/CardFilterColuna";
import TagMaquina from "./tagMaquina/Card";
import { DateTimeStringFormat } from "../../../utils/DateTimeString";
import { TbEdit } from "react-icons/tb";
import { GetCliente } from "./Cliente.Functions";
import { ClienteProps, ReturnMquinaProps } from "./ICliente";

export default function Table() {
  const [data, setData] = useState<ClienteProps[]>([]);
  const [dataItemString, setDataItemString] = useState<string>("");
  const [dataItemAlteracao, setDataItemAlteracao] = useState<ClienteProps>();
  const [dataItemAlteracaoOrcamento, setDataItemAlteracaoOrcamento] =
    useState<ReturnMquinaProps>();
  const [toogleFormAdd, setToogleFormAdd] = useState<boolean>(false);
  const [toogleFormChange, setToogleFormChange] = useState<boolean>(false);
  const [toogleFormOrcamento, setToogleFormOrcamento] =
    useState<boolean>(false);
  const [toogleInfoPlus, setToogleInfoPlus] = useState<boolean>(false);
  const [toogleFiterCodigo, setToogleFilterCodigo] = useState<boolean>(false);
  const [toogleFilterNome, setToogleFilterNome] = useState<boolean>(false);
  const [toogleFilterCNPJ, setToogleCNPJ] = useState<boolean>(false);
  const [indiceInfoPlus, setIndiceInfoPlus] = useState<number>();
  const [toogleTagMaquina, setToogleTagMquina] = useState<boolean>();
  const [maquinaId, setMaquinaId] = useState<string>("");

  useEffect(() => {
    FecthData();
  }, []);
  useEffect(() => {
    alteracao(dataItemString);
  }, [data]);
  function alteracao(id: string) {
    const item = data.find((item) => item.idCliente === id);

    return setDataItemAlteracao(item);
  }

  const {
    CardFilterCNPJ,
    filterCNPJ,
    refreshList: refreshListCNPJ,
  } = FilterCNPJ({
    list: data
      ? data.map((item) => ({
          cnpj: item.cnpj,
        }))
      : [],
  });
  const {
    CardFilterColunaTable: CardFilterCodigo,
    filteredData: filteredCodigo,
    refresList: refreshListCodigo,
  } = FilterColuna({
    list: data.map((item) => ({
      id: item.idCliente,
      text: item.codigoRadar,
    })),
  });
  const {
    CardFilterColunaTable: CardFilterNome,
    filteredData: filteredNome,
    refresList: refreshListNome,
  } = FilterColuna({
    list: data.map((item) => ({
      id: item.idCliente,
      text: item.nome,
    })),
  });

  async function FecthData() {
    await GetCliente()
      .then((res) => {
        setData(() => res);

        refreshListCNPJ(
          res.map((item: any) => ({
            cnpj: item.cnpj,
          }))
        );
        refreshListCodigo({
          list: res.map((item: any) => ({
            id: item.idCliente,
            text: item.codigoRadar,
          })),
        });
        refreshListNome({
          list: res.map((item: any) => ({
            id: item.idCliente,
            text: item.nome,
          })),
        });
      })

      .catch((err) => console.log(err));
  }

  const [filter, setFilter] = useState<ClienteProps[]>([]);

  useEffect(() => {
    ChangeFiter();
  }, [filteredCodigo, filterCNPJ, filteredNome]);

  function ChangeFiter() {
    const filtered = data.filter((item) => {
      return (
        filteredCodigo.some(
          (codigo) => codigo.text === item.codigoRadar && codigo.visible
        ) &&
        filteredNome.some((nome) => nome.text === item.nome && nome.visible) &&
        filterCNPJ.some((cnpj) => cnpj.cnpj === item.cnpj && cnpj.visible)
      );
    });
    setFilter(filtered);
  }
  useEffect(() => {
    if (!dataItemAlteracao) {
      return;
    }
    const maquina = dataItemAlteracao.maquinaCliente.find(
      (item) => item.id === maquinaId
    );

    if (!maquina) {
      return;
    }
    const item = {
      ...dataItemAlteracao,
      maquinaCliente: maquina,
    };

    setDataItemAlteracaoOrcamento(() => item);
  }, [maquinaId]);

  return (
    <main className={style.container}>
      <div
        className={
          toogleFormAdd
            ? style.container_novoProduto
            : style.container_novoProduto_close
        }
      >
        <FormAdd
          changeToogleCard={setToogleFormAdd}
          refreshTable={FecthData}
          toogle={toogleFormAdd}
        />
      </div>
      <div
        className={
          toogleFormChange
            ? style.container_change
            : style.container_change_close
        }
      >
        {dataItemAlteracao && (
          <FormChange
            changeToogle={setToogleFormChange}
            toogle={toogleFormChange}
            dataProps={dataItemAlteracao}
            refreshTable={FecthData}
          />
        )}
      </div>
      <div
        className={
          toogleFormOrcamento
            ? style.container_orcamento
            : style.container_orcamento_close
        }
      >
        <FormOrcamento
          changeToogle={setToogleFormOrcamento}
          toogle={toogleFormOrcamento}
          cliente={dataItemAlteracaoOrcamento}
          refreshTable={FecthData}
          maquinaId={maquinaId}
        />
      </div>
      <section className={style.container_button}>
        <button onClick={() => setToogleFormAdd(true)}>Novo Cliente</button>
      </section>
      <section className={style.container_table}>
        <div className={style.wrap_table}>
          <table className={style.table}>
            <thead>
              <tr>
                <th>+</th>
                <th>
                  CÓD./ RADAR
                  <CiMenuKebab
                    onClick={(e) => {
                      e.stopPropagation();
                      setToogleFilterCodigo(!toogleFiterCodigo);
                    }}
                  />
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className={
                      toogleFiterCodigo
                        ? style.container_codigo
                        : style.container_codigo_close
                    }
                  >
                    <CardFilterCodigo
                      idRadioButton="rdbCodigoRadar"
                      input
                      radioButton
                    />
                  </div>
                </th>
                <th>
                  NOME/ CLIENTE
                  <CiMenuKebab
                    onClick={(e) => {
                      e.stopPropagation();
                      setToogleFilterNome(!toogleFilterNome);
                    }}
                  />
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className={
                      toogleFilterNome
                        ? style.container_nome
                        : style.container_nome_close
                    }
                  >
                    <CardFilterNome
                      idRadioButton="rdbDescricaoRadar"
                      input
                      radioButton
                    />
                  </div>
                </th>
                <th>
                  CNPJ
                  <CiMenuKebab
                    onClick={(e) => {
                      e.stopPropagation();
                      setToogleCNPJ(!toogleFilterCNPJ);
                    }}
                  />
                  <div
                    className={
                      toogleFilterCNPJ
                        ? style.container_CNPJ
                        : style.container_CNPJ_close
                    }
                  >
                    <CardFilterCNPJ />
                  </div>
                </th>
                <th>MAQ.</th>
                <th>EDIT.</th>
              </tr>
            </thead>
            <tbody className={style.table_body}>
              {data &&
                filter.map((item, index) => (
                  <Fragment key={index}>
                    <tr key={index} className={style.row}>
                      <td
                        onClick={() => {
                          setIndiceInfoPlus(index);
                          setToogleInfoPlus(!toogleInfoPlus);
                        }}
                      >
                        <BiArrowFromTop
                          className={
                            toogleInfoPlus && index === indiceInfoPlus
                              ? style.down
                              : style.top
                          }
                        />
                      </td>
                      <td>{item.codigoRadar}</td>
                      <td>{item.nome}</td>
                      <td>{`${item.cnpj.slice(0, 2)}
                                                .${item.cnpj.slice(2, 5)}
                                                .${item.cnpj.slice(5, 8)}
                                                /${item.cnpj.slice(8, 12)}
                                                -${item.cnpj.slice(12)}`}</td>
                      <td
                        className={style.row_maquinas}
                        onClick={() => {
                          setIndiceInfoPlus(index),
                            setToogleTagMquina(!toogleTagMaquina);
                        }}
                      >
                        <p className={style.tag}>
                          {item.maquinaCliente.length}
                        </p>
                        <div
                          className={
                            toogleTagMaquina && index === indiceInfoPlus
                              ? style.tag_maquina
                              : style.tag_maquina_close
                          }
                        >
                          <TagMaquina
                            abrirOrdemService={() => {
                              alteracao(item.idCliente),
                                setDataItemString(item.idCliente),
                                setToogleFormOrcamento(true);
                            }}
                            changeMaquinaId={setMaquinaId}
                            maquina={item.maquinaCliente.map((item) => ({
                              id: item.id,
                              maquinaId: item.maquinaId,
                              descricaoMaquina: item.descricaoMaquina,
                              numeroSerie: item.numeroSerie,
                              status: item.status,
                              dataSugestaoRetorno: item.dataSugestaoRetorno,
                              tipoAquisicao: item.tipoAquisicao,
                              codigoMaquina: item.codigoMaquina,
                            }))}
                          />
                        </div>
                      </td>
                      <td
                        onClick={() => {
                          alteracao(item.idCliente);
                          setDataItemString(item.idCliente);
                          setToogleFormChange(true);
                        }}
                      >
                        <p
                          style={{
                            fontSize: 22,
                          }}
                        >
                          <TbEdit />
                        </p>
                      </td>
                    </tr>
                    {toogleInfoPlus && indiceInfoPlus === index && (
                      <>
                        <tr className={style.row_plus}>
                          <td colSpan={2}>
                            {`Data/Hora Cadastro: 
                                                        ${DateTimeStringFormat(
                                                          item.cadastro.dataHora
                                                        )}`}
                          </td>
                          <td colSpan={4}>{`CEP: ${item.cep}`}</td>
                        </tr>
                        <tr className={style.row_plus}>
                          <td colSpan={2}>
                            {`Usuário Cadastro: 
                                                        ${item.cadastro.nome}`}
                          </td>
                          <td colSpan={4}>
                            {`ENDEREÇO: ${item.rua} Nº ${
                              item.numeroEstabelecimento
                            } ${item.complemento ?? ""} `}
                          </td>
                        </tr>
                        <tr className={style.row_plus}>
                          <td colSpan={2}>
                            {`Data/Hora Alteração: 
                                                        ${DateTimeStringFormat(
                                                          item.alteracao
                                                            .dataHora
                                                        )}`}
                          </td>
                          <td colSpan={4}>
                            {`${item.estado} / ${item.cidade}`}
                          </td>
                        </tr>
                        <tr className={style.row_plus}>
                          <td colSpan={2}>
                            {`Usuário Alteração: 
                                                        ${item.alteracao.nome}`}
                          </td>
                          <td colSpan={4}>{`BAIRRO: ${item.regiao}`}</td>
                        </tr>
                      </>
                    )}
                  </Fragment>
                ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
