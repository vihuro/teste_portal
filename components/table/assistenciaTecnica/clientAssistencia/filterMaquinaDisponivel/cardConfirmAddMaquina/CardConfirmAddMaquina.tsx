import { useState } from "react";
import RadioButton from "../../../../../UI/input/radio/RadioButton";
import styles from "./style.module.css";
import { TipoAquisicao, maquinaReturnProps } from "../../IClienteAssistencia";
import Message from "../../../../../message/Message";

interface CardConfirmAddMaquinaProps {
  changeToogle: Function;
  toogle: boolean;
  addMaquinaInCliente: Function;
  maquina: maquinaReturnProps | undefined;
}


export default function CardConfirmAddMaquina({
  changeToogle,
  toogle,
  addMaquinaInCliente,
  maquina,
}: CardConfirmAddMaquinaProps) {
  const { Radio } = RadioButton();

  const [valueTipoAquisicao, setValueTipoAquisicao] = useState<TipoAquisicao>(
    TipoAquisicao.VENDA
  );
  const [dataSugeridaRetorno, setDataSugeridaRetorno] = useState<string>("");
  const [infoMessage, setInfoMessage] = useState({
    message: "",
    type: "WARNING",
  });
  const [toogleMessage, setToogleMessage] = useState<boolean>(false);

  const blockedInputDataSugerida =
    valueTipoAquisicao === TipoAquisicao.EMPRESTIMO ? false : true;

  function AddMaquina() {
    if (!maquina) return;
    if (
      valueTipoAquisicao === TipoAquisicao.EMPRESTIMO &&
      dataSugeridaRetorno === ""
    ) {
      setInfoMessage(() => ({
        message:
          "No caso de empréstivo, é necessário informar uma data de retorno!",
        type: "WARNING",
      }));
      setToogleMessage((current) => !current);
    } else {
      const obj = {
        ...maquina,
        tipoAquisicao: valueTipoAquisicao,
        dataSugeridaRetorno: dataSugeridaRetorno,
      };
      setValueTipoAquisicao(() => TipoAquisicao.VENDA);
      setDataSugeridaRetorno(() => "");
      addMaquinaInCliente((current: any[]) => [...current, obj]);
      changeToogle(false);
    }
  }

  return (
    <div className={styles.container}>
      <div
        className={`${styles.containerMessage} ${
          !toogleMessage && styles["--close"]
        }`}
      >
        <Message
          stateMessage={toogleMessage}
          message={infoMessage.message}
          type={infoMessage.type}
          action={setToogleMessage}
        />
      </div>
      <div className={styles.wrapContainer}>
        <header className={styles.header}>
          {maquina && (
            <p>
              Deseja adicionar a máquina <strong>{maquina.codigoMaquina}</strong> para
              esse cliente?
            </p>
          )}
        </header>
        <main className={styles.body}>
          <div className={styles.wrapBody}>
            <div className={styles.containerRadioButton}>
              <Radio
                color="green"
                name="tipoAquisicao"
                id="rdbVenda"
                text="VENDA"
                checked={valueTipoAquisicao === TipoAquisicao.VENDA ?? true}
                onChange={() => {
                  setDataSugeridaRetorno(() => "");
                  setValueTipoAquisicao(TipoAquisicao.VENDA);
                }}
              />
              <Radio
                color="green"
                name="tipoAquisicao"
                id="rdbEmprestimo"
                text="EMPRÉSTIMO"
                checked={
                  valueTipoAquisicao === TipoAquisicao.EMPRESTIMO ?? true
                }
                onChange={() => setValueTipoAquisicao(TipoAquisicao.EMPRESTIMO)}
              />
            </div>
            <div
              className={`${styles.inputDataSugerida} ${
                blockedInputDataSugerida && styles["--block"]
              }`}
            >
              <div>
                <input
                  readOnly={blockedInputDataSugerida}
                  id="txtDataSugerida"
                  title="Data sugerida de retorno"
                  type="date"
                  value={dataSugeridaRetorno}
                  onChange={(e) => setDataSugeridaRetorno(e.target.value)}
                />
                <label htmlFor="txtDataSugerida">DATA SUGERIDA</label>
              </div>
            </div>
          </div>
        </main>
        <footer className={styles.footer}>
          <button
            type="button"
            onClick={() => {
              AddMaquina();
            }}
          >
            ADICIONAR
          </button>
          <button type="button" onClick={() => changeToogle(false)}>
            CANCELAR
          </button>
        </footer>
      </div>
    </div>
  );
}
