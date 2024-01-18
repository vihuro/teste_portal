import { useEffect, useState } from "react";
import Api from "../../../service/api/assistenciaTecnica/Assistencia";
import style from "./style.module.css";
import {
  DateAndYearStringFormat,
  DateTimeStringFormat,
} from "../../../components/utils/DateTimeString";
import { GetServerSideProps } from "next";
import { validateToken } from "../../../components/privatePage/PrivatePage";
import {
  IOrcamentoProps,
  IStatusSitucaoProps,
} from "../../../components/table/assistenciaTecnica/orcamento/IOrcamento";

interface dataProps {
  numeroOrcamento: number;
  maquina: maquinaProps;
  cadastro: userProps;
  alteracao: userProps;
  descricaoServico: string;
}
interface maquinaProps {
  codigoMaquina: string;
  descricaoMaquina: string;
  maquinaId: string;
  numeroSerie: string;
}
interface userProps {
  apelido: string;
  dataHora: Date;
  nome: string;
  userId: string;
}

export default function Bi() {
  const [data, setData] = useState<IOrcamentoProps[]>([]);
  useEffect(() => {
    Api.get("/orcamento/bi")
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  function TempoOrcamento(situacao: IStatusSitucaoProps[]) {
    console.log(situacao);
    return "teste";
  }
  return (
    <table className={style.table}>
      <thead>
        <tr>
          <th>DATA DE ABERTURA</th>
          <th>OS</th>
          <th>STATUS</th>
          <th>MODELO</th>
          <th>SÉRIE</th>
          <th>INFORMAÇÕES</th>
          <th>RESP. ORÇ</th>
          <th>LIMITE ORÇ.</th>

          <th>RESP. SERVIÇO</th>
          <th>LIMITE EXEC.</th>
          <th style={{
            fontSize: 14
          }}>AVALIAÇÃO DO TÉCNICO</th>
        </tr>
      </thead>
      <tbody className={style.tableBody}>
        {data &&
          data.map((item, index) => (
            <tr key={index}>
              <td>{DateTimeStringFormat(item.cadastro.dataHora)}</td>
              <td>{item.numeroOrcamento}</td>
              <td style={{
                background: item.status === "AGUARDANDO LIBERAÇÃO DO ORÇAMENTO" ? "red" :
                  item.status === "AGUARDANDO ORÇAMENTO" ? "#a836ff" :
                    item.status === "AGUARDANDO ATRIBUIÇÃO" ? "#e9ff36" :
                      item.status === "ORÇANDO" ? "#0e98e9" :
                        item.status === "AGUARDANDO PEÇAS" ? "#f7840d" :
                          item.status === "AGUARDANDO MANUTENÇÃO" ? "#A836FF" :
                            item.status === "MANUTENÇÃO INICIADA" ? "#0a0297" : "green",


                color: item.status === "AGUARDANDO LIBERAÇÃO DO ORÇAMENTO" ? "white" :
                  item.status === "AGUARDANDO ORÇAMENTO" ? "white" :
                    item.status === "MANUTENÇÃO FINALIZADA" ? "black" :
                      item.status === "AGUARDANDO MANUTENÇÃO" ? "white" :
                        item.status === "MANUTENÇÃO INICIADA" ? "WHITE" : "black",
              }} >{item.status}</td>
              <td>{item.maquina.descricaoMaquina}</td>
              <td>{item.maquina.numeroSerie}</td>
              <td>{item.descricaoServico}</td>
              <td>{item.tecnicoOrcamento?.nome}</td>
              <td>{item.tempoEstimadoOrcamento}</td>

              <td>{item.tecnicoManutencao?.nome}</td>
              <td>{item.tempoEstimadoManutencao}</td>
              {/* <td>{item.}</td>
                            <td>{DateTimeStringFormat(item.cadastro.dataHora)}</td> */}
              <td></td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const info = await validateToken(context);

  if (!info) {
    return {
      props: {},
    };
  }

  return {
    props: {},
    redirect: {
      destination: info.redirect.destination,
      permanent: info.redirect.permanent,
    },
  };
};
