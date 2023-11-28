import Api from "../../../../../service/api/manutencao/Manutencao";
import InfoUser from "../../../../utils/SearchInfoOfUserOnToken";
import { EStatus } from "../../IOrderService";
import styles from "./style.module.css";

interface Props {
    changleToogle: Function,
    text: string,
    idOrderService: number,
    updateInfo: Function,
    typeFlowId?: number,
    situation?: EStatus

}

export default function Card({
    text, changleToogle,
    idOrderService, updateInfo,
    typeFlowId, situation }: Props) {
    async function Update() {
        const obj = {
            idOrderService: idOrderService,
            typeSituation: situation,
            userId: InfoUser.tokenInfo.idUser,
            flowId: typeFlowId
        }
        await Api.put("order-service", obj)
            .then(res => {
                updateInfo(() => res.data)
                changleToogle(false)
            })
            .catch(err => console.log(err))
    }
    return (
        <div className={styles.container} >
            <span>
                Deseja mudar o status para
                <strong> {text}</strong>
                ?
            </span>
            <footer className={styles.containerFooter} >
                <button onClick={() => Update()} >ALTERAR</button>
                <button onClick={() => changleToogle(false)} >FECHAR</button>
            </footer>
        </div>
    )
}