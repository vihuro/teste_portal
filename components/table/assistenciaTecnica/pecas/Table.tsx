import { Fragment, useEffect, useState } from "react";
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
    const [toogleInfoPlus, setToogleInfoPlus] = useState<boolean>(false);
    const [indiceInfoPlus, setIndiceInfoPlus] = useState<number>();
    const [colSpan, setColspan] = useState<number>(6);



    useEffect(() => {
        FecthData();

    }, [])

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
                <button onClick={() => setToogleAdd(true)} >
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
                                <th>EDIT.</th>
                            </tr>
                        </thead>
                        <tbody className={style.table_body} >
                            {data && (
                                data.map((item, index) => (
                                    <Fragment key={index} >
                                        <tr className={style.row} >
                                            <td>
                                                <Icons.ArrowFromTop />
                                            </td>
                                            <td>{item.codigoRadar}</td>
                                            <td>{item.descricao}</td>
                                            <td>{item.preco}</td>
                                            <td >
                                                <p className={style.visualizar}>
                                                    VISUALIZAR
                                                </p>
                                            </td>
                                            <td className={style.edit} >
                                                <Icons.Edit />
                                            </td>
                                        </tr>
                                        <>
                                            <tr className={style.infoPlus} >
                                                <td colSpan={colSpan} >
                                                    {`USUÁRIO DO CADASTRO: ${item.codigoRadar}`}
                                                </td>
                                            </tr>
                                            <tr className={style.infoPlus} >
                                                <td colSpan={colSpan} >
                                                    {`DATA E HORA DO CADASTRO: ${item.codigoRadar}`}
                                                </td>
                                            </tr>
                                            <tr className={style.infoPlus} >
                                                <td colSpan={colSpan} >
                                                    {`USUÁRIO DA ALTERAÇÃO: ${item.codigoRadar}`}
                                                </td>
                                            </tr>
                                            <tr className={style.infoPlus} >
                                                <td colSpan={colSpan} >
                                                    {`DATA E HORA DA ALTERAÇÃO: ${item.codigoRadar}`}
                                                </td>
                                            </tr>
                                        </>
                                    </Fragment>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </section>

        </main>
    )
}