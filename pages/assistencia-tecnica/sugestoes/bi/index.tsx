"use cliente";

import { GetServerSideProps } from "next";
import { validateToken } from "../../../../components/privatePage/PrivatePage";
import styles from "./style.module.css";
import { useEffect, useState } from "react";
import { FetchSugestao } from "../../../../components/table/assistenciaTecnica/orcamento/Sugestao/Sugestao.Functions";
import { IReturSugestao } from "../../../../components/table/assistenciaTecnica/orcamento/Sugestao/ISugestao";
import { DateAndYearStringFormat } from "../../../../components/utils/DateTimeString";

export default function Sugestoes() {
  const [data, setData] = useState<IReturSugestao[]>([]);

  useEffect(() => {
    const response = async () => {
      FetchSugestao()
        .then((res) => setData(() => res.data))
        .catch((err) => console.log(err));
    };
    response();
  }, []);
  return (
    <main>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>DESCRIÇÃO</th>
            <th>DATA/COB.</th>
            <th>COD/MAQ.</th>
            <th>STATUS</th>
            <th>MÁQUINA</th>
            <th>Nº SÉRIE</th>
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {data &&
            data.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.sugestaoManutencao}</td>
                <td>{DateAndYearStringFormat(item.dataCobranca)}</td>
                <td className={`${styles[item.status.replace(" ", "-")]}`}>
                  {item.status}
                </td>
                <td>{item.maquinaSugerida.codigoMaquina}</td>
                <td>{item.maquinaSugerida.descricaoMaquina}</td>
                <td>{item.maquinaSugerida.numeroSerie}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </main>
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
