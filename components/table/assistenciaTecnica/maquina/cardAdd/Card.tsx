import style from "./style.module.css";
import InputUi from "../../../../UI/input/Input";
import { useState } from "react";
import Api from "../../../../../service/api/assistenciaTecnica/Assistencia";
import Message from "../../../../message/Message";
import ButtonUi from "../../../../UI/button/Button";

interface props {
    changeToogle: Function,
    refreshTable: Function

}

export default function Card({ changeToogle, refreshTable }: props) {

    const [novaMaquina, setNomaMaquina] = useState({
        codigoMaquina: "",
        tipoMaquina: "",
        numeroSerie: ""
    })
    const [dataMessage, setDataMessage] = useState({
        message: "",
        type: "WARNING"
    })
    const [toogleMessage, setToogleMessage] = useState<boolean>(false);


    const { Input } = InputUi();
    const { Button } = ButtonUi();


    async function AddMaquina() {
        const { codigoMaquina, numeroSerie, tipoMaquina } = novaMaquina;
        if (codigoMaquina === "" ||
            tipoMaquina === "" ||
            numeroSerie === "") {
            setDataMessage({
                message: "Campo(s) obrigatório(s) vazio(s)!",
                type: "WARNIGN"
            })
            setToogleMessage(true);
            return;
        }
        const obj = {
            codigoMaquina: codigoMaquina,
            tipoMaquina: tipoMaquina,
            numeroSerie: numeroSerie,
            UserId: "96afb069-c572-4302-b631-8b6b16c825e7"
        }
        await Api.post("/maquina", obj)
            .then(res => {
                setDataMessage({
                    message: "Máquina adicionada com sucesso!",
                    type: "SUCESS"
                })
                refreshTable()
            })
            .catch(err => {
                if (err.response && (err.response.data)) {
                    setDataMessage({
                        message: err.response.data,
                        type: "WARNING"
                    })
                }

            })
            .finally(() => {
                setToogleMessage(true)
            })
    }
    return (
        <form className={style.card} action="">
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
            <section className={style.title} >
                <h3>
                    Nova máquina
                </h3>

            </section>
            <section className={style.body} >
                <div className={style.container_codigo} >
                    <Input
                        id="txtCodicoMaquina"
                        text="CÓDIGO"
                        value={novaMaquina.codigoMaquina}
                        maxLength={15}
                        onChange={(e) => setNomaMaquina({
                            ...novaMaquina,
                            codigoMaquina: e.target.value
                        })}
                    />
                </div>
                <div className={style.container_nomeMaquina} >
                    <Input
                        id="txtNovaMaquina"
                        text="Descrição"
                        value={novaMaquina.tipoMaquina}
                        onChange={(e) => setNomaMaquina({
                            ...novaMaquina,
                            tipoMaquina: e.target.value
                        })}
                        maxLength={50}
                    />
                </div>
                <div className={style.container_numeroSerie} >
                    <Input
                        id="txtNumeroSerie"
                        text="SÉRIE"
                        value={novaMaquina.numeroSerie}
                        onChange={(e) => setNomaMaquina({
                            ...novaMaquina,
                            numeroSerie: e.target.value
                        })}
                        maxLength={50}
                    />

                </div>
                <div className={style.container_table} >
                    <div className={style.wrapContainer_table} >
                        <table className={style.table} >
                            <thead>
                                <tr>
                                    <th>
                                        PEÇA
                                    </th>
                                    <th>
                                        IMG.
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* <tr>
                                    <td>Rolamento</td>
                                    <td>

                                        <img style={{
                                            width:50,
                                            height:50,
                                            borderRadius:"50%"
                                        }} src="http://192.168.2.24:8081/api/v1/assistencia-tecnica/pecas/image/%5C%5C192.168.2.24%5Capi_assistencia_tecnica%5CImagens%5Crolamento.jpg" alt="" />
                                    </td>
                                </tr> */}
                            </tbody>
                        </table>

                    </div>

                </div>
            </section>
            <footer className={style.button} >
                <div className={style.container_cadastrar} >
                    <Button
                        classUi="glass"
                        color="green"
                        text="CADASTRAR"
                        type="button"
                        onClick={() => AddMaquina()}
                    />
                </div>
                <div className={style.container_fechar} >
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