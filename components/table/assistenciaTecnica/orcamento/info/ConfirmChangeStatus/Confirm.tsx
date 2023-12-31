import { EnumDeclaration } from "typescript";
import styles from "./style.module.css";
import { EStatus } from "../../IOrcamento";
import SearchInfoOfUserOnToken from "../../../../../utils/SearchInfoOfUserOnToken";
import Api from "../../../../../../service/api/assistenciaTecnica/Assistencia";
import { useState } from "react";

interface Props {
  changeToogle: Function;
  maquinaId: string;
  changeInfo: Function;
  typeStatus: EStatus;
  numeroOrcamento: number;
  numeroStatus: number;
}

export default function ConfirmStatus({
  changeInfo,
  changeToogle,
  typeStatus,
  numeroOrcamento,
  numeroStatus,
  maquinaId,
}: Props) {
  const { tokenInfo } = SearchInfoOfUserOnToken;

  const [text, setText] = useState<string>("");

  async function UpdateStatus() {
    const obj = {
      numeroOrcamento: numeroOrcamento,
      maquinaId: maquinaId,
      usuarioId: tokenInfo.idUser,
      statusId: numeroStatus,
      observacao: text,
    };
    const url = typeUrl(typeStatus);

    await Api.put(`/orcamento/${url}`, obj)
      .then((res) => {
        changeToogle(false);
        changeInfo(res.data);
        setText(() => "");
      })
      .catch((err) => console.log(err));
  }

  const typeUrl = (typeStatus: EStatus) => {
    switch (typeStatus) {
      case EStatus.STATUS_AGUARDANDO_ORCAMENTO:
        return "orcamento-iniciado";
      case EStatus.STATUS_AGUARDANDO_LIBERACAO_ORCAMENTO:
        return "aguardando-liberacao-orcamento";
      case EStatus.STATUS_ORCAMENTO_RECUSADO:
        return "orcamento-recusado";
      case EStatus.STATUS_AGUARDANDO_SEPARACAO_PECAS:
        return "aguardando-separacao-pecas";
      case EStatus.STATUS_SEPARACAO_PECAS_FINALIZADA:
        return "separacao-pecas-finalizada";
      case EStatus.STATUS_AGUARDANDO_MANUTENCAO:
        return "aguardando-manutencao";
      case EStatus.STATUS_EM_MANUTENCAO:
        return "manutencao-iniciada";
      case EStatus.STATUS_MANUTENCAO_FINALIZA:
        return "manutencao-finalizada";
      case EStatus.STATUS_EM_LIMPEZA:
        return "limpeza-iniciada";
      case EStatus.STATUS_FINALIZADO:
        return "finalizado";

      default:
        return "";
    }
  };

  return (
    <form className={styles.card} action="">
      <main className={styles.containerBody}>
        <span>
          Deseja
          <strong>
            {typeStatus === 1
              ? " iniciar este orçamento?"
              : typeStatus === 2
              ? " finalizar este orçamento?"
              : typeStatus === 3
              ? " recusar esse orçamento?"
              : typeStatus === 4
              ? " mandar para separação de peças?"
              : typeStatus === 5
              ? " mandar para a manutenção?"
              : typeStatus === 6
              ? " iniciar esta manutenção"
              : typeStatus === 7
              ? " iniciar esta manutenção?"
              : typeStatus === 8
              ? " finalizar este orçamento?"
              : ""}
          </strong>
        </span>
        <div>
          <textarea
            maxLength={1000}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
      </main>
      <footer className={styles.footer}>
        <button type="button" onClick={() => UpdateStatus()}>
          CONFIRMAR
        </button>
        <button type="button" onClick={() => changeToogle(false)}>
          FECHAR
        </button>
      </footer>
    </form>
  );
}
