export interface IOrcamentoProps {
    numeroOrcamento: number,
    descricaoServico: string,
    status: string,
    statusSituacao: IStatusSitucaoProps[],
    cliente: IClienteProps,
    maquina: IMaquinaProps,
}
export interface IClienteProps {
    cep: string,
    cidade: string,
    cnpj: string,
    contatoNomeCliente: string,
    contatoTelefoneCliente: string,
    codigoRadar: string,
    estado: string,
    nomeCliente: string,
    numeroEstabelecimento: string,
    regiao: string,
    rua: string,
}
export interface IStatusSitucaoProps {
    dataHoraFim: Date,
    dataHoraInicio: Date,
    status: string,
    statusId: string,
    usuarioApontamento: string,
    usuarioApontamentoFim: IUsuarioApontamentoSituacaoProps,
    usuarioApontamentoInicio: IUsuarioApontamentoSituacaoProps
}
export interface IUsuarioApontamentoSituacaoProps {
    usuarioApontamentoApelido: string,
    usuarioApotamentoNome: string
}
export interface IMaquinaProps {
    maquinaId: string,
    codigoMaquina: string,
    descricaoMaquina: string,
    numeroSerie: string,
    pecas: IPecasProps[]
}
export interface IPecasProps {
    pecaId: string,
    conserto: boolean,
    codigoPeca: string,
    descricaoPeca: string,
    enderecoImagem: string,
    quantidade: number
    preco: number,
    troca: boolean
}

export interface ITechnicianProps {
    apelido: string,
    idTecnico: string,
    idUsuario: string,
    nome: string
}