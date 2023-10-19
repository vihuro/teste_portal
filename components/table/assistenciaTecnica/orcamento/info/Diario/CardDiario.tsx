import styles from "./style.module.css";
import { Icons } from "../../../../../utils/IconDefault";
import ButtonUi from "../../../../../UI/button/Button";
import { useState } from "react";
import { Form as FormAdd } from "./Add/Card";

interface Props {
    changeToogle: Function
}

const fakeDiario = [
    {
        usuarioApontamento: "Vitor Hugo",
        informação: "No dia 19/10/2023 o carro quebrou, cheguei por volta das 11 da manhã, devido a esse problema",
        dataHoraApontamento: "19-10-2023 12:02",
        flag: "VERDE"
    },
    {
        usuarioApontamento: "Vitor Hugo",
        informação: "No dia 19/10/2023 o carro quebrou, cheguei por volta das 11 da manhã, devido a esse problema",
        dataHoraApontamento: "19-10-2023 12:02",
        flag: "AZUL"
    },
    {
        usuarioApontamento: "Vitor Hugo",
        informação: "No dia 19/10/2023 o carro quebrou, cheguei por volta das 11 da manhã, devido a esse problema",
        dataHoraApontamento: "19-10-2023 12:02",
        flag: "VERMELHA"
    },
    {
        usuarioApontamento: "Vitor Hugo",
        informação: "No dia 19/10/2023 o carro quebrou, cheguei por volta das 11 da manhã, devido a esse problema",
        dataHoraApontamento: "19-10-2023 12:02",
        flag: "LARANJA"
    },
    {
        usuarioApontamento: "Vitor Hugo",
        informação: "No dia 19/10/2023 o carro quebrou, cheguei por volta das 11 da manhã, devido a esse problema",
        dataHoraApontamento: "19-10-2023 12:02",
        flag: "ROXA"
    },
    {
        usuarioApontamento: "Vitor Hugo",
        informação: "No dia 19/10/2023 o carro quebrou, cheguei por volta das 11 da manhã, devido a esse problema",
        dataHoraApontamento: "19-10-2023 12:02",
        flag: "azul"
    },
    {
        usuarioApontamento: "Vitor Hugo",
        informação: "No dia 19/10/2023 o carro quebrou, cheguei por volta das 11 da manhã, devido a esse problema",
        dataHoraApontamento: "19-10-2023 12:02",
        flag: "azul"
    },
    {
        usuarioApontamento: "Vitor Hugo",
        informação: "No dia 19/10/2023 o carro quebrou, cheguei por volta das 11 da manhã, devido a esse problema",
        dataHoraApontamento: "19-10-2023 12:02",
        flag: "azul"
    },
    {
        usuarioApontamento: "Vitor Hugo",
        informação: "No dia 19/10/2023 o carro quebrou, cheguei por volta das 11 da manhã, devido a esse problema",
        dataHoraApontamento: "19-10-2023 12:02",
        flag: "azul"
    },
    {
        usuarioApontamento: "Vitor Hugo",
        informação: "No dia 19/10/2023 o carro quebrou, cheguei por volta das 11 da manhã, devido a esse problema",
        dataHoraApontamento: "19-10-2023 12:02",
        flag: "azul"
    },
    {
        usuarioApontamento: "Vitor Hugo",
        informação: "No dia 19/10/2023 o carro quebrou, cheguei por volta das 11 da manhã, devido a esse problema",
        dataHoraApontamento: "19-10-2023 12:02",
        flag: "azul"
    },
    {
        usuarioApontamento: "Vitor Hugo",
        informação: "No dia 19/10/2023 o carro quebrou, cheguei por volta das 11 da manhã, devido a esse problema",
        dataHoraApontamento: "19-10-2023 12:02",
        flag: "azul"
    },
    {
        usuarioApontamento: "Vitor Hugo",
        informação: "No dia 19/10/2023 o carro quebrou, cheguei por volta das 11 da manhã, devido a esse problema",
        dataHoraApontamento: "19-10-2023 12:02",
        flag: "azul"
    },
    {
        usuarioApontamento: "Vitor Hugo",
        informação: "No dia 19/10/2023 o carro quebrou, cheguei por volta das 11 da manhã, devido a esse problema",
        dataHoraApontamento: "19-10-2023 12:02",
        flag: "azul"
    },
    {
        usuarioApontamento: "Vitor Hugo",
        informação: "No dia 19/10/2023 o carro quebrou, cheguei por volta das 11 da manhã, devido a esse problema",
        dataHoraApontamento: "19-10-2023 12:02",
        flag: "azul"
    },
    {
        usuarioApontamento: "Vitor Hugo",
        informação: "No dia 19/10/2023 o carro quebrou, cheguei por volta das 11 da manhã, devido a esse problema",
        dataHoraApontamento: "19-10-2023 12:02",
        flag: "azul"
    },
    {
        usuarioApontamento: "Vitor Hugo",
        informação: "No dia 19/10/2023 o carro quebrou, cheguei por volta das 11 da manhã, devido a esse problema",
        dataHoraApontamento: "19-10-2023 12:02",
        flag: "azul"
    },
    {
        usuarioApontamento: "Vitor Hugo",
        informação: "No dia 19/10/2023 o carro quebrou, cheguei por volta das 11 da manhã, devido a esse problema",
        dataHoraApontamento: "19-10-2023 12:02",
        flag: "azul"
    },


]

interface StyleKey {
    [key: string]: ColorProps
}

interface ColorProps {
    backgroundColor: string,
    color: string
}
const listColor: StyleKey = {
    VERDE: {
        backgroundColor: "#28ed9473",
        color: "#025932"
    },
    AZUL: {
        backgroundColor: "#007cff57",
        color: "#1b1b93d4"
    },
    VERMELHA: {
        backgroundColor: "#ff00005e",
        color: "white"
    },
    LARANJA: {
        backgroundColor: "#ffa50066",
        color: "#935f00"
    },
    ROXA: {
        backgroundColor: "#0000ff73",
        color: "#1b1b93d4"
    }
}

function searchColor(text: string) {
    const color = listColor[text.toUpperCase()];

    return {
        background: color ? color.backgroundColor : "",
        color: color ? color.color : ""
    }
}


function Form({ changeToogle }: Props) {
    const { Button } = ButtonUi()
    const [toogleCardInsert, setToogleCardInsert] = useState<boolean>(false);

    return (
        <form className={styles.form} action="">
            <div className={toogleCardInsert ?
                styles.containerCardInsert :
                styles.containerCardInsert_close} >
                <FormAdd />
            </div>
            <header className={styles.header} >
                <h3>
                    DIÁRIO
                </h3>
                <span>
                    <Icons.BookOpen />
                </span>
            </header>
            <main className={styles.containerListDiario} >
                <ul className={styles.listDiario} >
                    {fakeDiario.map((item, index) => (
                        <li style={searchColor(item.flag)} >
                            {`${item.informação} - ${item.usuarioApontamento} - ${item.dataHoraApontamento}`}
                        </li>
                    ))}
                </ul>
            </main>
            <footer className={styles.footer} >
                <div>
                    <Button
                        classUi="glass"
                        color="red"
                        text="FECHAR"
                        type="button"
                        onClick={() => changeToogle(false)}
                    />
                </div>
                <div></div>
            </footer>
        </form>
    )
}


export { Form }