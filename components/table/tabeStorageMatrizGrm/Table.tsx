import { Fragment, useEffect, useState } from "react";
import style from "./style.module.css";
import Api from "../../../service/api/matriz/estoque-grm";
import { TbEdit } from "react-icons/tb";
import { CiMenuKebab } from "react-icons/ci";
import { BiArrowFromTop } from "react-icons/bi";
import CardAddComponent from "./cardAdd/Card";
import CardChangeComponent from "./cardChange/Card";
import FilterCodigo from "./filterCodigo/Card";
import FilterLocal from "./filterLocal/Card";
import FitlerTipo from "./filterTipo/Card";
import CardSubstitutoComponent from "./cardSubstituto/Card";
import { DateTimeStringFormat } from "../../utils/DateTimeString";
import SearchInfoOfUserOnToken from "../../utils/SearchInfoOfUserOnToken";


interface ItemsProps {
    id: number,
    codigo: string,
    descricao: string,
    quantidade: number,
    preço: number,
    dataFabricao: Date,
    substitutos: [{
        codigo: string,
        descricao: string,
        localEstocagem: string,
        produtoId: string,
        quantidade: number,
        substitutoId: string,
        tipoMaterial: string,
        unidade: string
    }],
    clienteUltimaCompra1: string,
    codigoClienteUltimaCompra1: string,
    clienteUltimaCompra2: string,
    codigoClienteUltimaCompra2: string,
    clienteUltimaCompra3: string,
    codigoClienteUltimaCompra3: string,
    dataFabricacao: Date,
    preco: number,
    localEstocagem: {
        guid: string,
        localEstocagem: string
    }
    tipoMaterial: {
        id: string,
        tipo: string
    },
    unidade: string,
    cadastro: {
        id: string,
        apelido: string,
        nome: string,
        dataHora: Date
    },
    alteracao: {
        id: string,
        apelido: string,
        nome: string,
        dataHora: Date
    }
    ativo: boolean
}
interface Color {
    background: string,
    color: string
}


