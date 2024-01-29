import { useEffect, useState } from "react";
import styles from "./style.module.css";
import { GetHistorico } from "../../Orcamento.Functions";
import { IOrcamentoProps } from "../../IOrcamento";
import { DateTimeStringFormat } from "../../../../../utils/DateTimeString";

interface HistoricMachineProps {
  toogle: boolean;
  changeToogle: Function;
  numeroSerie: string;
}

export default function HistoricMachine({
  changeToogle,
  toogle,
  numeroSerie,
}: HistoricMachineProps) {
  const [historicoData, setHistoricoData] = useState<IOrcamentoProps[]>([]);

  useEffect(() => {
    if (!toogle) return;
    const historico = async () => {
      await GetHistorico(numeroSerie)
        .then((res) => setHistoricoData(() => res))
        .catch((err) => console.log(err));
    };
    historico();
  }, [toogle]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapContainer}>
        <header className={styles.header}>
          <h5>HISTÓRICO</h5>
        </header>
        <main className={styles.body}>
          <section className={styles.wrapBody}>
            {historicoData &&
              historicoData.map((item, index) => (
                <div key={index} className={styles.cardHistorico}>
                  <h5>Número do Orçamaneto: {item.numeroOrcamento}</h5>
                  <span>
                    <strong>Data da manutenção: </strong>
                    {DateTimeStringFormat(item.statusSituacao[3].dataHoraFim)}
                  </span>
                  <ul>
                    <strong>Peças Trocadas:</strong>
                    {item.maquina.pecas.map((itemPecas, indexPecas) => (
                      <li className={styles.listPecas} key={indexPecas}>
                        {itemPecas.quantidade} x {itemPecas.codigoPeca} - {itemPecas.descricaoPeca} -{" "}
                        
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </section>
        </main>
        <footer className={styles.footer}>
          <button onClick={() => changeToogle(false)}>FECHAR</button>
        </footer>
      </div>
    </div>
  );
}
