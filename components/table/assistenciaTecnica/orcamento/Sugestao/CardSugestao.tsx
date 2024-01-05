import { useEffect, useState } from "react";
import styles from "./style.module.css";
import { IInsertSugestao, IReturSugestao } from "./ISugestao";
import { FetchSugestaoByMaquinaId, InsertSugestao } from "./Sugestao.Functions";
import {
  DateAndYearStringFormat,
  DateTimeStringFormat,
} from "../../../../utils/DateTimeString";
import ButtonUi from "../../../../UI/button/Button";
import { Icons } from "../../../../utils/IconDefault";

interface CardSugestaoProps {
  maquinaId: string | undefined;
  changeToogle: Function;
}

export default function Card({ maquinaId, changeToogle }: CardSugestaoProps) {
  const [data, setData] = useState<IReturSugestao[]>([]);
  const [toogleAddSugestao, setToogleAddSugestao] = useState<boolean>(false);
  const [valueEntityInsert, setValueEntityInsert] = useState({
    dataCobranca: "",
    descricaoSugestao: "",
    maquinaSugestaoId: "",
  });

  const { Button } = ButtonUi();

  useEffect(() => {
    const fetchSugestao = async () => {
      if (maquinaId) {
        const response = await FetchSugestaoByMaquinaId({
          maquinaId: maquinaId,
        });
        setData(() => response.data);
      }
    };

    fetchSugestao();
  }, [maquinaId]);

  const Insert = async () => {
    if (maquinaId) {
      const obj: IInsertSugestao = {
        dataCobranca: new Date(valueEntityInsert.dataCobranca),
        descricaoSugestao: valueEntityInsert.descricaoSugestao,
        maquinaSugestaoId: maquinaId,
      };
      await InsertSugestao(obj)
        .then(() => {
          setValueEntityInsert((current) => ({
            ...current,
            dataCobranca: "",
            descricaoSugestao: "",
          }));
          setToogleAddSugestao(() => false);
          FetchSugestaoByMaquinaId({
            maquinaId: maquinaId,
          }).then((res) => setData(() => res.data));
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className={styles.card}>
      <div
        className={`${styles.containerAddSugestao} ${
          !toogleAddSugestao && styles["--close"]
        }`}
      >
        <div className={styles.wrapContainerAddSugestao}>
          <span>Adicione uma nova sugestão!</span>
          <div className={styles.wrapInput}>
            <input
              id="txtDataCobrancaCliente"
              title="Data para cobrar o cliente"
              type="date"
              value={
                valueEntityInsert
                  ? valueEntityInsert.dataCobranca.toString()
                  : ""
              }
              onChange={(e) => {
                setValueEntityInsert((current) => ({
                  ...current,
                  dataCobranca: e.target.value,
                }));
              }}
            />
            <label htmlFor="txtDataCobrancaCliente">Data</label>
          </div>
          <div className={styles.wrapInput}>
            <input
              maxLength={300}
              required
              id="txtDescricaoSugestao"
              value={
                valueEntityInsert ? valueEntityInsert.descricaoSugestao : ""
              }
              onChange={(e) =>
                setValueEntityInsert((current) => ({
                  ...current,
                  descricaoSugestao: e.target.value,
                }))
              }
            />
            <label htmlFor="txtDescricaoSugestao">Descriçao</label>
          </div>
          <footer className={styles.footerAddSugestao}>
            <button onClick={() => Insert()}>ADICIONAR</button>
            <button onClick={() => setToogleAddSugestao((current) => !current)}>
              FECHAR
            </button>
          </footer>
        </div>
      </div>
      <main className={styles.container}>
        <header className={styles.header}>
          <h5 className={styles.title}>SUGESTÕES</h5>

          <button
            onClick={() => setToogleAddSugestao((current) => !current)}
            className={styles.button}
          >
            <Icons.AddFill />
          </button>
        </header>
        <main className={styles.body}>
          {data &&
            data.map((item, index) => (
              <div
                key={index}
                className={`${styles.containerSugestao} ${
                  styles["--" + item.status.replace(" ", "-")]
                }`}
              >
                <span>{item.sugestaoManutencao}</span>
                <br />
                <span>
                  Data para cobrança:
                  <strong> {DateAndYearStringFormat(item.dataCobranca)}</strong>
                  <br />
                  <span>Usuário da sugestão: {item.usuarioSugestao.nome}</span>
                  <br />
                  <span>
                    Data da Sugestão:{" "}
                    {DateTimeStringFormat(
                      item.usuarioSugestao.dataHoraCriacaoSugestacao
                    )}
                  </span>
                </span>
              </div>
            ))}
        </main>
        <footer className={styles.footer}>
          <Button
            onClick={() => changeToogle(false)}
            classUi="glass"
            color="red"
            text="FECHAR"
          />
        </footer>
      </main>
    </div>
  );
}
