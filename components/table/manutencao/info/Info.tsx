import { useState } from "react";
import InputUi from "../../../UI/input/Input";
import styles from "./style.module.css";
import { Icons } from "../../../utils/IconDefault";


export default function Info({ changeToogle }: { changeToogle: Function }) {

    const [listTecnico, setListTecnico] = useState<boolean>(false);


    const { Input } = InputUi();

    return (
        <main className={styles.containerInfo} >
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
                        <Input id="inputLocalExecucao" text="LOCA/EXECUÇÃO" />
                    </div>
                    <div className={styles.inputTipoServico} >
                        <Input id="inputTipoServico" text="TIPO/SERVIÇO" />
                    </div>
                    <div className={styles.inputCategoria} >
                        <Input id="inputCategoriaServico" text="CATEGORIA/SERVIÇO" />
                    </div>
                    <div className={styles.inputDataIdeal} >
                        <Input id="inputDateIdealServico" text="DATA/IDEAL" />
                    </div>
                    <div className={styles.inputTecnicoResponsavel} >
                        <input type="text" />
                        <label htmlFor="">TÉCNICO</label>
                    </div>
                    <div className={styles.descricaoServico} >
                        <textarea >

                        </textarea>
                        <label htmlFor="">DESCRIÇÃO</label>
                    </div>
                </div>
                <div className={styles.secondRow} >
                    <div className={styles.inputCodigo}>
                        <Input id="inputCodigo" type="text" text="CÓDIGO" />
                    </div>
                    <div className={styles.inputDescricao} >
                        <Input id="inputDescricao" type="text" text="DESCRIÇÃO" />
                    </div>
                    <div className={styles.inputUnidade}>
                        <Input id="inputUniadde" type="text" text="UNIDADE" />
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
                                    <tr>
                                        <td>defjdçkjdf klfjlkdjflkdjdkljfdkle</td>
                                        <td>tete</td>
                                        <td>tete</td>
                                        <td>tete</td>
                                    </tr>
                                    <tr>
                                        <td>dee</td>
                                        <td>tete</td>
                                        <td>tete</td>
                                        <td>tete</td>
                                    </tr>
                                    <tr>
                                        <td>dee</td>
                                        <td>tete</td>
                                        <td>tete</td>
                                        <td>tete</td>
                                    </tr>
                                    <tr>
                                        <td>dee</td>
                                        <td>tete</td>
                                        <td>tete</td>
                                        <td>tete</td>
                                    </tr>
                                    <tr>
                                        <td>dee</td>
                                        <td>tete</td>
                                        <td>tete</td>
                                        <td>tete</td>
                                    </tr>
                                    <tr>
                                        <td>dee</td>
                                        <td>tete</td>
                                        <td>tete</td>
                                        <td>tete</td>
                                    </tr>
                                    <tr>
                                        <td>dee</td>
                                        <td>tete</td>
                                        <td>tete</td>
                                        <td>tete</td>
                                    </tr>
                                    <tr>
                                        <td>dee</td>
                                        <td>tete</td>
                                        <td>tete</td>
                                        <td>tete</td>
                                    </tr>
                                    <tr>
                                        <td>dee</td>
                                        <td>tete</td>
                                        <td>tete</td>
                                        <td>tete</td>
                                    </tr>
                                    <tr>
                                        <td>dee</td>
                                        <td>tete</td>
                                        <td>tete</td>
                                        <td>tete</td>
                                    </tr>
                                    <tr>
                                        <td>dee</td>
                                        <td>tete</td>
                                        <td>tete</td>
                                        <td>tete</td>
                                    </tr>
                                    <tr>
                                        <td>dee</td>
                                        <td>tete</td>
                                        <td>tete</td>
                                        <td>tete</td>
                                    </tr>
                                    <tr>
                                        <td>dee</td>
                                        <td>tete</td>
                                        <td>tete</td>
                                        <td>tete</td>
                                    </tr>
                                    <tr>
                                        <td>dee</td>
                                        <td>tete</td>
                                        <td>tete</td>
                                        <td>tete</td>
                                    </tr>
                                    <tr>
                                        <td>dee</td>
                                        <td>tete</td>
                                        <td>tete</td>
                                        <td>tete</td>
                                    </tr>
                                    <tr>
                                        <td>dee</td>
                                        <td>tete</td>
                                        <td>tete</td>
                                        <td>tete</td>
                                    </tr>
                                    <tr>
                                        <td>dee</td>
                                        <td>tete</td>
                                        <td>tete</td>
                                        <td>tete</td>
                                    </tr>
                                    <tr>
                                        <td>dee</td>
                                        <td>tete</td>
                                        <td>tete</td>
                                        <td>tete</td>
                                    </tr>
                                    <tr>
                                        <td>dee</td>
                                        <td>tete</td>
                                        <td>tete</td>
                                        <td>tete</td>
                                    </tr>
                                    <tr>
                                        <td>dee</td>
                                        <td>tete</td>
                                        <td>tete</td>
                                        <td>tete</td>
                                    </tr>
                                    <tr>
                                        <td>dee</td>
                                        <td>tete</td>
                                        <td>tete</td>
                                        <td>tete</td>
                                    </tr>
                                    <tr>
                                        <td>dee</td>
                                        <td>tete</td>
                                        <td>tete</td>
                                        <td>tete</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className={styles.thirdRow} >
                    <div className={styles.wrapTableSituation} >

                    </div>
                </div>
            </main>
            {/* <header className={styles.container_header} >
                <button onClick={() => changeToogle(false)} >
                    <Icons.ArrowLeft />
                </button>
            </header>
            <main className={styles.containerBody} >
                <div className={styles.containerExecucao} >
                    <Input
                        id="txtExecucaoChange"
                        text="LOCAL"
                        blocked
                    />
                </div>
                <div className={styles.containerTipoServico} >
                    <Input
                        id="txtTipoServicoChange"
                        text="TIPO/SERV."
                        blocked
                    />
                </div>
                <div className={styles.containerCategoriaServico} >
                    <Input
                        id="txtCategoriaServicoChange"
                        text="CATEGORIA/SERV."
                        blocked
                    />
                </div>
                <div className={styles.containerDataIdeal} >
                    <Input
                        id="txtDataIdealServico"
                        type="date"
                    />
                </div>
                <div className={styles.containerPrioridade} >
                    <input type="text" />
                    <label htmlFor=""></label>
                </div>
                <div onClick={() => {
                    setListTecnico(!listTecnico)
                }} className={styles.containerTecnico}>
                    <input type="text" />
                    <label htmlFor="">TÉCNICO</label>
                    <ul className={listTecnico ?
                        styles.containerListTecnico :
                        styles.containerListTecnico_close} >
                        <li>WILDEN SILVA</li>
                        <li>JOÃO PLINIO</li>
                        <li>JOÃO</li>
                        <li>GEROLDI</li>
                    </ul>
                </div>
            </main> */}
        </main>
    )
}