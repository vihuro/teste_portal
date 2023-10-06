import { Fragment, useEffect, useRef, useState } from "react";
import styles from "./style.module.css";
import { Manutencao } from "./fakeManutencao";
import { Icons } from "../../utils/IconDefault";
import Add from "./Add/addOrdemServico";
import Info from "./info/Info";
import { TableUi } from "../../UI/table/TableUi";

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
    const [data, setData] = useState<dataProps[]>([])
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

    const columnLabel = [
        {
            label: "+"
        },
        {
            label: "Nº ORDEM SERVIÇO"
        },
        {
            label: "EXECUÇÃO"
        },
        {
            label: "TIPO/SERV."
        },
        {
            label: "CATEGORIA"
        },
        {
            label: "DATA/IDEAL"
        },
        {
            label: "PRIORIDADE"
        },
        {
            label: "STATUS"
        },
        {
            label: "INFO"
        }
    ]
    function searchColorPrioridade(text: string) {
        const colors = PRIORIDADE[text]

        return {
            background: colors ? colors.background : "",
            color: colors ? colors.color : ""
        }
    }
    function searchColorStatus(text: string) {
        const colors = STATUS[text];


        return {
            background: colors ? colors.background : "",
            color: colors ? colors.color : ""
        };
    }

    const rowData = data.map((item, index) => ({
        id: index,
        data: {
            "col0": {
                label: "",
                icon: Icons.ArrowFromTop,
                onClick: () => console.log("hahaha")
            },
            "col1": {
                label: item.numeroOrdemServico.toString()
            },
            "col2": {
                label: item.execucao
            },
            "col3": {
                label: item.tipoServico
            },
            "col4": {
                label: item.categoriaServico
            },
            "col5": {
                label: item.dataIdeal
            },

            "col6": {
                label: item.prioridade,
                tag: searchColorPrioridade(item.prioridade)
            },
            "col7": {
                label: item.statusOrdemServico,
                tag: searchColorStatus(item.statusOrdemServico)
            },
            "col8": {
                label: "",
                icon: Icons.Information,
                onClick: () => setToogleInfo(true)
            }
        }
    }))


    const [toogleAdd, setToogleAdd] = useState<boolean>(false);
    const [toogleInfo, setToogleInfo] = useState<boolean>(false);


    useEffect(() => {
        setData(Manutencao);
    }, [])

    interface StyleData {
        background: string;
        color: string;
    }


    // Interface para representar o objeto de status
    interface StyleKey {
        [key: string]: StyleData;
    }



    return (
        <main className={styles.container} >
            <div className={styles.wrapContainer} >

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
                            <TableUi
                                col={columnLabel}
                                row={rowData}
                                nameTable="tableManutencao"
                            />
                        </section>

                    </main>
                </div>
            </div>

        </main>
    )
}