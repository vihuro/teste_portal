import Api from "../../../../service/api/manutencao/Manutencao"

function Castrar() {

}

async function FetchData(id: number) {

    var result = await Api.get(`order-service/${id}`)
        .then(res => res)
        .catch(err => err);

    return result;
}


export {
    Castrar,
    FetchData
}