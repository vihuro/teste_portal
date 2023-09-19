import { useEffect, useState } from "react";
import Api from "../../../../service/api/assistenciaTecnica/Assistencia";
import style from "./style.module.css";
import { Icons } from "../../../utils/IconDefault";
import CardAdd from "./add/Card";

interface dataProps {
    id: string,
    codigoRadar: string,
    descricao: string,
    preco: number,
    enderecoImagem: string[];
}

export default function Table() {
    const [data, setData] = useState<dataProps[]>([]);
    const [toogleAdd, setToogleAdd] = useState<boolean>(false);


    useEffect(() => {
        FecthData();

    }, [])
    console.log(data)

    async function FecthData() {
        Api.get("/assistencia-tecnica/pecas")
            .then(res => setData(res.data))
            .catch(err => console.log(err))
    }

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
        <main className={style.container} >
            <div className={toogleAdd ?
                style.containerAdd :
                style.containerAdd_close} >
                <CardAdd changeToogle={setToogleAdd} refresTable={FecthData} />
            </div>
            <section className={style.container_button} >
                <button onClick={() => { }} >
                    Nova Peça
                </button>
            </section>
            <section className={style.container_table} >
                <div className={style.wrap_table} >
                    <table className={style.table} >
                        <thead>
                            <tr>
                                <th>+</th>
                                <th>CÓDIGO RADAR</th>
                                <th>DESCRIÇÃO</th>
                                <th>PREÇO</th>
                                <th>IMG</th>
                            </tr>
                        </thead>
                        <tbody className={style.table_body} >
                            {data && (
                                data.map((item, index) => (
                                    <tr key={index} >
                                        <td><Icons.ArrowFromTop /></td>
                                        <td>{item.codigoRadar}</td>
                                        <td>{item.descricao}</td>
                                        <td>{item.preco}</td>
                                        <td >
                                            {/* {item.enderecoImagem.map((image, indexImage) => {
                                            const encodedCaminho = encodeURIComponent(`\\${image}`);
                                            const apiUrl = `http://192.168.0.187:8081/api/v1/assistencia-tecnica/pecas/image/${encodedCaminho}`;
                                            return (
                                                <div key={indexImage} style={{
                                                    width: 40,
                                                    height: 40,
                                                    display:"flex",
                                                    justifyContent:"center",
                                                    alignItems:"center",
                                                    borderRadius: "50%",
                                                    border: "1px solid black",
                                                    position: "relative",
                                                    left:7,
                                                    overflow: "hidden"
                                                }} >
                                                    <img style={{
                                                        maxWidth: "100%", // Define a largura máxima da imagem para 100% da div
                                                        maxHeight: "100%", // Define a altura máxima da imagem para 100% da div
                                                    }} src={apiUrl} alt={`Imagem teste`} />
                                                </div>
                                            )
                                        })} */}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </section>

        </main>
    )
}