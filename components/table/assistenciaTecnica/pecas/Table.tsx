import { useEffect, useState } from "react";
import Api from "../../../../service/api/assistenciaTecnica/Assistencia";

interface dataProps {
    id: string,
    nome: string,
    preco: number,
    enderecoImagem: string[];
}

export default function Table() {
    const [data, setData] = useState<dataProps[]>([]);
    useEffect(() => {

        Api.get("/assistencia-tecnica/pecas")
            .then(res => setData(res.data))
            .catch(err => console.log(err))
    }, [])
    console.log(data)
    async function searchImage(caminho: string) {
        try {
            const encodedCaminho = encodeURIComponent(`\\${caminho}`);
            const apiUrl = `/assistencia-tecnica/pecas/image/${encodedCaminho}`;

            // Realize a chamada à API diretamente no elemento <img>

            await Api.get(`/assistencia-tecnica/pecas/image/${encodedCaminho}`)
                .then(res => console.log("sucess"))
                .catch(err => console.log(err))

            return <img src={apiUrl} alt={`Imagem teste`} />;
        } catch (error) {
            console.error(error);
            return null; // Retorna algo ou null dependendo da sua necessidade
        }
    }
    return (
        <main>
            <button onClick={() => searchImage("\\192.168.2.24\\api_assistencia_tecnica\\Imagens\\rolamento.jpg")} >
                BUSCAR IMAGEM
            </button>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Peca</th>
                        <th>Valor</th>
                        <th>Img</th>
                    </tr>
                </thead>
                <tbody>
                    {data && (
                        data.map((item, index) => (
                            <tr key={index} >
                                <td>{item.id}</td>
                                <td>{item.nome}</td>
                                <td>{item.preco}</td>
                                <td>
                                    {item.enderecoImagem.map((image, index) => {
                                        const encodedCaminho = encodeURIComponent(`\\${image}`);
                                        const apiUrl = `http://localhost:5184/assistencia-tecnica/pecas/image/${encodedCaminho}`;
                                        console.log(apiUrl)
                                        return (

                                            <img src={apiUrl} alt={`Imagem teste`} />
                                        )
                                    })}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

        </main>
    )
}