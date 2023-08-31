import style from "./style.module.css";
import InputUi from "../../../../UI/input/Input";

interface props {
    changeToogle: Function,
    refreshTable: Function

}

export default function Card({ changeToogle }: props) {
    const { Input } = InputUi();
    return (
        <form className={style.card} action="">
            <section className={style.title} >
                <h3>
                    Nova máquina
                </h3>

            </section>
            <section className={style.body} >
                <div className={style.container_input} >
                    <Input
                        id="txtNovaMaquina"
                        text="Nova máquina"
                    />
                </div>
                <div className={style.container_table} >
                    <div className={style.wrapContainer_table} >
                        <table className={style.table} >
                            <thead>
                                <tr>
                                    <th>
                                        PEÇA
                                    </th>
                                    <th>
                                        IMG.
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Rolamento</td>
                                    <td>

                                        <img style={{
                                            width:50,
                                            height:50,
                                            borderRadius:"50%"
                                        }} src="http://192.168.2.24:8081/api/v1/assistencia-tecnica/pecas/image/%5C%5C192.168.2.24%5Capi_assistencia_tecnica%5CImagens%5Crolamento.jpg" alt="" />
                                        {}
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                    </div>

                </div>
            </section>
            <section className={style.button} >
                <button type="button" onClick={() => changeToogle(false)} >
                    Fechar
                </button>

            </section>

        </form>
    )
}