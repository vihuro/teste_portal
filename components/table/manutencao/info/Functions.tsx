import Api from "../../../../service/api/manutencao/Manutencao"
import { DateTimeStringFormat } from "../../../utils/DateTimeString";
import { IUserFlow, EStatus } from "../IOrderService"

function Castrar() {

}

async function FetchData(id: number) {

    var result = await Api.get(`order-service/${id}`)
        .then(res => res)
        .catch(err => err);

    return result;
}
function ValidateUser(user: IUserFlow | undefined) {
    if (user === null) {
        return {
            id: "",
            userName: "",
            name: "",
            dateTime: "00-00-0000 00:00"
        }
    };

    return {
        id: user?.id,
        userName: user?.userName,
        name: user?.name,
        dateTime: user ? DateTimeStringFormat(user.dateTime) : ""
    }
}
function ValidateStatusReturnText(status: EStatus) {

    switch (status) {
        case EStatus.ORDEM_INVALIDA:
            return "ORDEM INVÁLIDA"
        case EStatus.AGUARDANDO_MANUTENCAO:
            return "AGUARDANDO MANUTENÇÃO"
        case EStatus.EM_MANUTENCA:
            return "EM MANUTENÇÃO";
        case EStatus.AGUARDANDO_PECAS:
            return "AGUARDANDO PEÇAS"
        case EStatus.AGUARDANDO_AUTORIZACAO_PECAS:
            return "AGURDANDO AUTORIZAÇÃO DE PEÇS"
        case EStatus.MANUTENCAO_FINALIZADA:
            return "MANUTENÇÃO FINALIZADA"
        case EStatus.MANUTENCAO_INVALIDA:
            return "MANUTENÇÃO INVÁLIDA"
        case EStatus.ORDEM_FINALIZADA:
            return "ORDEM FINALIZADA"
        default:
            return "AGUARDANDO VALIDAÇÃO"
    }
}



export {
    Castrar,
    FetchData,
    ValidateUser,
    ValidateStatusReturnText
}