import { useState } from "react";
import InputUi from "../../../../UI/input/Input";
import style from "./style.module.css";
import FilterImages from "./filterImages/Card";
import ButtonUi from "../../../../UI/button/Button";
import Api from "../../../../../service/api/assistenciaTecnica/Assistencia";

interface props {
    changeToogle: Function,
    refresTable: Function
}

export default function Card({ changeToogle }: props) {
    const { Input } = InputUi();
    const { Button } = ButtonUi();
    const [image, setImage] = useState<string>("");
    const [toogleFilterImage, setToogleFilterImage] = useState<boolean>(false);

    const { CardFilterImage, FetchData: FetchDataImages } = FilterImages({ changeToogle: setToogleFilterImage, changeText: setImage });

    const [novaPeca, setNovaPeca] = useState({
        codigoRadar: "",
        descricao: "",
        preco: ""
    });

    async function Cadastrar() {
        const newData = {
            codigoRadar: novaPeca.codigoRadar,
            descricao: novaPeca.descricao,
            preco: parseFloat(novaPeca.preco),
            usuarioId: "96afb069-c572-4302-b631-8b6b16c825e7",
            enderecoImagens: [image]
        }

        Api.post("assistencia-tecnica/pecas", newData)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }

    return (
        <form className={style.card} action="">
            <div className={toogleFilterImage ?
                style.containerFilterImage :
                style.containerFilterImage_close} >

                <CardFilterImage />
            </div>
            <header className={style.title}>
                <h3>NOVA PEÇA</h3>
            </header>
            <main className={style.body} >
                <div className={style.container_codigoRadar} >
                    <Input
                        id="txtCodigoRadarAdd"
                        text="CÓDIGO RADAR"
                        value={novaPeca.codigoRadar}
                        onChange={e => setNovaPeca({
                            ...novaPeca,
                            codigoRadar: e.target.value
                        })}

                    />
                </div>
                <div className={style.container_descricao} >
                    <Input
                        id="txtDescricaoPeca"
                        text="DESCRIÇÃO"
                        value={novaPeca.descricao}
                        onChange={e => setNovaPeca({
                            ...novaPeca,
                            descricao: e.target.value
                        })}
                    />
                </div>
                <div className={style.container_preco} >
                    <Input
                        id="txtPreco"
                        text="PREÇO"
                        value={novaPeca.preco}
                        onChange={e => setNovaPeca({
                            ...novaPeca,
                            preco: e.target.value
                        })}
                    />
                </div>
                <div className={style.container_image} >
                    <Input
                        id="txtEnderecoImagem"
                        text="IMAGEM"
                        onClick={() => {
                            FetchDataImages()
                            setToogleFilterImage(true)
                        }}
                        value={image}
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
                        onClick={() => Cadastrar()}
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