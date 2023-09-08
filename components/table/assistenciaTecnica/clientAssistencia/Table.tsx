import { Fragment, useEffect, useState } from "react"
import Api from "../../../../service/api/assistenciaTecnica/Assistencia";
import style from "./style.module.css";
import { BiArrowFromTop } from "react-icons/bi";
import { CiMenuKebab } from "react-icons/ci";
import FilterCodigo from "./filterCodigo/Card";
import FilterNome from './filterNome/Card';

interface dataProps {
    idCliente: string,
    cnpj: string,
    codigoRadar: string,
    contatoTelefone: string,
    endereco: string,
    nome: string
}

export default function Table() {
    const [data, setData] = useState<dataProps[]>([]);
    const [toogleInfoPlus, setToogleInfoPlus] = useState<boolean>(false);
    const [toogleFiterCodigo, setToogleFilterCodigo] = useState<boolean>(false);
    const [toogleFilterNome, setToogleFilterNome] = useState<boolean>(false);

    useEffect(() => {
        FecthData()
    }, [])

    const { CardFilter, data: filterCodigoRadar } = FilterCodigo({
        list: data ? data.map(item => ({
            codigo: item.codigoRadar
        })) : []
    })
    const { CardFilterNome, data: filterCodigoNome } = FilterNome({
        list: data ? data.map(item => ({
            nomeCliente: item.nome
        })) : []
    })

    async function FecthData() {
        await Api.get("/cliente")
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }
    const filter = data.filter(item => {
        if (filterCodigoRadar.some(codigo => codigo.codigo === item.codigoRadar && codigo.visible)) return item
    })
    return (
        <main className={style.container} >
            <section></section>
            <section className={style.container_table} >
                <div className={style.wrap_table} >
                    <table className={style.table} >
                        <thead>
                            <tr>
                                <th>+</th>
                                <th>
                                    CÓD./ RADAR
                                    <CiMenuKebab
                                        onClick={e => {
                                            e.stopPropagation()
                                            setToogleFilterCodigo(!toogleFiterCodigo)
                                        }}
                                    />
                                    <div onClick={e => {
                                        e.stopPropagation()
                                    }}
                                        className={toogleFiterCodigo ?
                                            style.container_codigo :
                                            style.container_codigo_close}
                                    >
                                        <CardFilter />
                                    </div>
                                </th>
                                <th>NOME/ CLIENTE
                                    <CiMenuKebab
                                        onClick={e => {
                                            e.stopPropagation()
                                            setToogleFilterNome(!toogleFilterNome)
                                        }}
                                    />
                                    <div onClick={(e) => {
                                        e.stopPropagation()
                                    }}
                                        className={toogleFilterNome ?
                                            style.container_nome :
                                            style.container_nome_close}
                                    >
                                        <CardFilterNome />
                                    </div>
                                </th>
                                <th>CNPJ</th>
                                <th>Endereço</th>
                            </tr>
                        </thead>
                        <tbody className={style.table_body} >
                            {data && (
                                filter.map((item, index) => (
                                    <Fragment key={index}>
                                        <tr key={index} className={style.row} >
                                            <td>
                                                <BiArrowFromTop
                                                    className={toogleInfoPlus ?
                                                        style.down :
                                                        style.top}
                                                />
                                            </td>
                                            <td>{item.codigoRadar}</td>
                                            <td>{item.nome}</td>
                                            <td>{item.cnpj}</td>
                                            <td>{item.endereco}</td>
                                        </tr>
                                    </Fragment>
                                ))
                            )}
                        </tbody>
                    </table>

                </div>

            </section>
        </main>
    )
}