import Api from "../../../../service/api/assistenciaTecnica/Assistencia";

export async function GetHistorico(numeroSerie: string) {
  const response = await Api.get(`orcamento/numero-serie/${numeroSerie}`)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });

  return response;
}
