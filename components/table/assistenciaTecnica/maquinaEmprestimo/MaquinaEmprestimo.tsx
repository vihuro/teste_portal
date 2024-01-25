import { useEffect, useState } from "react";
import { GetEmprestimos } from "./MquinaEmprestimo.Functions";
import { DateAndYearStringFormat } from "../../../utils/DateTimeString";

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
  return (
    <div>
      <table>
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
      </table>
    </div>
  );
}
