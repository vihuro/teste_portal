export interface OrcamentoProps {
    numeroOrcamento: number,
    descricaoServico: string,
    status: string,
    statusSituacao: statusSitucaoProps[],
    cliente: clienteProps,
    maquina: maquinaProps,
}
export interface clienteProps {
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
export interface statusSitucaoProps {
    dataHoraFim: Date,
    dataHoraInicio: Date,
    status: string,
    statusId: string,
    usuarioApontamento: string,
    usuarioApontamentoFim: usuarioApontamentoSituacaoProps,
    usuarioApontamentoInicio: usuarioApontamentoSituacaoProps
}
export interface usuarioApontamentoSituacaoProps {
    usuarioApontamentoApelido: string,
    usuarioApotamentoNome: string
}
export interface maquinaProps {
    maquinaId: string,
    codigoMaquina: string,
    descricaoMaquina: string,
    numeroSerie: string,
    pecas: pecasProps[]
}
export interface pecasProps {
    pecaId: string,
    conserto: boolean,
    codigoPeca: string,
    descricaoPeca: string,
    enderecoImagem: string,
    preco: number,
    troca: boolean
}