export default function Table() {
    const [data, setData] = useState<ItemsProps[]>([]);
    const [dataItemAlteracao, setDataItemAlteracao] = useState<ItemsProps>();
    const [dataItemString, setDataItemString] = useState<string>("");

    const [toogleAdd, setToogleAdd] = useState<boolean>(false);
    const [toogleFilterCodigo, setToogleFilterCodigo] = useState<boolean>(false);
    const [toogleFilterLocal, setToogleFilterLocal] = useState<boolean>(false);
    const [toogleFilterTipo, setToogleFilterTipo] = useState<boolean>(false);
    const [toogleInfoPlus, setToogleInfoPlus] = useState<boolean>(false);
    const [toogleSubstituto, setToogleSubstituto] = useState<boolean>(false);
    const [indiceInfoPlus, setIndiceInfoPlus] = useState<number>();
    const [colSpan, setColSpan] = useState<number>(11);

    const colors: Record<string, Color> = {

        "MATRIZ - GRM": {
            background: "#B40000",
            color: "white"
        },
        "FABRICA - GRM": {
            background: "#5D60E9",
            color: "white"
        },
        ROL: {
            background: "#4CFAFA",
            color: "#048D8A"
        },
        KG: {
            background: "#F47210",
            color: "#9D4707"
        },
        "PET VIRGEM": {
            background: "#3FFF8D",
            color: "#15990B"
        },
        "PET-2": {
            background: "#00923B",
            color: "white"
        },
        "FPA VIRGEM": {
            background: "#001dff9c",
            color: "white"
        },
        "FPA-2": {
            background: "#0B28B9",
            color: "white"
        },
        STRETCH: {
            background: "#E753DC",
            color: "white"
        },


        "STRECH ECO": {
            background: "#94148B",
            color: "white"
        },
        SHRINK: {
            background: "#EB5353",
            color: "white"
        },
        true: {
            background: "#3FFF8D",
            color: "#15990B"
        },
        false: {
            background: "#B40000",
            color: "red"
        }
    }


    useEffect(() => {
        FechData();
    }, [])
    useEffect(() => {
        alteracao({ id: dataItemString })

    }, [data]);

    const { CardStorage: CardAdd } = CardAddComponent();
    const { Card: CardChange, setToogle: setToogleCardChange, toogle: toogleCardChange } = CardChangeComponent();
    const { Card: CardFilterCodigo, filteredData: textCodigo } = FilterCodigo({
        listProps: data ? data.map(item => ({
            codigo: item.codigo,
            id: item.id.toString()
        })) : [],
        searchColor: getColorStyle
    })
    const { Card: CardFilterLocal, data: filterLocal } = FilterLocal({
        list: data ? data.map(item => ({
            id: item.localEstocagem.guid,
            localEstocagem: item.localEstocagem.localEstocagem
        })) : [],
        searchColors: getColorStyle
    });
    const { Card: CardFilterTipo, data: filterTipo } = FitlerTipo({
        list: data.map(item => ({
            id: item.tipoMaterial.id,
            tipo: item.tipoMaterial.tipo
        })),
        searchColor: getColorStyle
    })
    const { Card: CardSubstituto } = CardSubstitutoComponent();


    function getColorStyle(text: string) {
        const color = colors[text];

        return {
            background: color ? color.background : "black",
            color: color ? color.color : "white"
        };
    }

    async function FechData() {
        await Api.get("")
            .then(res => {
                setData(res.data)
            })
            .catch(err => console.log(err))
    }
    function alteracao({ id }: { id: string }) {

        var item = data.find(item => item.id.toString() === id);

        return setDataItemAlteracao(item);
    }



    const filter = data.filter(item => {
        if (textCodigo.some(codigo => codigo.codigo === item.codigo && codigo.visible)) {

            return (
                filterLocal.some(local => local.localEstocagem === item.localEstocagem.localEstocagem && local.visible) &&
                filterTipo.some(tipo => tipo.tipo === item.tipoMaterial.tipo && tipo.visible)
            );
        }
    })

    function YearAndMoth(value: Date) {
        const date = new Date(value);

        const day = (date.getDate() + 1).toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear().toString();
        const hour = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");

        return `${month}/${year}`

    }
    function ValidateRole() {
        const infoUser = SearchInfoOfUserOnToken;
        if (infoUser.tokenInfo["ESTOQUE - GRM - MATRIZ"] === "GERENCIAL" ||
            infoUser.tokenInfo["ESTOQUE - GRM - MATRIZ"] === "EXPEDIÇÃO - ALTERAÇÃO") {
            return true;
        }
        return false;
    }

    return (
        <div className={style.container_table} >
            <div className={toogleAdd ?
                style.container_add :
                style.container_add_close} >
                <CardAdd
                    changeToogle={setToogleAdd}
                    refreshTable={FechData}
                    searchColor={getColorStyle}
                />
            </div>
            <div className={toogleCardChange ?
                style.container_alteracao :
                style.container_alteracao_close} >
                {dataItemAlteracao && (
                    <CardChange
                        data={dataItemAlteracao}
                        toogle={toogleCardChange}
                        changeToogle={setToogleCardChange}
                        refreshTable={FechData}
                    />
                )}

            </div>

            <div className={style.container_button} >
                <div className={style.wrap_containerButton} >
                    <button onClick={() => {
                        if (ValidateRole())
                            setToogleAdd(!toogleAdd)
                    }} >
                        Adicionar Produto
                    </button>
                </div>
            </div>
            <div className={style.wrap_container_table} >
                <section className={style.table_teste} >
                    <table className={style.table} onClick={() => {
                        setToogleFilterCodigo(false);
                        setToogleFilterLocal(false);
                    }} >
                        <thead>
                            <tr>
                                <th>
                                    +
                                </th>
                                <th>
                                    CÓDIGO
                                    <CiMenuKebab onClick={(e) => {
                                        e.stopPropagation(),
                                            setToogleFilterCodigo(!toogleFilterCodigo)
                                    }} />
                                    <div onClick={e => e.stopPropagation()}
                                        className={toogleFilterCodigo ?
                                            style.container_codigo :
                                            style.container_codigo_close} >
                                        <CardFilterCodigo />
                                    </div>
                                </th>
                                <th>Descrição</th>
                                <th>QTD.</th>
                                <th>UND.</th>
                                <th>PREÇO</th>
                                <th>DATA / FABR.</th>
                                {/* <th>SUBST.</th> */}
                                <th>
                                    LOCAL/ EST.
                                    <CiMenuKebab onClick={e => {
                                        e.stopPropagation(),
                                            setToogleFilterLocal(!toogleFilterLocal)
                                    }} />
                                    <div onClick={(e) => e.stopPropagation()}
                                        className={toogleFilterLocal ?
                                            style.card_local :
                                            style.card_local_close}
                                    >
                                        <CardFilterLocal />
                                    </div>
                                </th>
                                <th>
                                    TIPO
                                    <CiMenuKebab onClick={e => {
                                        e.stopPropagation(),
                                            setToogleFilterTipo(!toogleFilterTipo)
                                    }} />
                                    <div className={toogleFilterTipo ?
                                        style.card_type :
                                        style.card_type_close} >
                                        <CardFilterTipo />
                                    </div>
                                </th>
                                <th>STATUS</th>
                                <th>COD./ CLIENT-1</th>
                                <th>CLIET./ ULT/ COMP-1</th>
                                <th>COD./ CLIENT-2</th>
                                <th>CLIET./ ULT/ COMP-2</th>
                                <th>COD./ CLIENT-3</th>
                                <th>CLIET./ ULT/ COMP-3</th>
                                <th>EDIT.</th>
                            </tr>
                        </thead>
                        <tbody className={style.table_body} >
                            {filter && filter.length > 0 ?
                                filter.map((item, index) => {
                                    return (
                                        <Fragment key={index} >
                                            <tr className={style.row} >
                                                <td onClick={() => {
                                                    setIndiceInfoPlus(index)
                                                    setToogleInfoPlus(!toogleInfoPlus)
                                                }} >
                                                    <BiArrowFromTop
                                                        className={toogleInfoPlus && index === indiceInfoPlus ?
                                                            style.down :
                                                            style.top} />
                                                </td>
                                                <td>{item.codigo}</td>
                                                <td>{item.descricao}</td>
                                                <td>{item.quantidade}</td>
                                                <td className={`${style["table_button"]} ${style["--unidade"]}`} >
                                                    <p style={getColorStyle(item.unidade)} >{item.unidade}</p>

                                                </td>
                                                <td>
                                                    {`R$ ${item.preco.toString().padStart(2, "0")}`}
                                                </td>
                                                <td>
                                                    {YearAndMoth(item.dataFabricao)}
                                                </td>
                                                {/* <td className={`${style["table_button"]} ${style["--substitutos"]}`}
                                                    onClick={() => {
                                                        if (item.substitutos.length > 0) {

                                                            setIndiceInfoPlus(index)
                                                            setToogleSubstituto(!toogleSubstituto)
                                                        }
                                                    }}
                                                >
                                                    {item.substitutos && item.substitutos.length > 0 && (
                                                        <div className={toogleSubstituto ?
                                                            style.cardSubstituto :
                                                            style.cardSubstituto_close} >
                                                            <CardSubstituto
                                                                list={item.substitutos}
                                                                getColor={getColorStyle}
                                                            />
                                                        </div>
                                                    )}
                                                    <p>
                                                        {item.substitutos.length}
                                                    </p>
                                                </td> */}
                                                <td className={`${style["table_button"]} ${style["--estocagem"]}`} >
                                                    <p style={getColorStyle(item.localEstocagem.localEstocagem)} >
                                                        {item.localEstocagem.localEstocagem}
                                                    </p>
                                                </td>
                                                <td className={`${style["table_button"]} ${style["--tipo"]}`} >
                                                    <p style={getColorStyle(item.tipoMaterial.tipo)} >
                                                        {item.tipoMaterial.tipo}
                                                    </p>
                                                </td>
                                                <td className={`${style["table_button"]} ${style["--tipo"]}`} >
                                                    <p style={getColorStyle(item.ativo.toString())} >
                                                        {item.ativo === true ? "ATIVO" : "INATIVO"}
                                                    </p>
                                                </td>

                                                <td>{item.codigoClienteUltimaCompra1}</td>
                                                <td>{item.clienteUltimaCompra1}</td>
                                                <td>{item.codigoClienteUltimaCompra2}</td>
                                                <td>{item.clienteUltimaCompra2}</td>
                                                <td>{item.codigoClienteUltimaCompra3}</td>
                                                <td>{item.clienteUltimaCompra3}</td>
                                                <td>
                                                    <p style={{
                                                        fontSize: 22
                                                    }} onClick={() => {
                                                        alteracao({ id: item.id.toString() });
                                                        setDataItemString(item.id.toString())
                                                        setToogleCardChange(true)
                                                    }} >
                                                        <TbEdit />
                                                    </p>
                                                </td>
                                            </tr>
                                            {toogleInfoPlus && indiceInfoPlus === index && (
                                                <>
                                                    <tr className={style.row_plus} >
                                                        <td colSpan={colSpan} >
                                                            {`Data/Hora Cadastro : ${DateTimeStringFormat(item.cadastro.dataHora)}`}
                                                        </td>
                                                    </tr>
                                                    <tr className={style.row_plus} >
                                                        <td colSpan={colSpan} >
                                                            {`Usuário Cadastro : ${item.cadastro.nome}`}
                                                        </td>
                                                    </tr>
                                                    <tr className={style.row_plus} >
                                                        <td colSpan={colSpan} >
                                                            {`Data/Hora Alteração : ${DateTimeStringFormat(item.alteracao.dataHora)}`}
                                                        </td>
                                                    </tr>
                                                    <tr className={style.row_plus} >
                                                        <td colSpan={colSpan} >
                                                            {`Usuário Alteração : ${item.alteracao.nome}`}
                                                        </td>
                                                    </tr>
                                                </>
                                            )}
                                        </Fragment>
                                    )
                                })
                                :
                                <>
                                    <tr style={{
                                        border: "none"
                                    }}>
                                        <td style={{
                                            border: 'none'
                                        }} colSpan={colSpan}>Nenhum item disponivel!</td>
                                    </tr>
                                    <tr>
                                        <td style={{
                                            border: 'none'
                                        }} colSpan={colSpan}>
                                            <span className={style.span} >:(</span>
                                        </td>
                                    </tr>
                                </>}
                        </tbody>
                    </table>
                </section>

            </div>
        </div>
    )
}

