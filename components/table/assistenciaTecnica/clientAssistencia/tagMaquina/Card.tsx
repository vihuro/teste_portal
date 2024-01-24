import { useState } from "react";
import style from "./style.module.css";
import Api from "../../../../../service/api/assistenciaTecnica/Assistencia";
import { maquinaReturnProps } from "../IClienteAssistencia";
import { ChangeFormatForInput, DateAndYearStringFormat } from "../../../../utils/DateTimeString";

interface props {
  maquina: maquinaReturnProps[];
  abrirOrdemService: Function;
  changeMaquinaId: Function;
}

interface Color {
  background: string;
  color: string;
}

export default function Card({
  maquina,
  abrirOrdemService,
  changeMaquinaId,
}: props) {
  const color: Record<string, Color> = {
    Liberada: {
      background: "rgb(69, 236, 119)",
      color: "rgb(0, 70, 3)",
    },
    "Aguardando Orçamento": {
      background: "rgb(227 12 12)",
      color: "rgb(255 255 255)",
    },
    "Aguardando Aprovação": {
      background: "#57067f",
      color: "white",
    },
    "Em Manutenção": {
      background: "rgb(0, 95, 0)",
      color: "white",
    },
    "Abrir Ordem de Serviço": {
      background: "#0899e1",
      color: "white",
    },
    "Pesquisar Ordem": {
      background: "#cd05b3",
      color: "white",
    },
  };

  function GetColor(text: string) {
    const getStyle = color[text];

    return {
      background: getStyle ? getStyle.background : "black",
      color: getStyle ? getStyle.color : "white",
    };
  }

  const [numeroSerie, setNumeroSerie] = useState<string>("");
  const [tipo, setTipo] = useState<string>("");

  const filter = maquina.filter(
    (item) =>
      item.numeroSerie
        .toLocaleUpperCase()
        .startsWith(numeroSerie.toLocaleUpperCase()) &&
      item.descricaoMaquina.toLocaleUpperCase().startsWith(tipo.toLocaleUpperCase())
  );

  return (
    <section className={style.container} onClick={(e) => e.stopPropagation()}>
      <section className={style.container_inputFilter}>
        <div className={style.container_inputNumeroSerie}>
          <input
            type="text"
            value={numeroSerie}
            onChange={(e) => setNumeroSerie(e.target.value)}
          />
          <label htmlFor="">Nº Série</label>
        </div>
        <div className={style.container_inputTipoMaquina}>
          <input
            type="text"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          />
          <label htmlFor="">Tipo</label>
        </div>
      </section>
      <section className={style.container_table}>
        {maquina && maquina.length > 0 && (
          <table className={style.table}>
            <thead>
              <tr>
                <th>Nº SÉRIE</th>
                <th>DESCR.</th>
                <th>STATUS</th>
                <th>TIPO/AQUIS.</th>
                <th>DATA/SUG/RETOR.</th>
                <th>AÇÃO</th>
              </tr>
            </thead>
            <tbody>
              {filter.map((item, index) => (
                <tr key={index}>
                  <td>{item.numeroSerie}</td>
                  <td>{item.descricaoMaquina}</td>
                  <td>
                    <p className={style.status} style={GetColor(item.status)}>
                      {item.status}
                    </p>
                  </td>
                  <td>{item.tipoAquisicao}</td>
                  <td>{DateAndYearStringFormat(item.dataSugestaoRetorno)}</td>
                  <td>
                    {item.status === "Liberada" ? (
                      <p
                        className={style.buttonAtalho}
                        style={GetColor("Abrir Ordem de Serviço")}
                        onClick={() => {
                          changeMaquinaId(() => item.id);
                          abrirOrdemService();
                        }}
                      >
                        Abrir Ordem de Serviço
                      </p>
                    ) : (
                      <p
                        className={style.buttonAtalho}
                        style={GetColor("Pesquisar Ordem")}
                      >
                        Pesquisar Ordem
                      </p>
                    )}
                  </td>
                </tr>
              ))}
              {/* {maquina.map((item, index) => (
                                <tr key={index} >
                                    <td>
                                        {item.numeroSerie}
                                    </td>
                                    <td>
                                        {item.tipoMaquina}
                                    </td>
                                    <td>
                                        <p style={GetColor("Aguardando Orçamento")}>
                                            Aguardando Orçamento
                                        </p>
                                    </td>
                                    <td>
                                        <p style={GetColor("Pesquisar Ordem")}>
                                            Pesquisar Ordem
                                        </p>
                                    </td>

                                </tr>
                            ))}
                            {maquina.map((item, index) => (
                                <tr key={index} >
                                    <td>
                                        {item.numeroSerie}
                                    </td>
                                    <td>
                                        {item.tipoMaquina}
                                    </td>
                                    <td>
                                        <p style={GetColor("Aguardando aprovação")}>
                                            Aguardando aprovação
                                        </p>

                                    </td>
                                    <td>
                                        <p style={GetColor("Pesquisar Ordem")}>
                                            Pesquisar Ordem
                                        </p>
                                    </td>

                                </tr>
                            ))}
                            {maquina.map((item, index) => (
                                <tr key={index} >
                                    <td>
                                        {item.numeroSerie}
                                    </td>
                                    <td>
                                        {item.tipoMaquina}
                                    </td>
                                    <td>
                                        <p style={GetColor("Aguardando aprovação")}>
                                            Aguardando aprovação
                                        </p>

                                    </td>
                                    <td>
                                    <p style={GetColor("Pesquisar Ordem")}>
                                            Pesquisar Ordem
                                        </p>
                                    </td>


                                </tr>
                            ))}
                            {maquina.map((item, index) => (
                                <tr key={index} >
                                    <td>
                                        {item.numeroSerie}
                                    </td>
                                    <td>
                                        {item.tipoMaquina}
                                    </td>
                                    <td>
                                        <p style={GetColor("Aguardando aprovação")}>
                                            Aguardando aprovação
                                        </p>

                                    </td>
                                    <td>
                                        <p style={GetColor("Pesquisar Ordem")}>
                                            Pesquisar Ordem
                                        </p>
                                    </td>

                                </tr>
                            ))} */}
            </tbody>
          </table>
        )}
      </section>
    </section>
  );
}
