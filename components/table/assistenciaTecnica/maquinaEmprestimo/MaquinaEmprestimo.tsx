import { useEffect, useState } from "react";
import { GetEmprestimos } from "./MquinaEmprestimo.Functions";
import { DateAndYearStringFormat } from "../../../utils/DateTimeString";
import styles from "./style.module.css"
import { TableUi } from "../../../UI/table/TableUi";
import { Icons } from "../../../utils/IconDefault";

export default function Emprestimos() {
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    const listEmpresitmos = async () => {
      await GetEmprestimos()
        .then((res) => setData(() => res))
        .catch((err) => console.log(err));
    };
    listEmpresitmos();
  }, []);
  const columnLabel = [
    {
      label: "+"
    },
    {
      label: "Nº ORDEM SERVIÇO"
    },
    {
      label: "EXECUÇÃO"
    },
    {
      label: "TIPO/SERV."
    },
    {
      label: "CATEGORIA"
    },
    {
      label: "DATA/IDEAL"
    },
    {
      label: "PRIORIDADE"
    },
    {
      label: "STATUS"
    },
    {
      label: "INFO"
    }
  ]
  const rowData = data.map((item, index) => ({
    id: index,
    data: {
      "col0": {
        label: "",
        icon: Icons.ArrowFromTop,
        onClick: () => console.log("hahaha")
      },
      "col1": {
        label: item.id.toString()
      },
      "col2": {
        label: item.maquina.descricaoMaquina
      },
      "col3": {
        label: ""
      },
      "col4": {
        label: item.maquina.dataSugestaoRetorno
      }
    }
  }))
  return (
    <div>
      <section className={styles.wrap_container_table} >
        {data && (

          <TableUi
            col={columnLabel}
            row={rowData}
            nameTable="tableMaquinasEmprestadas"
          />
        )}

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
