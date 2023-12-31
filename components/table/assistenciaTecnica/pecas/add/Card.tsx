import { useState } from "react";
import InputUi from "../../../../UI/input/Input";
import ButtonUi from "../../../../UI/button/Button";
import style from "./style.module.css";
import FilterImages from "./filterImages/Card";
import Api from "../../../../../service/api/assistenciaTecnica/Assistencia";
import Message from "../../../../message/Message";
import Loading from "../../../../loading/Loading";
import { tokenProps } from "../../../../utils/infoToken";
import TokenDrecriptor from "../../../../../service/DecriptorToken";
import { parseCookies } from "nookies";

interface props {
    changeToogle: Function,
    refresTable: Function
}

export default function Card({ changeToogle, refresTable }: props) {
    const { Input } = InputUi();
    const { Button } = ButtonUi();
    const [image, setImage] = useState<string>("");
    const [toogleFilterImage, setToogleFilterImage] = useState<boolean>(false);
    const [toogleLoading, setToogleLoading] = useState<boolean>(false);
    const [toogleMessage, setToogleMessage] = useState<boolean>(false);
    const [dataMessage, setDataMessage] = useState({
        message: "",
        type: "WARNING"
    })
    const [valuePrecoDooble, setValuePrecoDooble] = useState<number>();
    const [valuePrecoString, setValuePrecoString] = useState<string>("");

    const { CardFilterImage, FetchData: FetchDataImages } = FilterImages({ changeToogle: setToogleFilterImage, changeText: setImage });

    const [novaPeca, setNovaPeca] = useState({
        codigoRadar: "",
        descricao: "",
        preco: ""
    });
    const handleChange = (text: string) => {

        //const text = e.target.value;

        const string = text.replaceAll(".", "").replace(",", ".");

        const dooble = parseFloat(string)
        const stringInput = dooble.toLocaleString("pt-Br", {
            style: "decimal",
            maximumFractionDigits: 2
        })


        const caracteres = text.length;
        const lastCharacter = text.charAt(caracteres - 1);


        const stringConvert = lastCharacter === "," ? stringInput + "," : stringInput

        setValuePrecoDooble(valuePrecoDooble);

        setValuePrecoString(stringConvert)

    };
    const tokenInfo: tokenProps = TokenDrecriptor(parseCookies().ACCESS_TOKEN)

    async function Cadastrar() {
        const formattedValue = valuePrecoString.replaceAll(".", "").replace(",", ".")

        const newData = {
            codigoRadar: novaPeca.codigoRadar,
            descricao: novaPeca.descricao,
            preco: parseFloat(formattedValue),
            usuarioId: tokenInfo.idUser,
            enderecoImagem: image
        }
        console.log(newData)

        await Api.post("assistencia-tecnica/pecas", newData)
            .then(res => {
                refresTable(),
                    setDataMessage({
                        message: "PEÇA CADASTRADA COM SUCESSO!",
                        type: "SUCESS"
                    }),
                    setNovaPeca({
                        codigoRadar: "",
                        descricao: "",
                        preco: ''
                    })
                setImage("");
                setValuePrecoString("");
            })
            .catch(err => {
                console.log(err)
                if (err && (err.response && err.response.data)) {

                    setDataMessage({
                        message: err.response.data,
                        type: "WARNING"
                    })
                } else {
                    setDataMessage({
                        message: "ERRO NO SERVIDOR",
                        type: "ERROR"
                    })
                }
            })
            .finally(() => {
                setToogleMessage(true);
                setToogleLoading(false);

            });
    }

    return (
        <form className={style.card} action="">
            <div className={toogleFilterImage ?
                style.containerFilterImage :
                style.containerFilterImage_close} >

                <CardFilterImage />
            </div>
            <div className={toogleMessage ?
                style.container_message :
                style.container_message_close} >
                <Message
                    stateMessage={toogleMessage}
                    action={setToogleMessage}
                    message={dataMessage.message}
                    type={dataMessage.type}
                />
            </div>
            <div className={toogleLoading ?
                style.container_loading :
                style.container_loading_close} >
                <Loading />
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
                        autoComplete="off"
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
                        autoComplete="off"
                    />
                </div>
                <div className={style.container_preco} >
                    <Input
                        id="txtPreco"
                        text="PREÇO"
                        value={valuePrecoString}
                        onChange={e => {
                            handleChange(e.target.value)
                        }}
                        autoComplete="off"
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
                        onClick={() => {
                            setToogleLoading(true),
                                Cadastrar()
                        }}
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