import { useEffect, useState } from "react";
import InputUi from "../../../UI/input/Input";
import styles from "./style.module.css";
import { Icons } from "../../../utils/IconDefault";
import { FetchData, ValidateUser, ValidateStatusReturnText } from "./Functions";
import FormSearParts from "./SearchParts/Card";
import FormConfirm from "./ConfirmSituacion/Card";
import { EStatus, IOrderService } from "../IOrderService";
import { DateAndYearStringFormat } from "../../../utils/DateTimeString";

interface Props {
    changeToogle: Function,
    toogle: boolean,
    OrderServiceId: number
}

export default function Info({ changeToogle, OrderServiceId, toogle }: Props) {

    const [listTecnico, setListTecnico] = useState<boolean>(false);
    const [toogleListParts, setToogleListParts] = useState<boolean>(false);
    const [toogleConfirm, setToogleConfirm] = useState<boolean>(false);
    const [data, setData] = useState<IOrderService>();
    const [textMessage, setTextMessage] = useState<string>("");
    const [situation, setSituation] = useState<EStatus>();
    const [typeFlowId, setTypeFlowId] = useState<number | undefined>(undefined)


    const { Input } = InputUi();

    useEffect(() => {
        const Fetch = async () => {
            if (toogle) {
                const result = await FetchData(OrderServiceId).then(res => res.data)

                setData(() => result)
            }
        }
        Fetch()
    }, [toogle])

    function HandleFormConfirmAndSituation({ typeSituation, typeFlowId }: {
        typeSituation: EStatus,
        typeFlowId: number
    }) {

        setTextMessage(() => ValidateStatusReturnText(typeSituation))
        setSituation(() => typeSituation)
        setTypeFlowId(() => typeFlowId)
        setToogleConfirm((current) => !current)

    }


    return (
        <main className={styles.containerInfo} >
            <div className={toogleListParts ?
                styles.containerSearchParts :
                styles.containerSearchParts_close} >
                <div className={styles.form} >
                    <FormSearParts
                        changeToogle={setToogleListParts}
                        toogle={toogleListParts} />
                </div>
            </div>
            <div className={
                `${styles.containerConfirm}
                    ${!toogleConfirm && styles['--close']}`
            } >
                <FormConfirm text={textMessage}
                    changleToogle={setToogleConfirm}
                    idOrderService={OrderServiceId}
                    updateInfo={setData}
                    typeFlowId={typeFlowId}
                    situation={situation} />
            </div>
            <header className={styles.header} >
                <div className={styles.containerButtonBack} >
                    <button className={styles.buttonBack} onClick={() => changeToogle(false)} >
                        <Icons.ArrowLeft />
                    </button>
                </div>
                <div className={styles.cotnainerButtonDaily} >
                    <button className={styles.buttonDaily} >
                        <Icons.Book />
                    </button>
                </div>
                <div className={styles.containerStatus} >
                    <span>{data?.situation}</span>
                </div>
                <div className={styles.containerNumeroOrdemServico} >
                    <span>{data?.id}</span>
                </div>
            </header>
            <main className={styles.body} >
                <div className={styles.firstRow} >
                    <div className={styles.inputExecucao} >
                        <Input id="inputLocalExecucao"
                            blocked text="LOCA/EXECUÇÃO"
                            value={data ? data.localeManinteace : ""}
                            onChange={() => { }} />
                    </div>
                    <div className={styles.inputTipoServico} >
                        <Input id="inputTipoServico"
                            blocked text="TIPO/SERVIÇO"
                            value={data ? data.typeService : ""}
                            onChange={() => { }} />
                    </div>
                    <div className={styles.inputCategoria} >
                        <Input id="inputCategoriaServico"
                            blocked text="CATEGORIA/SERVIÇO"
                            value={data ? data.category : ""}
                            onChange={() => { }} />
                    </div>
                    <div className={styles.inputDataIdeal} >
                        <Input id="inputDateIdealServico"
                            blocked text="DATA/IDEAL"
                            value={data ? DateAndYearStringFormat(data.suggestdMainteneaceDate) : ""}
                            onChange={() => { }} />
                    </div>
                    <div className={styles.inputTecnicoResponsavel} >
                        <input type="text" />
                        <label htmlFor="">TÉCNICO</label>
                    </div>
                    <div className={styles.descricaoServico} >
                        <textarea value={data ? data.description : ""} readOnly />
                        <label htmlFor="">DESCRIÇÃO</label>
                    </div>
                </div>
                <div className={styles.secondRow} >
                    <div className={styles.inputCodigo}>
                        <Input id="inputCodigo" type="text" text="CÓDIGO" iconRight={{
                            icon: Icons.Filter,
                            action: () => setToogleListParts((current) => !current)
                        }} />
                    </div>
                    <div className={styles.inputDescricao} >
                        <Input id="inputDescricao" blocked type="text" text="DESCRIÇÃO" />
                    </div>
                    <div className={styles.inputUnidade}>
                        <Input id="inputUniadde" blocked type="text" text="UNIDADE" />
                    </div>
                    <div className={styles.containerTable} >
                        <div className={styles.wrapContainerTable} >
                            <table className={styles.tablePecas} >
                                <thead>
                                    <tr>
                                        <th>CÓDIGO</th>
                                        <th>DESCRIÇÃO</th>
                                        <th>UNIDADE</th>
                                        <th>QTD.</th>
                                    </tr>
                                </thead>
                                <tbody>

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className={styles.thirdRow} >
                    <div className={styles.wrapTableSituacao} >
                        <table className={styles.tableSituacao} >
                            <thead>
                                <tr>
                                    <th>SITUAÇÃO</th>
                                    <th>DATA/HORA ÍNICIO</th>
                                    <th>USUÁRIO ÍNICIO</th>
                                    <th>DATA/HORA FIM</th>
                                    <th>USUÁRIO FIM</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody className={styles.tableBodyFlow} >
                                {data?.flowList && (
                                    data.flowList.map((item, index) => {
                                        const userInit = ValidateUser(item.userInit);
                                        const userEnd = ValidateUser(item.userEnd);
                                        return (
                                            <tr key={index} >
                                                <td>{item.typeFlow}</td>
                                                <td>{userInit.dateTime}</td>
                                                <td>{userInit.name}</td>
                                                <td>{userEnd.dateTime}</td>
                                                <td>{userEnd.name}</td>
                                                <td className={styles.actions} >
                                                    {index === 0 ? (
                                                        data.situation === "AGUARDANDO ATRIBUIÇÃO" && (
                                                            <>
                                                                <span onClick={() => {
                                                                    HandleFormConfirmAndSituation({
                                                                        typeFlowId: item.id,
                                                                        typeSituation: EStatus.ORDEM_INVALIDA
                                                                    })
                                                                }} className={styles['--red']} >INVÁLIDA</span>
                                                                <span onClick={() => {
                                                                    HandleFormConfirmAndSituation({
                                                                        typeFlowId: item.id,
                                                                        typeSituation: EStatus.AGUARDANDO_MANUTENCAO
                                                                    })
                                                                }} className={styles['--green']} >ATRIBUIR</span>
                                                            </>
                                                        )
                                                    ) : index === 1 ? (
                                                        data.situation === "ORDEM INVÁLIDA" && (
                                                            <>
                                                                <span onClick={() => {
                                                                    HandleFormConfirmAndSituation({
                                                                        typeFlowId: item.id,
                                                                        typeSituation: EStatus.ORDEM_FINALIZADA
                                                                    })
                                                                }} className={styles["--red"]} >CANCELAMENTO</span>
                                                                <span onClick={() => {
                                                                    HandleFormConfirmAndSituation({
                                                                        typeFlowId: item.id,
                                                                        typeSituation: EStatus.AGUARDANDO_VALIDACAO
                                                                    })
                                                                }} className={styles['--green']} >REVISÃO</span>
                                                            </>
                                                        )
                                                    ) : index === 2 ? (
                                                        data.situation === "AGUARDANDO MANUTENÇÃO" && (
                                                            <span onClick={() => {
                                                                HandleFormConfirmAndSituation({
                                                                    typeFlowId: item.id,
                                                                    typeSituation: EStatus.EM_MANUTENCA
                                                                })
                                                            }} className={styles['--orange']} >INICIAR MANUTENÇÃO</span>
                                                        )
                                                    ) : index === 5 ? (
                                                        data.situation === "EM MANUTENÇÃO" ||
                                                        data.situation === "MANUTENÇÃO INVÁLIDA" && (
                                                            <span onClick={() => {
                                                                HandleFormConfirmAndSituation({
                                                                    typeFlowId: item.id,
                                                                    typeSituation: EStatus.MANUTENCAO_FINALIZADA
                                                                })
                                                            }} className={styles['--orange']} >FINALIZAR MANUTENÇÃO</span>
                                                        )
                                                    ) : index === 6 ? (
                                                        data.situation === "MANUTENÇÃO FINALIZADA" && (
                                                            <span onClick={() => {
                                                                HandleFormConfirmAndSituation({
                                                                    typeFlowId: item.id,
                                                                    typeSituation: EStatus.MANUTENCAO_INVALIDA
                                                                })

                                                            }} className={styles['--red']} >MANUTENÇÃO INVÁLIDA</span>
                                                        )
                                                    ) : index === 7 ? (
                                                        data.situation === "MANUTENÇÃO FINALIZADA" && (
                                                            <span onClick={() => {
                                                                HandleFormConfirmAndSituation({
                                                                    typeFlowId: item.id,
                                                                    typeSituation: EStatus.ORDEM_FINALIZADA
                                                                })

                                                            }} className={styles['--green']} >FINALIZAR</span>
                                                        )
                                                    ) : ""}
                                                </td>
                                            </tr>
                                        )
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

        </main >
    )
}