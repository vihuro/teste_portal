export type IGetMaquinaEmprestimo = {
  id: string;
  maquina: IMaquinaInMaquinaEmprestimo;
  cliente: IClienteInMaquinaEmprestimo;
};
type IMaquinaInMaquinaEmprestimo = {
  maquinaId: string;
  numeroSerie: string;
  codigoMaquina: string;
  descricaoMaquina: string;
  dataSugestaoRetorno: Date;
  dataRetorno: Date;
  tipoAquisicao: string;
};
type IClienteInMaquinaEmprestimo = {
  clienteId: string;
  nomeCliente: string;
  cnpj: string;
  estado: string;
  cidade: string;
  regiao: string;
  nomeRua: string;
  numeroEstabelecimento: string;
  complemento: string;
  contatoTelefoneCliente: string;
  contatoNomeCliente: string;
};
