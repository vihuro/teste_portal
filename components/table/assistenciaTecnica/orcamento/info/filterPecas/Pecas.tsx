import { useEffect, useRef, useState } from "react";
import Api from "../../../../../../service/api/assistenciaTecnica/Assistencia";
import styles from "./style.module.css";
import { IPecaProps, IFilterPecaProps, IPaginationProps } from "../../../pecas/IPeca";
import ButtonUi from "../../../../../UI/button/Button";
import { Icons } from "../../../../../utils/IconDefault";
import { Form } from "./ConfirmAdd/Form"


interface FilterProps {
    Unidade: string,
    CodigoRadar: string,
    Descricao: string,
    Familia: string
}


function Card({ toogle, changeToogle }: { toogle: boolean, changeToogle: Function }) {

    const sentinel = useRef<HTMLTableRowElement>(null);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [thisData, setThisData] = useState<IPecaProps[]>([]);
    const [thisInfoPage, setThisInfoPage] = useState<IPaginationProps>({
        currentePage: 0,
        itemForPage: 50,
        totalItems: 0,
        totalPages: 0
    });

    const thisInfoPageWithFilter = useRef<IPaginationProps>({
        currentePage: 0,
        itemForPage: 50,
        totalItems: 0,
        totalPages: 0
    })
    const [filterFetch, setFilterFecth] = useState<FilterProps>({
        CodigoRadar: "",
        Descricao: "",
        Familia: "",
        Unidade: ""
    })
    const [toogleFormConfirmAdd, setToogleFormConfirmAdd] = useState<boolean>(false);
    const [typeFilter, setTypeFilter] = useState<string>("");
    const [textFilter, setTextFilter] = useState<string>("");
    const [toogleTypeFilterList, setToogleTypeFilterList] = useState<boolean>(false)
    const [itemAdd, setItemAdd] = useState<IPecaProps | undefined>(undefined);
    useEffect(() => {
        if (!toogle) {
            setCurrentPage(() => 0)
            return;
        }
        if (typeFilter === "" &&
            (filterFetch.CodigoRadar === "" ||
                filterFetch.Descricao === "")) {
            ThisFetchDataPecas()
            return;
        }
        FetchDataWithFilter()
    }, [currentPage, toogle])

    useEffect(() => {
        const intersectionObserver = new IntersectionObserver(([entry]) => {
            const ratio = entry.intersectionRatio;
            if (ratio > 0) {
                setCurrentPage((current) => current + 50)
            }

        })
        if (sentinel.current) {
            intersectionObserver.observe(sentinel.current)
        }
        return () => {
            intersectionObserver.disconnect();
        }

    }, [])


    async function FetchDataWithFilter() {

        if (thisInfoPageWithFilter.current.totalItems === 0) {
            setCurrentPage((current) => current = 0);
            setThisData(() => [])
        }
        if (thisInfoPageWithFilter.current.totalItems === thisData.length && thisInfoPageWithFilter.current.totalItems !== 0) return;
        await Api.get(`/assistencia-tecnica/pecas/with-filter/${currentPage}/${thisInfoPageWithFilter.current.itemForPage}`, {
            params: filterFetch
        })
            .then(res => {
                if (currentPage === 0) {

                    setThisData((current) => current = res.data.pecas)
                } else {
                    setThisData((current) => [...current, ...res.data.pecas])
                }
                thisInfoPageWithFilter.current = {
                    currentePage: res.data.currentPage,
                    totalPages: res.data.quantityPages,
                    totalItems: res.data.total,
                    itemForPage: 50
                }
            })
            .catch(err => console.log(err))

    }

    async function ThisFetchDataPecas() {

        if (thisInfoPage.totalItems === 0) {
            setCurrentPage(() => 0)
            setThisData(() => [])
        }
        await Api.get(`/assistencia-tecnica/pecas/${currentPage}/${thisInfoPage.itemForPage}`)
            .then(res => {
                setThisInfoPage((current) => ({
                    ...current,
                    currentePage: res.data.currentPage,
                    totalPages: res.data.quantityPages,
                    totalItems: res.data.total
                }))
                if (currentPage === 0) {

                    setThisData((current) => current = res.data.pecas)
                } else {
                    setThisData((current) => [...current, ...res.data.pecas])
                }
            })
            .catch(err => console.log(err))
    }
    const { Button } = ButtonUi();

    function clear() {
        setFilterFecth({
            CodigoRadar: "",
            Descricao: "",
            Familia: "",
            Unidade: ""
        })
        setTextFilter("")
        setTypeFilter("")
        setThisData([])
        changeToogle((current: boolean) => !current)
    }

    function filter() {
        thisInfoPageWithFilter.current = {
            currentePage: 0,
            itemForPage: 50,
            totalItems: 0,
            totalPages: 0
        }
        if (typeFilter === "") {
            setCurrentPage(() => 0)
            ThisFetchDataPecas()
        } else {
            FetchDataWithFilter()
        }
    }

    return (
        <section className={styles.form} >
            <div className={toogleFormConfirmAdd ?
                styles.containerFormAdd :
                styles.containerFormAdd_close} >
                <Form peca={itemAdd} changeToogle={setToogleFormConfirmAdd} />
            </div>
            <header></header>
            <main className={styles.containerBody} >
                <div className={styles.containerTable} >
                    <div className={styles.containerFilter} >
                        <div className={styles.containerTypesFilter} >
                            <input
                                type="text"
                                value={typeFilter}
                                placeholder="SELECIONE..."
                                onChange={() => { }}
                                onClick={() => setToogleTypeFilterList(current => !current)} />
                            <ul className={toogleTypeFilterList ?
                                styles.listTypeFilter :
                                styles.listTypeFilter_close} >
                                <li onClick={() => {
                                    setTypeFilter((current) => current = "")
                                    setToogleTypeFilterList((current) => !current)
                                }} > SELECIONE... </li>
                                <li onClick={() => {
                                    setTypeFilter((current) => current = "CÓDIGO")
                                    setToogleTypeFilterList((current) => !current)
                                }} >CÓDIGO</li>
                                <li onClick={() => {
                                    setTypeFilter((current) => current = "DESCRIÇÃO")
                                    setToogleTypeFilterList((current) => !current)
                                }} >DESCRIÇÃO</li>
                                <li onClick={() => {
                                    setTypeFilter((current) => current = "UNIDADE")
                                    setToogleTypeFilterList((current) => !current)
                                }} >UNIDADE</li>
                            </ul>
                        </div>
                        <div className={styles.containerInputFilter} >
                            <input
                                type="text"
                                value={textFilter}
                                onChange={(e) => {
                                    setTextFilter(e.target.value)
                                    if (typeFilter === "CÓDIGO") {
                                        setFilterFecth(() => ({
                                            CodigoRadar: e.target.value,
                                            Descricao: "",
                                            Familia: "",
                                            Unidade: ""
                                        }))
                                    } else {
                                        setFilterFecth(() => ({
                                            CodigoRadar: "",
                                            Descricao: e.target.value,
                                            Familia: "",
                                            Unidade: ""
                                        }))
                                    }
                                }} />
                        </div>
                        <div className={styles.buttonFilter} >
                            <Button
                                classUi="default"
                                color="blue"
                                icon={Icons.Filter}
                                onClick={() => {
                                    filter()

                                }}
                            />
                        </div>
                    </div>
                    <div className={styles.wrapTable} >
                        <table className={styles.table} >
                            <thead>
                                <tr>
                                    <th>CÓDIGO</th>
                                    <th>DESCRIÇÃO</th>
                                    <th></th>

                                </tr>
                            </thead>
                            <tbody className={styles.tableBody} >

                                {thisData && thisData.length > 0 ?
                                    thisData.map((item, index) => (
                                        <tr className={styles.tableRow} key={index}>
                                            <td>{item.codigoRadar}</td>
                                            <td>{item.descricao}</td>
                                            <td className={styles.buttonAdd}
                                                onClick={() => {
                                                    setItemAdd(() => item)
                                                    setToogleFormConfirmAdd((current) => !current)
                                                }} >
                                                <span>ADICIONAR</span>
                                            </td>
                                        </tr>
                                    ))
                                    :
                                    <tr>
                                        <td className={styles.infoNotFound} colSpan={3} >
                                            <span>NENHUM ITEM ENCONTRADO!</span>
                                            <span>:(</span>
                                        </td>
                                    </tr>
                                }
                                <tr ref={sentinel} >
                                    <td colSpan={4} ></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div >
            </main >
            <footer className={styles.footer} >
                <Button
                    classUi="glass"
                    color="red"
                    text="FECHAR"
                    type="button"
                    onClick={() => {
                        clear()
                    }}
                />
            </footer>
        </section >
    )
}

export { Card }
