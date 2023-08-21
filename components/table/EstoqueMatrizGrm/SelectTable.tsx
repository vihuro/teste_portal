import ButtonUi from "../../UI/button/Button";
import style from "./style.module.css";
import { useState } from "react";
import TipoMaterial from "./TipoMaterial/TipoMaterial";
import LocalEstocagem from "./LocalEstocagem/LocalEstocagem";


export default function Table() {
    const { Button } = ButtonUi();
    const [optionTable, setOptionTable] = useState({
        tipoMaterial: true,
        localEstocagem: false
    })
    return (
        <main className={style.containerBody} >
            <header className={style.container_selectTable} >
                <div>
                    <Button
                        classUi="default"
                        color="blue"
                        text="Tipo de material"
                        onClick={() => setOptionTable({
                            tipoMaterial: true,
                            localEstocagem: false
                        })}
                    />
                </div>
                <div>
                    <Button
                        classUi="default"
                        color="blue"
                        text="Local de estocagem"
                        onClick={() => setOptionTable({
                            tipoMaterial: false,
                            localEstocagem: true
                        })}
                    />
                </div>
            </header>
            <section className={style.container_table} >
                {optionTable.localEstocagem && (
                    <LocalEstocagem />
                )}
                {optionTable.tipoMaterial && (
                    <TipoMaterial />
                )}

            </section>
        </main>
    )
}