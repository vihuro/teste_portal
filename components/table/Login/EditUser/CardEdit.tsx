import { use, useEffect, useState } from "react";
import ButtonUi from "../../../UI/button/Button";
import InputUi from "../../../UI/input/Input";
import style from "./style.module.css";
import RadioButton from "../../../UI/input/radio/RadioButton";
import { TbTrash } from "react-icons/tb";
import Api from "../../../../service/api/login/login";
import Loading from "../../../loading/Loading";
import Message from "../../../message/Message";
import TokenDrecriptor from "../../../../service/DecriptorToken";
import { parseCookies } from "nookies";
import { BiFilterAlt, BiAddToQueue } from "react-icons/bi";

interface cardProps {
    toogle: boolean,
    changeToogle: Function,
    user: userProps,
    fechDataUsers: Function
}
interface userProps {
    apelido: string,
    ativo: boolean,
    claims: claimsUserProps[],
    dataHoraAlteracao: Date,
    dataHoraCadastro: Date,
    nome: string,
    usuarioId: string
}
interface claimsUserProps {
    id: string,
    claimId: string,
    claimValue: string,
    claimName: string
}
interface tableClaimsProps {
    claims: claimsUserProps[],
    changeLoading: Function,
    changeToogleMessage: Function,
    changeDataMessage: Function,
    fechDataUsers: Function
}
interface cardFilterProps {
    changeToogle: Function,
    fechDataTable: Function,
    claimsId: string[],
    userClaimId: string
}


