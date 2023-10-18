export interface IPecaProps {
    id: string,
    codigoRadar: string,
    descricao: string,
    preco: number,
    unidade: string,
    familia: string,
    enderecoImagem: string;
    alteracao: userProps,
    cadastro: userProps
}
export interface IFilterPecaProps {

}
export interface IPaginationProps {
    currentePage: number,
    totalPages: number,
    itemForPage: number,
    totalItems: number
}
interface userProps {
    idUsuario: string,
    apelido: string,
    nome: string,
    dataHora: Date
}
