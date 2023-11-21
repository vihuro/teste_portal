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
    category: string

}

interface IUserProps {
    id: string,
    actived: boolean,
    name: string,
    userName: string
}

export type { IOrderService, IUserProps }