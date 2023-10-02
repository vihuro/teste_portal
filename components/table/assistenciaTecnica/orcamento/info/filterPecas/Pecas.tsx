import Api from "../../../../../../service/api/assistenciaTecnica/Assistencia"

export default function FilterPecas() {


    function FetchDataPecas() {
        Api.get('pecas')
            .then(res => res.data)
            .catch(err => console.log(err))
    }

    function Card() {
        return(
            <section></section>
        )
    }

    return {
        Card,
        FetchDataPecas
    }
}
