import style from "./style.module.css";
import { Icons } from "../../../../utils/IconDefault"
import InputUi from "../../../../UI/input/Input";

interface props {
    changeToogle: Function,
    dataProps: dataProps
}
interface dataProps {
    numeroOrcamento: number,
    descricaoServico: string,
    status: statusProps[],
    cliente: clienteProps,
    maquina: maquinaProps,
}
interface statusProps {
    dataHoraFim: Date
    dataHoraInicio: Date,
    status: string
}
interface clienteProps {
    cep: string,
    cidade: string,
    cnpj: string,
    contatoNomeCliente: string,
    contatoTelefoneCliente: string,
    codigoRadar: string,
    estado: string,
    nomeCliente: string,
    numeroEstabelecimento: string,
    regiao: string,
    rua: string
}
interface maquinaProps {
    maquinaId: string,
    codigoMaquina: string,
    descricaoMaquina: string,
    numeroSerie: string,
    pecas: pecasProps[]
}
interface pecasProps {
    pecaId: string,
    conserto: boolean,
    codigoPeca: string,
    descricaoPeca: string,
    enderecoImagem: string,
    preco: number,
    troca: boolean
}

export default function Info({ changeToogle, dataProps }: props) {

    const { Input } = InputUi();

    return (
        dataProps &&
        <main className={style.container} >
            <header onClick={() => changeToogle(false)} className={style.container_header} >
                <button onClick={() => changeToogle(false)} >
                    <Icons.ArrowLeft onClick={() => changeToogle(false)} />
                </button>
                <Input
                    id="txtNumeroOrcamentoInfo"
                    text="Nº ORÇAMENTO"
                    value={dataProps.numeroOrcamento}
                />
            </header>
            <main className={style.container_body} >
                <div className={style.wrapContainer_body} >
                    <div className={style.containerCodigoCliente} >
                        <Input
                            id="txtCodigoClienteInfo"
                            text="CÓDIGO CLIENTE"
                            value={dataProps.cliente.codigoRadar}
                        />
                    </div>
                    <div className={style.containerNomeCliente} >
                        <Input
                            id="txtNomeClienteInfo"
                            text="NOME CLIENTE"
                            value={dataProps.cliente.nomeCliente}
                        />
                    </div>
                    <div className={style.containerCNPJCliente} >
                        <Input
                            id="txtCnpjClienteInfo"
                            text="CNPJ"
                            value={dataProps.cliente.cnpj}
                        />
                    </div>
                    <div className={style.containerCEPCliente} >
                        <Input
                            id="txtCEPClienteInfo"
                            text="CEP"
                            value={dataProps.cliente.cep}
                        />
                    </div>
                    <div className={style.containerRuaCliente} >
                        <Input
                            id="txtRuaEnderecoInfo"
                            text="RUA"
                            value={dataProps.cliente.rua}
                        />
                    </div>
                    <div className={style.containerNumeroEstabelecimento}>
                        <Input
                            id="txtNumeroEstabelecimentoInfo"
                            text="Nº ESTELECIMENTO"
                            value={dataProps.cliente.numeroEstabelecimento}
                        />
                    </div>
                    <div className={style.containerCidadeCliente} >
                        <Input
                            id="txtCidadeClienteInfo"
                            text="CIDADE"
                            value={dataProps.cliente.cidade}
                        />
                    </div>
                    <div className={style.containerRegiaoCliente} >
                        <Input
                            id="txtRegiaoClienteInfo"
                            text="REGIÃO"
                            value={dataProps.cliente.regiao}
                        />
                    </div>
                    <div className={style.containerComplementoCliente} >
                        <Input
                            id="txtComplementoClienteInfo"
                            text="COMPLEMENTO"
                            value={dataProps.cliente.cidade}
                        />
                    </div>
                    <div className={style.containerNomeContatoCliente} >
                        <Input
                            id="txtNomeContatoCliente"
                            text="CONT. CLIENTE"
                            value={dataProps.cliente.contatoNomeCliente}
                        />
                    </div>
                    <div className={style.containerTelefoneContatoCliente} >
                        <Input
                            id="txtTelefoneContatoCliente"
                            text="TEL/ CLIENTE"
                            value={dataProps.cliente.contatoTelefoneCliente}

                        />
                    </div>
                    <div className={style.containerDescricaoServico} >
                        <Input
                            id="txtDescricaoServico"
                            text="DESCRIÇÃO SERVIÇO"
                            value={dataProps.descricaoServico}
                        />
                    </div>
                    <div className={style.containerMaquina} >
                        <div className={style.container_infoMaquina} >
                            <Input
                                id="txtMaquinaClienteInfo"
                                text="MÁQUINA"
                                value={dataProps.maquina.codigoMaquina}
                            />
                            <Input
                                id="txtDescricaoMaquinaCliente"
                                text="DESCRIÇÃO"
                                value={dataProps.maquina.descricaoMaquina}
                            />
                            <Input
                                id="txtNumeroSerieMaquinaCliente"
                                text="Nº SÉRIE"
                                value={dataProps.maquina.numeroSerie}
                            />
                        </div>
                        <div className={style.containerTablePecas} >
                            <div className={style.wrapContainerTable} >
                                <table className={style.table} >
                                    <thead>
                                        <tr>

                                            <th>CÓDIGO PEÇA</th>
                                            <th>DESCRIÇÃO </th>
                                            <th>QTD</th>
                                            <th>IMG.</th>
                                            <th>TROCA</th>
                                            <th>CONSERTO</th>
                                        </tr>
                                    </thead>
                                    <tbody className={style.container_tableBody} >
                                        {dataProps.maquina && (
                                            dataProps.maquina.pecas.map((item, index) => (
                                                <tr>
                                                    <td>{item.codigoPeca}</td>
                                                    <td>{item.descricaoPeca}</td>
                                                    <td>{4}</td>
                                                    <td>VISUALIZAR</td>
                                                    <td>
                                                        <input className={style.checked}
                                                            type="radio"
                                                            name={`rdb${item.codigoPeca}`}

                                                        />
                                                    </td>
                                                    <td>
                                                        <input className={style.checked}
                                                            type="radio"
                                                            name={`rdb${item.codigoPeca}`}

                                                        />
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className={style.containerStatus} >
                            <div className={style.wrapContainerStatus} >
                                <table className={style.table_status} >
                                    <thead>
                                        <tr>
                                            <th>SITUAÇÃO</th>
                                            <th>HORA INÍCIO</th>
                                            <th>HORA FIM</th>
                                            <th>AÇÃO</th>
                                        </tr>
                                    </thead>
                                    <tbody className={style.container_tableBody_status} >

                                        <tr>
                                            <td>ORÇAMENTO</td>
                                            <td>25/09/2023 16:00:00</td>
                                            <td>00/00/0000 00:00:00</td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>NEGOCIAÇÃO</td>
                                            <td>00/00/0000 00:00:00</td>
                                            <td>00/00/0000 00:00:00</td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>MANUTENÇÃO</td>
                                            <td>00/00/0000 00:00:00</td>
                                            <td>00/00/0000 00:00:00</td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>MANUTENÇÃO</td>
                                            <td>00/00/0000 00:00:00</td>
                                            <td>00/00/0000 00:00:00</td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                        </div>

                    </div>
                </div>


            </main>
        </main>
    )
}