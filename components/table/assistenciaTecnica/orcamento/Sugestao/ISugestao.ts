export type IReturSugestao = {
  id: number;
  dataCobranca: Date;
  sugestaoManutencao: string;
  status: string;
  usuarioSugestao: IUsuarioSugestao;
  maquinaSugerida: IMaquinaSugeria;
};

export type IUsuarioSugestao = {
  usuarioId: string;
  nome: string;
  apelido: string;
  dataHoraCriacaoSugestacao: Date;
};
export type IMaquinaSugeria = {
  maquinaId: string;
  codigoMaquina: string;
  numeroSerie: string;
  descricaoMaquina: string;
};

export type IInsertSugestao = {
  descricaoSugestao: string;
  dataCobranca: Date;
  maquinaSugestaoId: string;
};
