import { useEffect, useState } from "react";
import InputUi from "../../../UI/input/Input";
import styles from "./style.module.css";
import { Icons } from "../../../utils/IconDefault";
import { FetchData } from "./Functions";
import FormSearParts from "./SearchParts/Card"
import { IOrderService } from "../IOrderService";
import { DateAndYearStringFormat } from "../../../utils/DateTimeString";

interface Props {
    changeToogle: Function,
    toogle: boolean,
    OrderServiceId: number
}

export default function Info({ changeToogle, OrderServiceId, toogle }: Props) {

    const [listTecnico, setListTecnico] = useState<boolean>(false);
    const [toogleListParts, setToogleListParts] = useState<boolean>(false);
    const [data, setData] = useState<IOrderService>();


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
                    <span>AGUARDANDO VALIDAÇÃO</span>
                </div>
                <div className={styles.containerNumeroOrdemServico} >
                    <span>1</span>
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
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>aqui</td>
                                    <td>aqui</td>
                                    <td>aqui</td>
                                    <td>aqui</td>
                                </tr>
                                <tr>
                                    <td>aqui</td>
                                    <td>aqui</td>
                                    <td>aqui</td>
                                    <td>aqui</td>
                                </tr>
                                <tr>
                                    <td>aqui</td>
                                    <td>aqui</td>
                                    <td>aqui</td>
                                    <td>aqui</td>
                                </tr>
                                <tr>
                                    <td>aqui</td>
                                    <td>aqui</td>
                                    <td>aqui</td>
                                    <td>aqui</td>
                                </tr>
                                <tr>
                                    <td>aqui</td>
                                    <td>aqui</td>
                                    <td>aqui</td>
                                    <td>aqui</td>
                                </tr>
                                <tr>
                                    <td>aqui</td>
                                    <td>aqui</td>
                                    <td>aqui</td>
                                    <td>aqui</td>
                                </tr>

                                <tr>
                                    <td>aqui</td>
                                    <td>aqui</td>
                                    <td>aqui</td>
                                    <td>aqui</td>
                                </tr>
                                <tr>
                                    <td>aqui</td>
                                    <td>aqui</td>
                                    <td>aqui</td>
                                    <td>aqui</td>
                                </tr>
                                <tr>
                                    <td>aqui</td>
                                    <td>aqui</td>
                                    <td>aqui</td>
                                    <td>aqui</td>
                                </tr>
                                <tr>
                                    <td>aqui</td>
                                    <td>aqui</td>
                                    <td>aqui</td>
                                    <td>aqui</td>
                                </tr>
                                <tr>
                                    <td>aqui</td>
                                    <td>aqui</td>
                                    <td>aqui</td>
                                    <td>aqui</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

        </main>
    )
}