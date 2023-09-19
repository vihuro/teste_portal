import { useState } from "react";
import InputUi from "../../../../UI/input/Input";
import style from "./style.module.css";
import FilterImages from "./filterImages/Card";

interface props {
    changeToogle: Function,
    refresTable: Function
}

export default function Card({ changeToogle }: props) {
    const { Input } = InputUi();
    const [image, setImage] = useState<string>("");
    const [toogleFilterImage, setToogleFilterImage] = useState<boolean>(false);

    const { CardFilterImage, FetchData: FetchDataImages } = FilterImages({ changeToogle: setToogleFilterImage, changeText: setImage });

    console.log(image)
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

                    />
                </div>
                <div className={style.container_descricao} >
                    <Input
                        id="txtDescricaoPeca"
                        text="DESCRIÇÃO"
                    />
                </div>
                <div className={style.container_preco} >
                    <Input
                        id="txtPreco"
                        text="PREÇO"
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

            </footer>
        </form>
    )
}