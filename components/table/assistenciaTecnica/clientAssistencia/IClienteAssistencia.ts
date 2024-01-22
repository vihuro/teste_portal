export enum TipoAquisicao {
  VENDA = 0,
  EMPRESTIMO = 1,
}
export interface maquinaProps {
  id: string;
  codigoMaquina: string;
  descricaoMaquina: string;
  numeroSerie: string;
  tipoAquisicao: number;
  dataSugeridaRetorno?: Date;
}
export interface maquinaReturnProps {
  id: string;
  maquinaId: string;
  codigoMaquina: string;
  descricaoMaquina: string;
  numeroSerie: string;
  status: string;
  dataSugestaoRetorno: Date;
  tipoAquisicao: string;
}