function TableClaims({ claims,
    changeToogleMessage,
    changeDataMessage,
    changeLoading,
    fechDataUsers }: tableClaimsProps) {
    const [toogleFilter, setToogleFilter] = useState<boolean>(false);
    const [data, setData] = useState<claimsUserProps[]>([]);
    const infoToken = TokenDrecriptor(parseCookies().ACCESS_TOKEN);
    useEffect(() => {
        setData(claims)

    }, [claims])

    function ExcluirClaim(claimId: string) {
        changeLoading(true);

        const dataUser = {
            claimId: claimId,
            userRegisterId: infoToken.idUser,
            userClaimId: infoToken.idUser
        }

        Api.delete("/claimsTypeForUser", { data: dataUser })
            .then(res => {
                changeDataMessage({
                    message: "Regra removida com sucesso!",
                    type: "SUCESS"
                })
            })
            .catch(err => {
                console.log(err);
                changeDataMessage({
                    message: "Erro no servidor!",
                    type: "ERROR"
                })
            })
            .finally(() => {
                changeToogleMessage(true)
                changeLoading(false)
                fechDataUsers();
            })
    }
    return (
        <table className={style.tableClaims} >
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Value</th>
                    <th>Del.</th>
                </tr>
            </thead>
            <tbody className={style.tableClaimsBody} >
                {data && (
                    data.map((item, index) => (
                        <tr key={index} >
                            <td>{item.claimName}</td>
                            <td>{item.claimValue}</td>
                            <td onClick={() => ExcluirClaim(item.id)} > <TbTrash /> </td>
                        </tr>
                    ))
                )}

            </tbody>
        </table>
    )
}
function CardFilter({
    changeToogle,
    fechDataTable,
    claimsId,
    userClaimId
}: cardFilterProps) {
    interface responseClaimsProps {
        totalClaims: number,
        dataClaims: claimsPorps[]
    }
    interface claimsPorps {
        claimId: string,
        claimName: string,
        claimValue: string
    }
    const [dataClaims, setDataClaims] = useState<responseClaimsProps>();

    useEffect(() => {
        FecthData();
    }, [])

    async function FecthData() {
        await Api.get("/claimsType")
            .then(res => setDataClaims(res.data))
            .catch(err => console.log(err))
    }
    const { Button } = ButtonUi();

    const filter = dataClaims?.dataClaims.filter(item => {
        if (!claimsId?.includes(item.claimId)) {
            return item;
        }
    });
    async function adicionarClaims(claimId: string) {
        const claims = {
            claimId: claimId,
            userClaimsId: userClaimId,
            userRegisterId: userClaimId
        }
        await Api.put("claimsTypeForUser", claims)
            .then(res => console.log(res))
            .catch(err => console.log(err))
            .finally(() => fechDataTable())

    }


    return (
        <div className={style.cardFilter} >
            <header className={style.headerCarFilter} >
                <h4>FILTRO</h4>
            </header>
            <section className={style.bodyCardFilter} >
                <div className={style.wrapTableCardFilter} >
                    <table className={style.tableCardFilter} >
                        <thead  >
                            <tr>
                                <td>Name</td>
                                <td>Value</td>
                                <td>Add.</td>
                            </tr>
                        </thead>
                        <tbody>
                            {filter && (
                                filter.map((item, index) => (
                                    <tr>
                                        <td>{item.claimName}</td>
                                        <td>{item.claimValue}</td>
                                        <td><BiAddToQueue onClick={() => adicionarClaims(item.claimId)} /></td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>

                </div>


            </section>
            <footer className={style.footerCardFilter} >
                <Button
                    classUi="defaut"
                    color="blue"
                    text="Fechar"
                    type="button"
                    onClick={() => changeToogle(false)}
                />
            </footer>
        </div>
    )
}

function Card({ toogle, changeToogle, user, fechDataUsers }: cardProps) {

    const { Button } = ButtonUi();
    const { Input } = InputUi();
    const { Radio } = RadioButton();
    const [senha, setSenha] = useState<string>("");
    const [data, setData] = useState<userProps>({
        apelido: "",
        ativo: true,
        claims: [],
        dataHoraAlteracao: new Date(),
        dataHoraCadastro: new Date(),
        nome: "",
        usuarioId: ""
    });
    const [toogleLoading, setToogleLoading] = useState<boolean>(false);
    const [toogleMessage, setToogleMessage] = useState<boolean>(false);
    const [toogleFilter, setToogleFilter] = useState<boolean>(false);
    const [dataMessage, setDataMessage] = useState({
        message: "CUIDADO!",
        type: "WARNING"
    });
    useEffect(() => {
        setData(user)
    }, [user])


    return (
        <form className={style.card} >
            <div className={toogleLoading ?
                style.container_loading :
                style.container_loading_close} >
                <Loading />

            </div>
            <div className={toogleMessage ?
                style.container_message :
                style.container_message_close}>
                <Message
                    action={setToogleMessage}
                    stateMessage={toogleMessage}
                    message={dataMessage.message}
                    type={dataMessage.type}
                />
            </div>
            <div className={toogleFilter ?
                style.container_filter :
                style.container_filter_close} >
                <CardFilter
                    changeToogle={setToogleFilter}
                    fechDataTable={fechDataUsers}
                    claimsId={data?.claims.map(item => item.claimId)}
                    userClaimId={data?.usuarioId}
                />
            </div>
            <header className={style.header} >
                <h3>Editar usuário</h3>
            </header>
            <main className={style.body} >
                <section className={style.container_radio} >
                    <div className={style.wrapContainer_radio} >
                        <label className={style.containerRadioTitle} >Status</label>
                        <Radio
                            color="green"
                            text="ATIVO"
                            id="rdbAtivo"
                            name="radioStatus"
                        />
                        <Radio
                            color="red"
                            text="INATIVO"
                            id="rdbInativo"
                            name="radioStatus"
                        />
                    </div>
                </section>
                <section className={style.firstRow} >
                    <Input
                        id="txtNomeUsuario"
                        text="Nome"
                        value={data?.nome}
                        onChange={() => { }}
                    />
                </section>
                <section className={style.secondRow} >
                    <Input
                        id="txtApelidoUsuario"
                        text="Apelido"
                        value={data?.apelido}
                        onChange={() => { }}
                    />
                </section>
                <section className={style.containerPassword} >
                    <Input
                        id="txtAlterarSenha"
                        text="Alterar Senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                </section>
                <section className={style.containerConfirmPassword} >
                    <Input
                        id="txtConfirmarPassword"
                        text="Confirmar"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                </section>
                <section className={style.containerTableClaims} >
                    <div className={style.wrapContainerTableClaims} >
                        <TableClaims
                            changeLoading={setToogleLoading}
                            changeToogleMessage={setToogleMessage}
                            claims={data?.claims}
                            changeDataMessage={setDataMessage}
                            fechDataUsers={fechDataUsers}
                        />
                    </div>
                </section>
                <section className={style.container_buttonFilter} >
                    <Button
                        classUi="background"
                        color="blue"
                        text=""
                        type="button"
                        icon={BiFilterAlt}
                        onClick={() => setToogleFilter(true)}
                    />

                </section>
            </main>
            <footer className={style.footer} >
                <div className={style.container_cadastrar} >
                    <Button
                        color="green"
                        classUi="glass"
                        text="Salvar"
                        type="button"
                        onClick={() => setToogleMessage(true)}
                    />
                </div>
                <div className={style.container_fechar} >
                    <Button
                        color="red"
                        classUi="glass"
                        text="Fechar"
                        type="button"
                        onClick={() => changeToogle(false)}
                    />
                </div>

            </footer>
        </form>
    )
}

export default function CardEdit() {
    return {
        Card
    }
}