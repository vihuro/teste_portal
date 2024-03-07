import { useEffect, useState } from "react";
import { GetEmprestimos } from "./MquinaEmprestimo.Functions";
import { DateAndYearStringFormat } from "../../../utils/DateTimeString";
import styles from "./style.module.css";
import { TableUi } from "../../../UI/table/TableUi";
import { Icons } from "../../../utils/IconDefault";
import { IGetMaquinaEmprestimo } from "./IMaquinaEmprestimo";
import { ColumnExternal, Row } from "../../../UI/table/ITableUi";

export default function Emprestimos() {
  const [data, setData] = useState<IGetMaquinaEmprestimo[]>([]);
  useEffect(() => {
    const listEmpresitmos = async () => {
      await GetEmprestimos()
        .then((res) => setData(() => res))
        .catch((err) => console.log(err));
    };
    listEmpresitmos();
  }, []);
  const columnLabel: ColumnExternal[] = [
    {
      label: "NÚMERO SÉRIE",
    },
    {
      label: "CÓDIGO MÁQUINA",
    },
    {
      label: "DESCRIÇÃO",
    },
    {
      label: "DATA SUGER. RETORNO",
    },
    {
      label: "DATA DIR. RETORNO",
    },
    {
      label: "EDIT",
    },
  ];
  const rowData: Row[] = data.map((item, index) => ({
    id: index,
    data: {
      col0: {
        label: item.maquina.numeroSerie,
      },
      col1: {
        label: item.maquina.codigoMaquina,
      },
      col2: {
        label: item.maquina.descricaoMaquina,
      },
      col3: {
        label: DateAndYearStringFormat(item.maquina.dataSugestaoRetorno),
      },
      col4: {
        label: DateAndYearStringFormat(item.maquina.dataRetorno),
      },
      col5: {
        label: "",
        icon: Icons.Edit,
        onClick: () => console.log("olá mundo")
      },
    },
  }));
  return (
    <div className={styles.container}>
      <section className={styles.wrapContainer}>
        <div className={styles.containerTable}>
          <div className={styles.container_table}>
            <div className={styles.wrap_container_table}>
              {data && (
                <TableUi
                  col={columnLabel}
                  row={rowData}
                  nameTable="tableMaquinasEmprestadas"
                />
              )}
            </div>
          </div>
        </div>
      </section>
      {/* <table>
        <thead>
          <tr>
            <th>CÓDIGO</th>
            <th>DESCRIÇÃO</th>
            <th>Nº SÉRIE</th>
            <th>DATA/SUG/RETOR</th>
            <th>DATA/DIR</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item, index) => (
              <tr>
                <td>{item.maquina.codigoMaquina}</td>
                <td>{item.maquina.descricaoMaquina}</td>
                <td></td>
                <td>
                  {DateAndYearStringFormat(item.maquina.dataSugestaoRetorno)}
                </td>
                <td>00/00/00</td>
              </tr>
            ))}
        </tbody>
      </table> */}
    </div>
  );
}
