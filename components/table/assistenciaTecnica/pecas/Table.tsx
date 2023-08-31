import { useEffect, useState } from "react";
import Api from "../../../../service/api/assistenciaTecnica/Assistencia";
import style from "./style.module.css";

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
        <main className={style.container_body} >
            <section className={style.wrap_table} >
                <table className={style.table} >
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
                                            const apiUrl = `http://192.168.0.105:8081/api/v1/assistencia-tecnica/pecas/image/${encodedCaminho}`;
                                            return (
                                                <div style={{
                                                    width: 40,
                                                    height: 40,
                                                    borderRadius: "50%",
                                                    border: "1px solid black",
                                                    position: "relative",
                                                    padding: 2,
                                                    overflow: "hidden"
                                                }} >
                                                    <img style={{
                                                        maxWidth: "100%", // Define a largura máxima da imagem para 100% da div
                                                        maxHeight: "100%", // Define a altura máxima da imagem para 100% da div
                                                    }} src={apiUrl} alt={`Imagem teste`} />
                                                </div>
                                            )
                                        })}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </section>

        </main>
    )
}