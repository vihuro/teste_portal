import style from "./style.module.css";
import InputUi from "../../../../UI/input/Input";
import { useState } from "react";
import Api from "../../../../../service/api/assistenciaTecnica/Assistencia";
import Message from "../../../../message/Message";
import ButtonUi from "../../../../UI/button/Button";
import CardFilter from "../pecasDisponiveis/PecaDisponive";
import { Icons } from "../../../../utils/IconDefault";
import Loading from "../../../../loading/Loading";
import TokenDrecriptor from "../../../../../service/DecriptorToken";
import { getCookieParser } from "next/dist/server/api-utils";
import { parseCookies } from "nookies";
import { tokenProps } from "../../../../utils/infoToken";
import { Form as FormFilterMachine } from "./Filter/FilterMaquinaRadar";
import { IMachineProps } from "../IMaquina";
import { IMaquinaRadarProps } from "../IMaquinaFileRadar";


interface props {
    changeToogle: Function,
    refreshTable: Function

}



export default function Card({ changeToogle, refreshTable }: props) {

    const [novaMaquina, setNomaMaquina] = useState({
        codigoMaquina: "",
        descricaoMaquina: "",
        numeroSerie: ""
    })
    const [dataMessage, setDataMessage] = useState({
        message: "",
        type: "WARNING"
    })
    const [toogleMessage, setToogleMessage] = useState<boolean>(false);
    const [tooglFilter, setToogleFilter] = useState<boolean>(false);
    const [toogleLoading, setToogleLoading] = useState<boolean>(false);
    const [toogleFilterMaquina, setToogleFiterMaquina] = useState<boolean>(false);
    const [infoMachine, setInfoMachine] = useState<IMaquinaRadarProps>({
        classCodigo: "",
        codigo: "",
        descricao: "",
        familia: "",
        unidade: ""
    });


    const { Input } = InputUi();
    const { Button } = ButtonUi();
    const { CardPecas, FetchData: FetchDataPecas, listPecas, setListPecas } = CardFilter({
        changeToogle: setToogleFilter
    });
    const tokenInfo: tokenProps = TokenDrecriptor(parseCookies().ACCESS_TOKEN)


    async function AddMaquina() {
        const { codigoMaquina, numeroSerie, descricaoMaquina } = novaMaquina;
        if (infoMachine.codigo === "" ||
            infoMachine.descricao === "" ||
            numeroSerie === "") {
            setDataMessage({
                message: "Campo(s) obrigatório(s) vazio(s)!",
                type: "WARNIGN"
            })
            setToogleLoading(false);
            setToogleMessage(true);
            return;
        }
        const obj = {
            codigoMaquina: infoMachine.codigo,
            descricaoMaquina: infoMachine.descricao,
            numeroSerie: numeroSerie,
            UserId: tokenInfo.idUser,
            pecas: listPecas.map(item => ({
                idPeca: item.id
            }))
        }
        await Api.post("/maquina", obj)
            .then(res => {
                setDataMessage({
                    message: "Máquina adicionada com sucesso!",
                    type: "SUCESS"
                })
                refreshTable()
                setNomaMaquina({
                    codigoMaquina: "",
                    descricaoMaquina: "",
                    numeroSerie: ""
                })
                setListPecas([])
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
                setToogleLoading(false);
            })
    }
    async function searchMachine(codigo: string) {
        setToogleLoading((current) => current = true);
        await Api.get(`/maquina/${codigo}`)
            .then(res => {
                setNomaMaquina((current) => ({
                    ...current,
                    codigoMaquina: res.data.codigo,
                    descricaoMaquina: res.data.descricaoMaquina
                }))
            })
            .catch(err => {
                if (err &&
                    (err.response &&
                        (err.response.data))) {
                    setDataMessage((current) =>
                        current = {
                            message: err.response.data,
                            type: "WARNING"
                        }
                    )
                    setToogleMessage((current) => current = true)
                }
            })
            .finally(() => {
                setToogleLoading((current) => current = false)
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
            <div className={toogleLoading ?
                style.container_loading :
                style.container_loading_close} >
                <Loading />
            </div>
            <div className={tooglFilter ?
                style.filterPeca :
                style.filterPeca_close} >
                <CardPecas />
            </div>
            <div className={toogleFilterMaquina ?
                style.filterMachine :
                style.filterMachine_close} >
                <FormFilterMachine
                    toogle={toogleFilterMaquina}
                    changeInfoMachine={setInfoMachine}
                    changeToogle={setToogleFiterMaquina}
                />
            </div>
            <section className={style.title} >
                <h3>
                    Nova Máquina
                </h3>

            </section>
            <section className={style.body} >
                <div className={style.container_codigo} >
                    <Input
                        id="txtCodicoMaquina"
                        text="CÓDIGO"
                        autoComplete="off"
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                searchMachine(infoMachine.codigo)
                            }
                        }}
                        value={infoMachine.codigo}
                        maxLength={15}
                        onChange={(e) => setInfoMachine((current) => ({
                            ...current,
                            codigo: e.target.value
                        }))}
                        iconRight={{
                            action: () => console.log("olá mundo"),
                            icon: Icons.Search
                        }}
                        iconLeft={{
                            action: () => setToogleFiterMaquina((current) => current = true),
                            icon: Icons.Filter
                        }}
                    />
                </div>
                <div className={style.container_nomeMaquina} >
                    <Input
                        id="txtNovaMaquina"
                        text="Descrição"
                        autoComplete="off"
                        value={infoMachine.descricao}
                        onChange={() => { }}
                        maxLength={50}
                        blocked
                    />
                </div>
                <div className={style.container_numeroSerie} >
                    <Input
                        id="txtNumeroSerie"
                        text="SÉRIE"
                        autoComplete="off"
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
                                        CÓDIG
                                    </th>
                                    <th>
                                        DESCRIÇÃO
                                    </th>
                                    <th>DEL.</th>
                                </tr>
                            </thead>
                            <tbody className={style.table_body}>
                                {listPecas && (
                                    listPecas.map((item, index) => (
                                        <tr key={index} >
                                            <td>
                                                {item.codigoRadar}
                                            </td>
                                            <td>
                                                {item.descricao}
                                            </td>
                                            <td onClick={() =>
                                                setListPecas(
                                                    listPecas.filter(pecaId => pecaId.id !== item.id)
                                                )
                                            } >
                                                <Icons.Delete />
                                            </td>
                                        </tr>
                                    ))
                                )}
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
                    <section>
                        <Button
                            classUi="default"
                            color="blue"
                            icon={Icons.Filter}
                            type="button"
                            onClick={() => {
                                FetchDataPecas()
                                setToogleFilter(true)
                            }}
                        />
                    </section>

                </div>
            </section>
            <footer className={style.button} >
                <div className={style.container_cadastrar} >
                    <Button
                        classUi="glass"
                        color="green"
                        text="CADASTRAR"
                        type="button"
                        onClick={() => {
                            setToogleLoading(true)
                            AddMaquina()
                        }}
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