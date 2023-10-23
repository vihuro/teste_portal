interface IMachineProps {
    id: string,
    ativo: boolean,
    atribuida: boolean,
    codigo: string,
    descricaoMaquina: string,
    numeroSerie: string,
    cadastro: string,
    unidade: string
}
interface InfoUserProps {
    userId: string,
    apelido: string,
    dataHora: Date,
    nome: string,
}

export type { IMachineProps }