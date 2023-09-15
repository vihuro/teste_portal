import { BiFilterAlt, BiSearchAlt2 } from "react-icons/bi";
import InputUi from "../../../../UI/input/Input";
import style from "./style.module.css";
import ButtonUi from "../../../../UI/button/Button";
import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import Api from "../../../../../service/api/assistenciaTecnica/Assistencia";
import FilterMaquinaDisponivel from "../filterMaquinaDisponivel/Card";

interface props {
    changeToogle: Function,
    dataProps: dataProps
}
interface dataProps {
    idCliente: string,
    cnpj: string,
    codigoRadar: string,
    contatoTelefone: string,
    contatoNome: string,
    endereco: string,
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


export default function Card({ changeToogle, dataProps }: props) {
    const { Input } = InputUi();
    const { Button } = ButtonUi();

    const [data, setData] = useState<dataProps>();
    const [listMaquina, setListMaquina] = useState<maquinaClienteProps[]>([])


    useEffect(() => {
        setData(dataProps)
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
            cnpj: data?.cnpj,
            cep: data?.cep,
            estado: data?.estado,
            cidade: data?.cidade,
            regiao: data?.regiao,
            rua: data?.rua,
            numeroEstabelecimento: data?.numeroEstabelecimento,
            userId: "2cb75138-9232-454e-8784-d777e50f7547",
            complemento: data?.complemento,
            nomeContatoCliente: data?.contatoNome,
            contatoTelefone: data?.contatoTelefone,
            maquinaCliente: listMaquina?.map(item => ({
                maquinaId: item.maquinaId
            }))

        }
        Api.put("/cliente", obj)
            .then(res => console.log(res))
            .catch(err => console.log(err));
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

    function RemoveMaquina(idMaquina: string) {
        if (data) {
            const list = data.maquinaCliente.filter(item => item.maquinaId !== idMaquina);

            setListMaquina(list);
        }


    }


    return (
        data && (
            <form className={style.card} action="">
                <div className={toogleFilterMaquina ?
                    style.container_filterMaquina :
                    style.container_filterMaquina_close} >
                    <CardFilterMaquinaDisponivel />
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
                            onChange={() => { }}
                        />
                    </div>
                    <div className={style.container_cnpj}>
                        <Input
                            id="txtCnpjChange"
                            text="CNPJ"
                            autoComplete="off"
                            value={data.cnpj}
                            onChange={() => { }}
                        />
                    </div>
                    <div className={style.container_nomeCliente} >
                        <Input
                            id="txtNomeClienteChange"
                            text="NOME CLIENTE"
                            autoComplete="off"
                            value={data.nome}
                            onChange={() => { }}
                        />

                    </div>
                    <div className={style.container_cep} >
                        <Input
                            id="txtCepChange"
                            text="CEP"
                            autoComplete="off"
                            iconRight={{
                                action: () => console.log("aqui"),
                                icon: BiSearchAlt2
                            }}
                            value={data.cep}
                            onChange={() => { }}
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
                            onChange={() => { }}
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
                            onChange={() => { }}
                        />

                    </div>
                    <div className={style.container_nomeContato} >
                        <Input
                            id="txtContatoNomeChange"
                            text="NOME/CONT."
                            autoComplete="off"
                            value={data.contatoNome}
                            onChange={() => { }}
                        />

                    </div>
                    <div className={style.container_telefoneContato} >
                        <Input
                            id="txtTelefoneContatoChange"
                            text="TEL/CONT."
                            autoComplete="off"
                            maxLength={11}
                            value={data.contatoTelefone}
                            onChange={() => { }}
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
                            onClick={() => { Altera() }}
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