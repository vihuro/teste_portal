import { useState } from "react";
import styles from "./style.module.css";
import Api from "../../../../../../../service/api/assistenciaTecnica/Assistencia";
import TokenDrecriptor from "../../../../../../../service/DecriptorToken";
import { tokenProps } from "../../../../../../utils/infoToken";
import { parseCookies } from "nookies";

interface FormProps {
  changeToogle: Function;
  numeroOrcamento: number;
  privado: boolean;
  refresh: Function
}

export function Form({ changeToogle, numeroOrcamento, privado, refresh }: FormProps) {
  const [maxCharacter, setMaxCharacter] = useState<number>(2000);
  const [characterStay, setCharacterStay] = useState<number>(2000);
  const [observer, setObserver] = useState<string>("");
  const [toogleListColors, setToogleListColors] = useState<boolean>(false);
  const [tag, setTag] = useState<string>("");

  const countCharacterHandle = (text: string) => {
    const value = text.length;

    const valueStay = maxCharacter - value;

    setCharacterStay((current) => (current = valueStay));
  };
  const tokenInfo: tokenProps = TokenDrecriptor(parseCookies().ACCESS_TOKEN);
  async function Apontar() {
    const obj = {
      numeroOrcamento: numeroOrcamento,
      observacao: observer,
      usuarioId: tokenInfo.idUser,
      tag: tag,
      privado: privado,
    };
    await Api.post("/orcamento/diario", obj)
      .then((res) => {
        setTag(() => "")
        setObserver("");
        setCharacterStay(() => 2000);
        refresh()
        changeToogle(false);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className={styles.form}>
      <header className={styles.header}>
        <div className={styles.wrapInputToList}>
          <input
            type="text"
            onClick={() => setToogleListColors((current) => !current)}
            value={tag}
            onChange={() => { }}
          />
        </div>
        <ul
          className={
            toogleListColors ? styles.listColor : styles.listColor_close
          }
        >
          <li
            onClick={() => {
              setTag((current) => (current = "AZUL"));
              setToogleListColors((current) => (current = false));
            }}
          >
            AZUL
          </li>
          <li
            onClick={() => {
              setTag((current) => (current = "VERDE"));
              setToogleListColors((current) => (current = false));
            }}
          >
            VERDE
          </li>
          <li
            onClick={() => {
              setTag((current) => (current = "VERMELHO"));
              setToogleListColors((current) => (current = false));
            }}
          >
            VERMELHO
          </li>
          <li
            onClick={() => {
              setTag((current) => (current = "ROXO"));
              setToogleListColors((current) => (current = false));
            }}
          >
            ROXO
          </li>
          <li
            onClick={() => {
              setTag((current) => (current = "LARANJA"));
              setToogleListColors((current) => (current = false));
            }}
          >
            LARANJA
          </li>
        </ul>
      </header>
      <main className={styles.containerInput}>
        <div className={styles.wrapInput}>
          <textarea
            value={observer}
            onChange={(e) => {
              setObserver((current) => (current = e.target.value));
              countCharacterHandle(e.target.value);
            }}
            maxLength={maxCharacter}
            name=""
            id=""
            cols={35}
            rows={10}
          ></textarea>
        </div>
        <span>CARACTERES RESTANTE {characterStay}</span>
      </main>
      <footer className={styles.footer}>
        <button onClick={() => Apontar()} type="button">
          APONTAR
        </button>
        <button onClick={() => changeToogle(false)} type="button">
          FECHAR
        </button>
      </footer>
    </div>
  );
}
