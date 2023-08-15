import style from "./style.module.css";
import { BiFilterAlt } from "react-icons/bi";
import Loading from "../../../loading/Loading";
import { useState } from "react";
import CardFilter from "./FilterClaims/Filter";


function Table() {
    return (
        <table className={style.table} >
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Value</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    )
}
const { Filter } = CardFilter();

interface claimsProps {
    id: string,
    value: string,
    name: string
}


function Card() {
    const [toogleLoading, setToogleLoading] = useState<boolean>(false);
    const [toogleFilterClaims, setToogleFilterClaims] = useState<boolean>(true);
    const [dataClaims, setDataClaims] = useState<claimsProps[]>([])
    return (
        <div className={style.card} >
            <div className={toogleLoading ?
                style.cardLoading :
                style.cardLoading_close} >
                <Loading />
            </div>
            <div className={toogleFilterClaims ?
                style.filterClaims :
                style.filterClaims_close} >
                <Filter
                    changeToogle={setToogleFilterClaims}
                    toogle={toogleFilterClaims}
                />
            </div>
            <section className={style.title} >
                <h2>Novo usuário</h2>
            </section>
            <section className={style.body} >
                <div className={style.wrap_container_nome} >
                    <input required
                        autoComplete="off"
                        type="text"
                        id="txtNome" />
                    <label htmlFor="txtNome">Nome</label>
                </div>
                <div className={style.wrap_container_apelido} >
                    <input required
                        autoComplete="off"
                        type="text"
                        id="txtApelido" />
                    <label htmlFor="txtApelido">Apelido</label>
                </div>
                <div className={style.wrap_container_senha} >
                    <input required
                        autoComplete="off"
                        type="text"
                        id="txtSenha" />
                    <label htmlFor="txtSenha">Senha</label>
                </div>
                <div className={style.wrap_container_confirmacao_senha} >
                    <input required
                        autoComplete="off"
                        type="text"
                        id="txtConfirmacaoSenha" />
                    <label htmlFor="txtConfirmacaoSenha">Confirmação</label>
                </div>
                <div className={style.container_table_claims} >
                    <div className={style.wrap_container_claims} >
                        <Table />
                    </div>
                </div>
                <div className={style.container_button_filter} >
                    <button onClick={() => setToogleFilterClaims(true)} >
                        <BiFilterAlt />
                    </button>
                </div>

            </section>
            <section className={style.footer} >
                <div>
                    <button>
                        CADASTRAR
                    </button>
                </div>
                <div>
                    <button onClick={() => setToogleLoading(!toogleLoading)} >
                        CANCELAR
                    </button>
                </div>
            </section>

        </div>
    )

}

export default function CardAdd() {
    return {
        Card
    }
}