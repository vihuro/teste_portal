import { Fragment, useEffect, useState } from "react";
import styles from "./style.module.css";
import { Manutencao } from "./fakeManutencao";
import { Icons } from "../../utils/IconDefault";
import Add from "./Add/addOrdemServico";
import Info from "./info/Info";

interface dataProps {
    numeroOrdemServico: number,
    execucao: string,
    tipoServico: string,
    categoriaServico: string,
    dataIdeal: string,
    statusOrdemServico: string,
    dataHoraGeracao: string,
    usuarioGeracao: string,
    dataHoraAlteracao: string,
    usuarioAlteracao: string,
    prioridade: string
}

export default function Table() {
    const [data, setData] = useState<dataProps[]>();

    const [toogleAdd, setToogleAdd] = useState<boolean>(false);
    const [toogleInfo, setToogleInfo] = useState<boolean>(false);

    useEffect(() => {
        setData(Manutencao as unknown as dataProps[]);
    }, [])
    interface StyleData {
        background: string;
        color: string;
    }

    // Interface para representar o objeto de status
    interface StyleKey {
        [key: string]: StyleData;
    }


    const STATUS: StyleKey = {
        "AGUARDANDO VERIFICAÇÃO": {
            background: "#feff00",
            color: "#747512"
        },
        "AGURDANDO MANUTENÇÃO": {
            background: "#ffa200",
            color: "#6b4708"
        },
        "AGUARDANDO PEÇAS": {
            background: "#4d00ff",
            color: "#f9f9f9a1"
        },
        "AGUARDANDO COMPRA DE PEÇAS": {
            background: "#4d00ff",
            color: "#fbfafb9e"
        },
        "AGUARDANDO CHEGADA DE PEÇAS": {
            background: "#ff00c6",
            color: "#811569"
        },
        "AGUARDANDO VERIFIÇÃO DE PEÇAS": {
            background: "#00f1ff",
            color: "#0a7c83"
        },
        "AGUARDANDO FINALIZAÇÃO DE MANUTENÇÃO": {
            background: "#ff0045",
            color: "#7b0928"
        }
    };
    const PRIORIDADE: StyleKey = {
        "ALTA": {
            background: "#ff0000",
            color: "#7d0404"
        },
        "BAIXA": {
            background: "#00ff50",
            color: "#046d25"
        },
        "NORMAL": {
            background: "#0035ff",
            color: "#ffffff87"
        }
    }


    function searchColorStatus(text: string) {
        const colors = STATUS[text];


        return {
            background: colors ? colors.background : "",
            color: colors ? colors.color : ""
        };
    }
    function searchColorPrioridade(text: string) {
        const colors = PRIORIDADE[text]

        return {
            background: colors ? colors.background : "",
            color: colors ? colors.color : ""
        }
    }

    return (
        <main className={styles.container} >
            <div className={toogleInfo ?
                styles.containerInfo :
                styles.containerInfo_close} >
                <Info changeToogle={setToogleInfo} />
            </div>
            <div className={!toogleInfo ?
                styles.containerTable :
                styles.containerTable_close} >
                <div className={toogleAdd ?
                    styles.container_add :
                    styles.container_add_close} >
                    <div className={toogleAdd ?
                        styles.form :
                        styles.form_close} >
                        <Add changeToogle={setToogleAdd} />
                    </div>
                </div>
                <header className={styles.container_button} >
                    <button onClick={() => setToogleAdd(!toogleAdd)}>
                        NOVA OS
                    </button>
                </header>
                <main className={styles.container_table} >
                    <section className={styles.wrap_container_table} >
                        <table className={styles.table} >
                            <thead>
                                <tr>
                                    <th>+</th>
                                    <th>Nº OS</th>
                                    <th>EXECUÇÃO</th>
                                    <th>TIPO/SERV.</th>
                                    <th>CATEGORIA</th>
                                    <th>DATA/ IDEAL</th>
                                    <th>PRIORIDADE</th>
                                    <th>STATUS</th>
                                    <th>INFO</th>
                                </tr>
                            </thead>
                            <tbody className={styles.table_body} >
                                {data && (
                                    data.map((item, index) => (
                                        <Fragment key={index} >
                                            <tr>
                                                <td><Icons.ArrowFromTop /></td>
                                                <td>{item.numeroOrdemServico}</td>
                                                <td>{item.execucao}</td>
                                                <td>{item.tipoServico}</td>
                                                <td>{item.categoriaServico}</td>
                                                <td>{item.dataIdeal}</td>
                                                <td>
                                                    <p
                                                        style={searchColorPrioridade(item.prioridade)}
                                                        className={styles.tagPrioridade}
                                                    >
                                                        {item.prioridade}
                                                    </p>
                                                </td>
                                                <td>
                                                    <p
                                                        style={searchColorStatus(item.statusOrdemServico)}
                                                        className={styles.tagStatus}
                                                    >
                                                        {item.statusOrdemServico}
                                                    </p>
                                                </td>
                                                <td onClick={() => setToogleInfo(true)} className={styles.iconInfo} >
                                                    <Icons.Information />
                                                </td>
                                            </tr>
                                            <tr>

                                            </tr>
                                        </Fragment>
                                    ))
                                )}
                                <tr>

                                </tr>
                            </tbody>

                        </table>

                    </section>

                </main>
            </div>

        </main>
    )
}