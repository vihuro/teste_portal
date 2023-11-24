import Api from "../../../../../service/api/manutencao/Manutencao"

async function FetchData() {
    var result = await Api.get("storage/parts")
        .then(res => res)
        .catch(err => err)

    return result;
}







export { FetchData }