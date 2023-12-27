import Api from "../../../../../service/api/assistenciaTecnica/Assistencia";
import SearchInfoOfUserOnToken from "../../../../utils/SearchInfoOfUserOnToken";
import { IInsertSugestao } from "./ISugestao";

async function FetchSugestao() {
  const response = await Api.get("sugestao")
    .then((res) => res)
    .catch((err) => err);

  return response;
}
async function FetchSugestaoByMaquinaId({ maquinaId }: { maquinaId: string }) {
  const response = await Api.get(`sugestao/maquina/${maquinaId}`)
    .then((res) => res)
    .catch((err) => err);

  return response;
}
async function DeleteBySugestaoId({ sugestaoId }: { sugestaoId: string }) {

}

async function InsertSugestao(sugestao: IInsertSugestao) {
  if (
    sugestao.descricaoSugestao === "" ||
    isNaN(sugestao.dataCobranca.getTime())
  )
    throw "Campo(s) obrigatório(s) vazio(s)!";

  const userProps = SearchInfoOfUserOnToken;

  const entity = {
    ...sugestao,
    usuarioSugestaoId: userProps.tokenInfo.idUser,
  };

  const response = await Api.post("sugestao", entity)
    .then((res) => res)
    .catch((err) => err);

  return response;
}

export { FetchSugestao, InsertSugestao,FetchSugestaoByMaquinaId };
