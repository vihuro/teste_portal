import styles from "./style.module.css";

import { IPecaProps } from "../../../../pecas/IPeca";
import RadioButton from "../../../../../../UI/input/radio/RadioButton";
import { handleNumericDecimal } from "../../../../../../utils/HandleNumericDecimal";
import { useState } from "react";
import SearchInfoOfUserOnToken from "../../../../../../utils/SearchInfoOfUserOnToken";
import Message from "../../../../../../message/Message";
import Api from "../../../../../../../service/api/assistenciaTecnica/Assistencia";

interface Props {
  peca?: IPecaProps;
  changeToogle: Function;
  refreshBudget: Function;
  numeroOrcamento: number;
}

function Form({ peca, changeToogle, numeroOrcamento, refreshBudget }: Props) {
  const { Radio } = RadioButton();

  const [textQuantity, setTextQuantity] = useState<string>("");
  const [troca, setTroca] = useState<boolean>(true);
  const [toogleMessage, setToogleMessage] = useState<boolean>(false);
  const [infoMessage, setInfoMessage] = useState({
    message: "",
    type: "WARNING",
  });

  const hadleChangeTextNumeric = (text: string) => {
    const value = handleNumericDecimal(text);

    setTextQuantity(() => value);
  };
  const { tokenInfo } = SearchInfoOfUserOnToken;

  async function InsertPartInBudget() {
    const obj = {
      numeroOrcamento: numeroOrcamento,
      usuarioId: tokenInfo.idUser,
      quantidade: Number(textQuantity),
      conserto: false,
      reaproveitamento: !troca,
      troca: true,
      pecaId: peca?.id,
    };
    if (obj.quantidade === 0) {
      setInfoMessage(() => ({
        message: "DIGITE UM VALOR",
        type: "WARNING",
      }));
      setToogleMessage((current) => !current);
      return;
    }
    await Api.post("/orcamento/pecas", obj)
      .then((res) => {
        refreshBudget(numeroOrcamento);
        changeToogle(false);
        clear();
      })
      .catch((err) => console.log(err));
  }
  function clear() {
    setTextQuantity("");
  }

  return (
    <div className={styles.containerForm}>
      <div
        className={
          toogleMessage
            ? styles.containerMessage
            : styles.containerMessage_close
        }
      >
        <Message
          stateMessage={toogleMessage}
          action={setToogleMessage}
          message={infoMessage.message}
          type={infoMessage.type}
        />
      </div>
      <header></header>
      <main className={styles.body}>
        <div className={styles.spanQuention}>
          <span>
            Deseja adicionar o código
            <strong>{` ${peca?.codigoRadar}`}</strong> a este orçamento?
          </span>
        </div>
        <div className={styles.containerQuantidade}>
          <div>
            <input
              required
              id="txtQuantidade"
              type="text"
              value={textQuantity}
              onChange={(e) => hadleChangeTextNumeric(e.target.value)}
              autoComplete="off"
            />
            <label htmlFor="txtQuantidade">QUANTIDADE</label>
          </div>
        {/* </div>
        <div className={styles.containerRadio}>
          <div>
            <Radio
              color="green"
              id="tipoUsoTroca"
              name="tipoUso"
              text="TROCA"
              checked={troca}
              onChange={(e) => setTroca(() => true)}
            />
          </div>
          <div>
            <Radio
              color="green"
              id="tipoUsoReuso"
              name="tipoUso"
              text="TR/RU"
              checked={!troca}
              onChange={(e) => setTroca(() => false)}
            />
          </div> */}
        </div>
      </main>
      <footer className={styles.footer}>
        <div>
          <button onClick={() => InsertPartInBudget()}>ADICIONAR</button>
        </div>
        <div>
          <button onClick={() => changeToogle((current: boolean) => !current)}>
            FECHAR
          </button>
        </div>
      </footer>
    </div>
  );
}

export { Form };
