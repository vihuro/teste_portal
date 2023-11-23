import { useState } from "react";
import InputUi from "../../../UI/input/Input";
import styles from "./style.module.css";
import { Icons } from "../../../utils/IconDefault";
import { } from "./Functions";


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