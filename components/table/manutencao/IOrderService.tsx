interface IOrderService {
    dateCreated: Date,
    dateUpdated: Date,
    description: string,
    id: number,
    localeManinteace: string,
    priority: string,
    situation: string,
    typeService: string,
    userRegisterd: IUserProps,
    suggestdMainteneaceDate: Date,
    category: string,
    flowList: IFlowList[]

}
interface IFlowList {
    id: number,
    typeFlow: string,
    observation: string,
    userInit: IUserFlow,
    userEnd: IUserFlow
}
interface IUserFlow {
    id: string,
    userName: string,
    name: string,
    dateTime: Date
}

interface IUserProps {
    id: string,
    actived: boolean,
    name: string,
    userName: string
}
interface StyleData {
    background: string,
    color: string,
    fontWeight?: string
}
interface StyleKey {
    [key: string]: StyleData
}
export enum EStatus {
    AGUARDANDO_VALIDACAO = 0,
    ORDEM_INVALIDA = 1,
    AGUARDANDO_MANUTENCAO = 2,
    EM_MANUTENCA = 3,
    AGUARDANDO_PECAS = 4,
    AGUARDANDO_AUTORIZACAO_PECAS = 5,
    MANUTENCAO_FINALIZADA = 6,
    MANUTENCAO_INVALIDA = 7,
    ORDEM_FINALIZADA

}

export type {
    IOrderService, IUserProps,
    IUserFlow, StyleKey
}