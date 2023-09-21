import InputUi from "../../../../UI/input/Input";
import ButtonUi from "../../../../UI/button/Button";
import style from "./style.module.css";
import { useEffect, useState } from "react";
import Api from "../../../../../service/api/assistenciaTecnica/Assistencia";

interface props {
    changeToogle: Function,
    refreshTable: Function,
    data: dataProps
}

interface dataProps {
    id: string,
    codigoRadar: string,
    descricao: string,
    preco: number,
    enderecoImagem: string;
    alteracao: userProps,
    cadastro: userProps
}
interface userProps {
    idUsuario: string,
    apelido: string,
    nome: string,
    dataHora: Date
}


export default function Card({ changeToogle, refreshTable, data }: props) {
    const { Input } = InputUi();
    const { Button } = ButtonUi();
    const [image, setImage] = useState<string>("");
    const [toogleFilterImage, setToogleFilterImage] = useState<boolean>(false);
    const [novaPeca, setNovaPeca] = useState({
        codigoRadar: "",
        descricao: "",
        preco: ""
    });
    const [dataAlteracao, setDataAlteracao] = useState<dataProps>({
        alteracao: {
            apelido: "",
            dataHora: new Date,
            idUsuario: "",
            nome: ""
        },
        cadastro: {
            apelido: "",
            dataHora: new Date,
            idUsuario: "",
            nome: ""
        },
        codigoRadar: "",
        descricao: "",
        enderecoImagem: "",
        id: "",
        preco: 0
    });
    useEffect(() => {
        setDataAlteracao(data);
    }, [data])

    async function Change() {
        if (dataAlteracao) {
            const obj = {
                pecaId: dataAlteracao.id,
                codigoRadar: dataAlteracao.codigoRadar,
                descricao: dataAlteracao.descricao,
                preco: dataAlteracao.preco,
                enderecoImagem: dataAlteracao.enderecoImagem,
                usuarioId: "2cb75138-9232-454e-8784-d777e50f7547"
            }
            await Api.put("/assistencia-tecnica/pecas", obj)
                .then(res => {
                    console.log(res.data)
                    refreshTable()
                })
                .catch(err => console.log(err))
        }
    }



    return (
        <form className={style.card} action="">
            <div className={toogleFilterImage ?
                style.containerFilterImage :
                style.containerFilterImage_close} >


            </div>
            <header className={style.title}>
                <h3>PEÇA</h3>
            </header>
            <main className={style.body} >
                <div className={style.container_codigoRadar} >
                    <Input
                        id="txtCodigoRadarAddChange"
                        text="CÓDIGO RADAR"
                        value={dataAlteracao?.codigoRadar ?? ""}
                        onChange={e => setDataAlteracao({
                            ...dataAlteracao,
                            codigoRadar: e.target.value
                        })}

                    />
                </div>
                <div className={style.container_descricao} >
                    <Input
                        id="txtDescricaoPecaChange"
                        text="DESCRIÇÃO"
                        value={dataAlteracao?.descricao ?? ""}
                        onChange={e => setDataAlteracao({
                            ...dataAlteracao,
                            descricao: e.target.value
                        })}
                    />
                </div>
                <div className={style.container_preco} >
                    <Input
                        id="txtPrecoChange"
                        text="PREÇO"
                        value={dataAlteracao?.preco ?? ""}
                        onChange={() => { }}
                    />
                </div>
                <div className={style.container_image} >
                    <Input
                        id="txtEnderecoImagemChange"
                        text="IMAGEM"
                        onClick={() => {
                            //FetchDataImages()
                            setToogleFilterImage(true)
                        }}
                        value={dataAlteracao?.enderecoImagem ?? ""}
                        blocked
                        onChange={() => { }}
                    />
                </div>
            </main>
            <footer className={style.button} >
                <div>
                    <Button
                        classUi="glass"
                        color="green"
                        text="CADASTRAR"
                        type="button"
                        onClick={() => Change()}
                    />
                </div>
                <div >
                    <Button
                        classUi="glass"
                        color="red"
                        text="FECHAR"
                        type="button"
                        onClick={() => changeToogle(false)}
                    />
                </div>

            </footer>
        </form>
    )
}