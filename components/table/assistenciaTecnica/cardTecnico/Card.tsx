import { useState, useEffect } from "react";
import style from "./style.module.css";
import InputUi from "../../../UI/input/Input";

interface props {
    changeToogle: Function
}

export default function Card({ changeToogle }: props) {
    const { Input } = InputUi();
    return (
        <form className={style.card} action="">
            <section className={style.title} >
                <h3>
                    Atendimento Tecnico
                </h3>
            </section>
            <section className={style.body} >
                <div className={style.container_apontamento} >
                    <Input
                        id="txtAponamento"
                        text="Apontameto"
                    />
                </div>
                <div className={style.container_tempo} >
                    <Input
                        id="txtTempoEstimado"
                        text="Tempo estimado"
                    />
                </div>
                <div className={style.container_table} >
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    PEÇAS
                                </th>
                                <th>
                                    QTD.
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>FACA</td>
                                <td>2</td>
                            </tr>
                            <tr>
                                <td>BOTÃO</td>
                                <td>1</td>

                            </tr>
                            <tr>
                                <td>ROLAMENTO</td>
                                <td>1</td>
                            </tr>

                        </tbody>
                    </table>
                    <section className={style.footer} >
                        <div>
                            <button>
                                APONTAR
                            </button>
                        </div>
                        <div>
                            <button onClick={() => changeToogle(false)} >
                                FECHAR
                            </button>
                        </div>

                    </section>
                </div>

            </section>

        </form>
    )
}