import Api from "../../../../service/api/assistenciaTecnica/Assistencia";
import { CustomError } from "../../../utils/Erro";
import { InsertClienteProps } from "./ICliente";

export async function GetCliente() {
  const response = await Api.get("/cliente")
    .then((res) => res.data)
    .catch((err) => err);

  return response;
}

export async function InsertCliente(request: InsertClienteProps) {
  const teste = Validate(request);
  console.log(teste);

  const obj: InsertClienteProps = {
    ...request,
    cnpj: ToCleanCnpj(request.cnpj),
  };
  let Teste = {
    message: "",
  };
  if (Validate(obj))
    throw CustomError({
      message: "Campo(s) obrigató(s) vazio(s)!",
    });

  const response = await Api.post("/cliente", obj)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });

  return response;
}
function Validate(request: InsertClienteProps) {
  if (
    request.codigoRadar === "" ||
    request.cnpj === "" ||
    request.nome === "" ||
    request.cep === "" ||
    request.rua === "" ||
    request.numeroEstabelecimento === "" ||
    request.cidade === "" ||
    request.estado === "" ||
    request.regiao === ""
  ) {
    return false;
  }
  return true;
}
function ToCleanCnpj(value: string) {
  const cnpj = value.replaceAll(".", "").replace("/", "").replace("-", "");

  return cnpj;
}

export async function GetMaquinaDisponivel() {}
