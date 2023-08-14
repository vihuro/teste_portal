import style from "./style.module.css";
import {BiFilterAlt} from "react-icons/bi";


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
                <tr>
                    <td>ESTOQUE</td>
                    <td>ADMIN</td>
                </tr>
                <tr>
                    <td>ESTOQUE</td>
                    <td>ADMIN</td>
                </tr>
                <tr>
                    <td>ESTOQUE</td>
                    <td>ADMIN</td>
                </tr>
                <tr>
                    <td>ESTOQUE</td>
                    <td>ADMIN</td>
                </tr>
                <tr>
                    <td>ESTOQUE</td>
                    <td>ADMIN</td>
                </tr>
                <tr>
                    <td>ESTOQUE</td>
                    <td>ADMIN</td>
                </tr>
                <tr>
                    <td>ESTOQUE</td>
                    <td>ADMIN</td>
                </tr>
                <tr>
                    <td>ESTOQUE</td>
                    <td>ADMIN</td>
                </tr>
                <tr>
                    <td>ESTOQUE</td>
                    <td>ADMIN</td>
                </tr>
                <tr>
                    <td>ESTOQUE</td>
                    <td>ADMIN</td>
                </tr>


            </tbody>
        </table>
    )
}

function Card() {
    return (
        <div className={style.card} >
            <section className={style.title} >
                <h2>Novo usuário</h2>
            </section>
            <section className={style.body} >
                <div className={style.wrap_container_nome} >
                    <input required type="text" id="txtNome" />
                    <label htmlFor="txtNome">Nome</label>
                </div>
                <div className={style.wrap_container_apelido} >
                    <input required type="text" id="txtApelido" />
                    <label htmlFor="txtApelido">Apelido</label>
                </div>
                <div className={style.wrap_container_senha} >
                    <input required type="text" id="txtSenha" />
                    <label htmlFor="txtSenha">Senha</label>
                </div>
                <div className={style.wrap_container_confirmacao_senha} >
                    <input required type="text" id="txtConfirmacaoSenha" />
                    <label htmlFor="txtConfirmacaoSenha">Confirmação</label>
                </div>
                <div className={style.container_table_claims} >
                    <div className={style.wrap_container_claims} >
                        <Table />
                    </div>
                </div>
                <div className={style.container_button_filter} >
                    <button>
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
                    <button>
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