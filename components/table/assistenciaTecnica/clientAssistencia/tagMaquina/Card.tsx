import { useState } from "react";
import style from "./style.module.css";

interface props {
    maquina: maquinaProps[],
    abrirOrdemService: Function
}

interface maquinaProps {
    tipoMaquina: string,
    numeroSerie: string,
    status: string
}
interface Color {
    background: string,
    color: string
}

export default function Card({ maquina, abrirOrdemService }: props) {

    const color: Record<string, Color> = {

        "Liberada": {

            background: "rgb(69, 236, 119)",
            color: "rgb(0, 70, 3)"
        },
        "Aguardando Orçamento": {
            background: "rgb(227 12 12)",
            color: "rgb(95 1 1)"

        },
        "Aguardando Aprovação": {
            background: "#57067f",
            color: "white"

        },
        "Em Manutenção": {

            background: "rgb(0, 95, 0)",
            color: "white"
        },
        "Abrir Ordem de Serviço": {
            background: "#0899e1",
            color: "white"
        },
        "Pesquisar Ordem": {
            background: "#cd05b3",
            color: "white"
        }
    }

    function GetColor(text: string) {
        const getStyle = color[text];

        return {
            background: getStyle ? getStyle.background : "black",
            color: getStyle ? getStyle.color : "white"
        }

    }

    const [numeroSerie, setNumeroSerie] = useState<string>("");
    const [tipo, setTipo] = useState<string>("");

    const filter = maquina.filter(item =>
        (
            item.numeroSerie.toLocaleUpperCase().startsWith(numeroSerie.toLocaleUpperCase()) &&
            item.tipoMaquina.toLocaleUpperCase().startsWith(tipo.toLocaleUpperCase())
        )
        
    )

    return (
        <section className={style.container} onClick={e => e.stopPropagation()} >
            <section className={style.container_inputFilter} >
                <div className={style.container_inputNumeroSerie}>
                    <input type="text"
                        value={numeroSerie}
                        onChange={(e) => setNumeroSerie(e.target.value)}
                    />
                    <label htmlFor="">Nº Série</label>

                </div>
                <div className={style.container_inputTipoMaquina}>
                    <input type="text"
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value)}
                    />
                    <label htmlFor="">Tipo</label>
                </div>
            </section>
            <section className={style.container_table} >
                {maquina && maquina.length > 0 && (
                    <table className={style.table} >
                        <tbody>
                            {filter.map((item, index) => (
                                <tr key={index} >
                                    <td>
                                        {item.numeroSerie}
                                    </td>
                                    <td>
                                        {item.tipoMaquina}
                                    </td>
                                    <td>
                                        <p className={style.status} style={GetColor(item.status)}>
                                            {item.status}
                                        </p>
                                    </td>
                                    <td>
                                        {item.status === "Liberada" ?
                                            <p className={style.buttonAtalho} style={GetColor("Abrir Ordem de Serviço")}>
                                                Abrir Ordem de Serviço
                                            </p>
                                            :
                                            <p className={style.buttonAtalho} style={GetColor("Pesquisar Ordem")}>
                                                Pesquisar Ordem
                                            </p>
                                        }

                                    </td>

                                </tr>
                            ))}
                            {/* {maquina.map((item, index) => (
                                <tr key={index} >
                                    <td>
                                        {item.numeroSerie}
                                    </td>
                                    <td>
                                        {item.tipoMaquina}
                                    </td>
                                    <td>
                                        <p style={GetColor("Aguardando Orçamento")}>
                                            Aguardando Orçamento
                                        </p>
                                    </td>
                                    <td>
                                        <p style={GetColor("Pesquisar Ordem")}>
                                            Pesquisar Ordem
                                        </p>
                                    </td>

                                </tr>
                            ))}
                            {maquina.map((item, index) => (
                                <tr key={index} >
                                    <td>
                                        {item.numeroSerie}
                                    </td>
                                    <td>
                                        {item.tipoMaquina}
                                    </td>
                                    <td>
                                        <p style={GetColor("Aguardando aprovação")}>
                                            Aguardando aprovação
                                        </p>

                                    </td>
                                    <td>
                                        <p style={GetColor("Pesquisar Ordem")}>
                                            Pesquisar Ordem
                                        </p>
                                    </td>

                                </tr>
                            ))}
                            {maquina.map((item, index) => (
                                <tr key={index} >
                                    <td>
                                        {item.numeroSerie}
                                    </td>
                                    <td>
                                        {item.tipoMaquina}
                                    </td>
                                    <td>
                                        <p style={GetColor("Aguardando aprovação")}>
                                            Aguardando aprovação
                                        </p>

                                    </td>
                                    <td>
                                    <p style={GetColor("Pesquisar Ordem")}>
                                            Pesquisar Ordem
                                        </p>
                                    </td>


                                </tr>
                            ))}
                            {maquina.map((item, index) => (
                                <tr key={index} >
                                    <td>
                                        {item.numeroSerie}
                                    </td>
                                    <td>
                                        {item.tipoMaquina}
                                    </td>
                                    <td>
                                        <p style={GetColor("Aguardando aprovação")}>
                                            Aguardando aprovação
                                        </p>

                                    </td>
                                    <td>
                                        <p style={GetColor("Pesquisar Ordem")}>
                                            Pesquisar Ordem
                                        </p>
                                    </td>

                                </tr>
                            ))} */}
                        </tbody>
                    </table>
                )}
            </section>

        </section>
    )
}