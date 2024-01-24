import { maquinaReturnProps } from "./IClienteAssistencia";

export interface ReturnMquinaProps {
  idCliente: string;
  cnpj: string;
  codigoRadar: string;
  contatoTelefone: string;
  contatoNome: string;
  nome: string;
  cadastro: UserProps;
  alteracao: UserProps;
  maquinaCliente: maquinaReturnProps;
  cep: string;
  estado: string;
  cidade: string;
  regiao: string;
  rua: string;
  complemento: string;
  numeroEstabelecimento: string;
}
export interface UserProps {
  usuarioId: string;
  nome: string;
  apelido: string;
  dataHora: Date;
}
export interface ClienteProps {
  idCliente: string;
  cnpj: string;
  codigoRadar: string;
  contatoTelefone: string;
  contatoNome: string;
  nome: string;
  cadastro: UserProps;
  alteracao: UserProps;
  maquinaCliente: maquinaReturnProps[];
  cep: string;
  estado: string;
  cidade: string;
  regiao: string;
  rua: string;
  complemento: string;
  numeroEstabelecimento: string;
}

export interface InsertClienteProps {
  nome: string;
  codigoRadar: string;
  cnpj: string;
  cep: string;
  estado: string;
  cidade: string;
  regiao: string;
  rua: string;
  numeroEstabelecimento: string;
  complemento: string;
  nomeContatoCliente: string;
  contatoTelefone: string;
  maquinas: ListMquinasProps[];
  userId: string;
}
export interface ListMquinasProps {
  maquinaId: string;
  tipoAquisicao: number;
  dataSugestaoRetorno: Date | undefined;
}
