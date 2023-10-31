import { EnumDeclaration } from "typescript";
import styles from "./style.module.css";
import { EStatus } from "../../IOrcamento";
import SearchInfoOfUserOnToken from "../../../../../utils/SearchInfoOfUserOnToken";
import Api from "../../../../../../service/api/assistenciaTecnica/Assistencia";

interface Props {
    changeToogle: Function,
    changeInfo: Function,
    typeStatus: EStatus,
    numeroOrcamento: number,
    numeroStatus: number
}

export default function ConfirmStatus({ changeInfo,
    changeToogle,
    typeStatus,
    numeroOrcamento,
    numeroStatus }: Props) {


    const { tokenInfo } = SearchInfoOfUserOnToken

    async function UpdateStatus() {
        const obj = {
            numeroOrcamento: numeroOrcamento,
            usuarioId: tokenInfo.idUser,
            numeroStatus: numeroStatus
        }
        const url = typeUrl(typeStatus);

        await Api.post(`/orcamento/${url}`, obj)
            .then(res => {
                changeToogle(false)
                changeInfo(res.data)

            })
            .catch(err => console.log(err))
    }

    const typeUrl = (typeStatus: EStatus) => {
        switch (typeStatus) {
            case 1:
                return "aguardando-orcamento";

            case 2:
                return "aguardando-liberacao-orcamento"

            case 3:
                return "aguardando-manutencao"

            case 4:
                return "manutencao-iniciada"

            case 5:
                return "limpeza-iniciada"

            case 6:
                return "aguardando-orcamento"

            case 7:
                return "finalizado"

            default:
                return ""
        }
    }

    return (
        <form className={styles.card} action="">
            <header></header>
            <main>
                <span>
                    Deseja
                    <strong>
                        {typeStatus === 1 ? " iniciar este orçamento?" :
                            typeStatus === 2 ? " finalizar este orçamento?" :
                                typeStatus === 4 ? " iniciar a manutenção?" :
                                    typeStatus === 3 ? " finalizar essa negociação?" :
                                        typeStatus === 5 ? " finalizar esta manutenção?" :
                                            typeStatus === 7 ? " finalizar esta manutenção?" : ""}
                    </strong>
                </span>
            </main>
            <footer className={styles.footer} >
                <button
                    type="button"
                    onClick={() => UpdateStatus()} >
                    CONFIRMAR
                </button>
                <button
                    type="button"
                    onClick={() => changeToogle(false)} >
                    FECHAR
                </button>
            </footer>
        </form>
    )
}