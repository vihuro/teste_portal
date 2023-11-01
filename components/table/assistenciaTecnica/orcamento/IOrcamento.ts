export interface IOrcamentoProps {
    numeroOrcamento: number,
    descricaoServico: string,
    status: string,
    tempoEstimadoOrcamento: number,
    tempoEstimadoManutencao: number,
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
    observacao: string,
    usuarioApontamento: string,
    usuarioApontamentoFim: IUsuarioApontamentoSituacaoProps,
    usuarioApontamentoInicio: IUsuarioApontamentoSituacaoProps
}
export interface IUsuarioApontamentoSituacaoProps {
    usuarioApontamentoApelido: string,
    usuarioApotamentoNome: string,
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
export enum EStatus {
    STATUS_AGUARDANDO_ORCAMENTO = 1,
    STATUS_AGUARDANDO_LIBERACAO_ORCAMENTO = 2,
    STATUS_ORCAMENTO_RECUSADO = 3,
    STATUS_AGUARDANDO_MANUTENCAO = 4,
    STATUS_EM_MANUTENCAO = 5,
    STATUS_MANUTENCAO_FINALIZA = 6,
    STATUS_EM_LIMPEZA = 7,
    STATUS_FINALIZADO = 8
}