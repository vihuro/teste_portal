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
import FilterClaims from "./filter/FilterClaim";

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
    const [toogleLoading, setToogleLoading] = useState<boolean>(false);
    const [toogleMessage, setToogleMessage] = useState<boolean>(false);
    const [dataMessage, setDataMessage] = useState({
        message: "CUIDADO",
        type: "WARNIG"
    })

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
        setToogleLoading(true)
        const claims = {
            claimId: claimId,
            userClaimsId: userClaimId,
            userRegisterId: userClaimId
        }
        await Api.put("claimsTypeForUser", claims)
            .then(res => setDataMessage({
                message: "Regra adicionada!",
                type: "SUCESS"
            }))
            .catch(err => {
                console.log(err)
                setDataMessage({
                    message: "ERRO NO SERVIDOR!",
                    type: "ERROR"
                })
            })
            .finally(() => {
                fechDataTable()
                setToogleLoading(false);
                setToogleMessage(true)
            })
    }


    return (
        <div className={style.cardFilter} >
            <div className={toogleMessage ?
                style.container_message :
                style.container_message_close} >
                <Message
                    stateMessage={toogleMessage}
                    action={setToogleMessage}
                    message={dataMessage.message}
                    type={dataMessage.type}
                />
            </div>
            <div className={toogleLoading ?
                style.container_loading :
                style.container_loading_close} >
                <Loading />
            </div>
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
                                    <tr key={index} >
                                        <td>{item.claimName}</td>
                                        <td>{item.claimValue}</td>
                                        <td>
                                            <BiAddToQueue onClick={() =>
                                                adicionarClaims(item.claimId)} />
                                        </td>
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
    const [senha, setSenha] = useState({
        senha: "",
        confirmacao: ""
    });
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
    const [statusUsuario, setStatusUsuario] = useState<boolean>(false);
    const [dataMessage, setDataMessage] = useState({
        message: "CUIDADO!",
        type: "WARNING"
    });
    useEffect(() => {
        setData(user)
        setStatusUsuario(user?.ativo)
    }, [user])


    async function SalvarAlteracao() {
        if (senha.senha === "" && statusUsuario === user.ativo) {
            setDataMessage({
                message: "Nenhuma mudança encontrada!",
                type: "WARNING"
            });
            setToogleMessage(true);
            return;
        }
        if (senha.senha !== senha.confirmacao) {
            setDataMessage({
                message: "Senha não correspondente!",
                type: "WARNING"
            })
            setToogleMessage(true);
            return;
        }
        const change = {
            userId: user.usuarioId,
            ativo: statusUsuario !== user.ativo ? statusUsuario : null,
            senha: senha.senha !== "" ? senha.senha : null,
            usuarioAlteracaoId: user.usuarioId
        }

        setToogleLoading(true)

        await Api.put("/login/changePasswordOrActive", change)
            .then(res => {
                setDataMessage({
                    message: "Mudanças realizadas com sucesso!",
                    type: "SUCESS"
                })
            })
            .catch(err => console.log(err))
            .finally(() => {
                setToogleLoading(false);
                setToogleMessage(true);
                fechDataUsers()
            })

    }


    return (
        data && (
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
                    <FilterClaims
                        userClaimId={data.usuarioId}
                        changeToogle={setToogleFilter}
                        claimsId={data.claims.map(item => item.claimId)}
                        fechDataTable={fechDataUsers}
                    />
                    {/* <CardFilter
                        changeToogle={setToogleFilter}
                        fechDataTable={fechDataUsers}
                        claimsId={data?.claims.map(item => item.claimId)}
                        userClaimId={data?.usuarioId}
                    /> */}
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
                                checked={statusUsuario}
                                onChange={() => setStatusUsuario(true)}
                            />
                            <Radio
                                color="red"
                                text="INATIVO"
                                id="rdbInativo"
                                name="radioStatus"
                                checked={!statusUsuario}
                                onChange={() => setStatusUsuario(false)}
                            />
                        </div>
                    </section>
                    <section className={style.firstRow} >
                        <Input
                            id="txtNomeUsuario"
                            text="Nome"
                            value={data.nome}
                            onChange={() => { }}
                        />
                    </section>
                    <section className={style.secondRow} >
                        <Input
                            id="txtApelidoUsuario"
                            text="Apelido"
                            value={data.apelido}
                            onChange={() => { }}
                        />
                    </section>
                    <section className={style.containerPassword} >
                        <Input
                            id="txtAlterarSenhaEdit"
                            text="Alterar Senha"
                            value={senha.senha}
                            onChange={(e) => setSenha({
                                ...senha,
                                senha: e.target.value
                            })}
                        />
                    </section>
                    <section className={style.containerConfirmPassword} >
                        <Input
                            id="txtConfirmarPassword"
                            text="Confirmar"
                            value={senha.confirmacao}
                            onChange={(e) => setSenha({
                                ...senha,
                                confirmacao: e.target.value
                            })}
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
                            onClick={() => SalvarAlteracao()}
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

    )
}

export default function CardEdit() {
    return {
        Card
    }
}