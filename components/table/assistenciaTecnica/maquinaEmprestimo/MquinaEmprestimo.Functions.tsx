import Api from "../../../../service/api/assistenciaTecnica/Assistencia";

export async function GetEmprestimos() {
  const response = await Api.get("maquina/cliente/emprestimos")
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });

  return response;
}
