import { BiFilterAlt, BiSearchAlt2 } from "react-icons/bi";
import InputUi from "../../../../UI/input/Input";
import style from "./style.module.css";
import ButtonUi from "../../../../UI/button/Button";
import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import Api from "../../../../../service/api/assistenciaTecnica/Assistencia";
import FilterMaquinaDisponivel from "../filterMaquinaDisponivel/Card";
import Loading from "../../../../loading/Loading";
import Message from "../../../../message/Message";

interface props {
    changeToogle: Function,
    refreshTable: Function,
    dataProps: dataProps
}
interface dataProps {
    idCliente: string,
    cnpj: string,
    codigoRadar: string,
    contatoTelefone: string,
    contatoNome: string,
    nome: string,
    cadastro: userProps,
    alteracao: userProps,
    maquinaCliente: maquinaClienteProps[],
    cep: string,
    estado: string,
    cidade: string,
    regiao: string,
    rua: string,
    complemento: string,
    numeroEstabelecimento: string,
}
interface userProps {
    usuarioId: string,
    nome: string,
    apelido: string,
    dataHora: Date
}
interface maquinaClienteProps {
    maquinaId: string,
    codigoMaquina: string,
    numeroSerie: string,
    tipoMaquina: string,
    status: string
}


export default function Card({ changeToogle, dataProps, refreshTable }: props) {
    const { Input } = InputUi();
    const { Button } = ButtonUi();

    const [data, setData] = useState<dataProps>();
    const [listMaquina, setListMaquina] = useState<maquinaClienteProps[]>([]);
    const [toogleLoading, setToogleLoading] = useState<boolean>(false);
    const [toogleMessage, setToogleMessage] = useState<boolean>(false);
    const [dataMessage, setDataMessage] = useState({
        message: "",
        type: "WARNING"
    });
    const [valueCnpj, setValueCnpj] = useState<string>("");
    const [textCep, setTextCep] = useState<string>("");


    useEffect(() => {
        setData(dataProps)

        const cnpj = `${dataProps.cnpj.slice(0, 2)}
                        .${dataProps.cnpj.slice(2, 5)}
                        .${dataProps.cnpj.slice(5, 8)}
                        /${dataProps.cnpj.slice(8, 12)}
                        -${dataProps.cnpj.slice(12)}`
        handleCnpj(cnpj);
        setTextCep(dataProps.cep)

        setListMaquina(dataProps.maquinaCliente.map(item => ({
            codigoMaquina: item.codigoMaquina,
            maquinaId: item.maquinaId,
            numeroSerie: item.numeroSerie,
            status: item.status,
            tipoMaquina: item.tipoMaquina
        })))


    }, [dataProps])

    async function Altera() {
        const obj = {
            idCliente: data?.idCliente,
            nome: data?.nome,
            codigoRadar: data?.codigoRadar,
            cnpj: valueCnpj.replaceAll(".", "").replace("/", "").replace("-", ""), cep: data?.cep,
            estado: data?.estado,
            cidade: data?.cidade,
            regiao: data?.regiao,
            rua: data?.rua,
            numeroEstabelecimento: data?.numeroEstabelecimento,
            userId: "96afb069-c572-4302-b631-8b6b16c825e7",
            complemento: data?.complemento,
            nomeContatoCliente: data?.contatoNome,
            contatoTelefone: data?.contatoTelefone,
            maquinaCliente: listMaquina?.map(item => ({
                maquinaId: item.maquinaId
            }))

        }
        Api.put("/cliente", obj)
            .then(res => {
                setDataMessage({
                    message: "Alteração realizada!",
                    type: "SUCESS"
                })
                refreshTable()
            })
            .catch(err => {
                if (err.response && (err.response.data)) {
                    setDataMessage({
                        message: err.response.data,
                        type: "WARNING"
                    })
                }
            })
            .finally(() => {
                setToogleMessage(true);
                setToogleLoading(false)
            });
    }
    const [toogleFilterMaquina, setToogleFilterMaquina] = useState<boolean>(false);

    const { CardFilterMaquinaDisponivel,
        listMaquina: listMaquinaCard,
        setListMaquina: changeListMaquinaCard,
        FetchData: FetchDataMaquina } = FilterMaquinaDisponivel({
            changeToogle: setToogleFilterMaquina
        });

    useEffect(() => {

        if (data) {

            const list = listMaquinaCard.map(item => ({
                maquinaId: item.id,
                codigoMaquina: item.codigo,
                numeroSerie: item.numeroSerie,
                tipoMaquina: item.tipoMaquina,
                status: "PENDENTE"
            }));

            setListMaquina([...listMaquina, ...list]);
        }
    }, [listMaquinaCard])

    async function SearchCEP() {
        const cep = parseInt(textCep);

        await Api.get(`/cep/${textCep}`)
            .then(res => {
                if (data) {
                    setData({
                        ...data,
                        cidade: res.data.cidade,
                        estado: res.data.estado,
                        rua: res.data.rua,
                        cep: res.data.cep,
                        regiao: res.data.regiao
                    })
                }

            })
            .catch(err => {
                if (data && err.response && (err.response.data)) {
                    setDataMessage({
                        message: err.response.data,
                        type: "WARNING"
                    })
                    setToogleMessage(true);
                    setData({
                        ...data,
                        cidade: "",
                        estado: "",
                        rua: "",
                        cep: "",
                        regiao: ""
                    })
                }
            })
            .finally(() => {
                setToogleLoading(false)
            })
    }

    function RemoveMaquina(idMaquina: string) {
        if (data) {
            const list = listMaquina.filter(item => item.maquinaId !== idMaquina);

            setListMaquina(list);
        }
    }
    function handleCnpj(text: string) {
        let cnpj = text.replace(/[^\d./-]/g, '');
        switch (cnpj.length) {
            case 2:
            case 6:
                cnpj += '.';
                break;
            case 10:
                cnpj += '/';
                break;
            case 15:
                cnpj += '-';
                break;
        }
        setValueCnpj(cnpj)

    }
    const handleChangeCEP = (text: string) => {
        const cep = text.replace(/[^\d./-]/g, '');

        setTextCep(cep);
    }


    return (
        data && (
            <form className={style.card} action="">
                <div className={toogleFilterMaquina ?
                    style.container_filterMaquina :
                    style.container_filterMaquina_close} >
                    <CardFilterMaquinaDisponivel />
                </div>
                <div className={toogleLoading ?
                    style.container_loading :
                    style.container_loading_close} >
                    <Loading />
                </div>
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
                <header className={style.container_title} >
                    <h3>CLIENTE</h3>
                </header>
                <main className={style.container_body} >
                    <div className={style.container_codigoRadar} >
                        <Input
                            id="txtCodigoRadarChange"
                            text="CÓDIGO RADAR"
                            autoComplete="off"
                            value={data.codigoRadar}
                            onChange={(e) => setData({
                                ...data,
                                codigoRadar: e.target.value
                            })}
                        />
                    </div>
                    <div className={style.container_cnpj}>
                        <Input
                            id="txtCnpjChange"
                            text="CNPJ"
                            autoComplete="off"
                            value={valueCnpj}
                            onChange={(e) =>
                                handleCnpj(e.target.value)}
                        />
                    </div>
                    <div className={style.container_nomeCliente} >
                        <Input
                            id="txtNomeClienteChange"
                            text="NOME CLIENTE"
                            autoComplete="off"
                            value={data.nome}
                            onChange={(e) => setData({
                                ...data,
                                nome: e.target.value
                            })}
                        />

                    </div>
                    <div className={style.container_cep} >
                        <Input
                            id="txtCepChange"
                            text="CEP"
                            autoComplete="off"
                            iconRight={{
                                action: () => {
                                    setToogleLoading(true)
                                    SearchCEP()
                                },
                                icon: BiSearchAlt2
                            }}
                            maxLength={150}
                            value={textCep}
                            onChange={(e) => handleChangeCEP(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    setToogleLoading(true)
                                    SearchCEP()
                                }
                            }}
                        />
                    </div>
                    <div className={style.container_rua} >
                        <Input
                            id="txtRuaChange"
                            text="RUA"
                            blocked
                            autoComplete="off"
                            value={data.rua}
                            onChange={() => { }}
                        />
                    </div>
                    <div className={style.container_numeroEstabelecimento}>
                        <Input
                            id="txtNumeroEstabelecimentoChange"
                            text="Nº"
                            autoComplete="off"
                            value={data.numeroEstabelecimento}
                            onChange={(e) => setData({
                                ...data,
                                numeroEstabelecimento: e.target.value
                            })}
                        />
                    </div>
                    <div className={style.container_cidade} >
                        <Input
                            id="txtCidadeChange"
                            text="CIDADE"
                            autoComplete="off"
                            blocked
                            value={data.cidade}
                            onChange={() => { }}
                        />
                    </div>
                    <div className={style.container_bairro} >
                        <Input
                            id="txtBairroChange"
                            text="BAIRRO"
                            autoComplete="off"
                            blocked
                            value={data.regiao}
                            onChange={() => { }}
                        />

                    </div>
                    <div className={style.container_estado} >
                        <Input
                            id="txtEstadoChange"
                            text="EST."
                            autoComplete="off"
                            blocked
                            value={data.estado}
                            onChange={() => { }}
                        />

                    </div>
                    <div className={style.container_complemento} >
                        <Input
                            id="txtComplementoChange"
                            text="COMPLEMENTO"
                            autoComplete="off"
                            value={data.complemento}
                            onChange={(e) => setData({
                                ...data,
                                complemento: e.target.value
                            })}
                        />

                    </div>
                    <div className={style.container_nomeContato} >
                        <Input
                            id="txtContatoNomeChange"
                            text="NOME/CONT."
                            autoComplete="off"
                            value={data.contatoNome}
                            onChange={(e) => setData({
                                ...data,
                                contatoNome: e.target.value
                            })}
                        />

                    </div>
                    <div className={style.container_telefoneContato} >
                        <Input
                            id="txtTelefoneContatoChange"
                            text="TEL/CONT."
                            autoComplete="off"
                            maxLength={11}
                            value={data.contatoTelefone}
                            onChange={(e) => setData({
                                ...data,
                                contatoTelefone: e.target.value
                            })}
                        />
                    </div>
                    <div className={style.container_filterMaquinas} >
                        <section className={style.container_table} >
                            <table className={style.table} >
                                <thead>
                                    <tr>
                                        <th>
                                            CÓD/MAQ
                                        </th>
                                        <th>
                                            DESCRIÇÃO
                                        </th>
                                        <th>
                                            Nº SÉRIE
                                        </th>
                                        <th>
                                            STATUS
                                        </th>
                                        <th>
                                            AÇÃO
                                        </th>
                                        <th>
                                            DEL.
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className={style.table_body}>
                                    {listMaquina && (
                                        listMaquina.map((item, index) => (
                                            <tr key={index}>
                                                <td>
                                                    {item.codigoMaquina}
                                                </td>
                                                <td>
                                                    {item.tipoMaquina}
                                                </td>
                                                <td>
                                                    {item.numeroSerie}
                                                </td>
                                                <td>
                                                    {item.status}
                                                </td>
                                                <td>
                                                    {"SS"}
                                                </td>
                                                <td onClick={() => RemoveMaquina(item.maquinaId)} >
                                                    <AiOutlineDelete />
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </section>
                        <section>
                            <Button
                                classUi="default"
                                color="blue"
                                icon={BiFilterAlt}
                                type="button"
                                onClick={() => {
                                    FetchDataMaquina()
                                    setToogleFilterMaquina(true)
                                }}
                            />
                        </section>

                    </div>
                </main>
                <footer className={style.footer} >
                    <div className={style.button_cadastrar} >
                        <Button
                            classUi="glass"
                            color="green"
                            text="ALTERAR"
                            type="button"
                            onClick={() => {
                                setToogleLoading(true)
                                Altera()
                            }}
                        />
                    </div>
                    <div className={style.button_fechar} >
                        <Button
                            classUi="glass"
                            color="red"
                            text="FECHAR"
                            type="button"
                            onClick={() => changeToogle()}
                        />
                    </div>

                </footer>
            </form>
        )

    )
}