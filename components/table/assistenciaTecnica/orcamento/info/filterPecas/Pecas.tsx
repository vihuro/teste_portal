import { useEffect, useRef, useState } from "react";
import Api from "../../../../../../service/api/assistenciaTecnica/Assistencia";
import styles from "./style.module.css";
import { IPecaProps, IFilterPecaProps, IPaginationProps } from "../../../pecas/IPeca";
import ButtonUi from "../../../../../UI/button/Button";
import { Icons } from "../../../../../utils/IconDefault";
import { Form } from "./ConfirmAdd/Form"

export default function FilterPecas() {

    const [data, setData] = useState<IPecaProps[]>([]);
    const [infoPage, setInfoPage] = useState<IPaginationProps>({
        currentePage: 0,
        itemForPage: 50,
        totalItems: 0,
        totalPages: 0
    });

    const [currentPage, setCurrentPage] = useState<number>(0);


    function FetchDataPecas() {
        Api.get(`/assistencia-tecnica/pecas/${currentPage}/${infoPage.itemForPage}`)
            .then(res => {
                setInfoPage((current) => ({
                    ...current,
                    currentePage: res.data.currentPage,
                    totalPages: res.data.quantityPages,
                    totalItems: res.data.total
                })),
                    setData((current) => [...current, ...res.data.pecas])
            })
            .catch(err => console.log(err))
    }

    function Card({ toogle, changeToogle }: { toogle: boolean, changeToogle: Function }) {

        const sentinel = useRef<HTMLTableRowElement>(null);
        const [thisCurrentPage, setThisCurrentPage] = useState<number>(0);
        const [thisData, setThisData] = useState<IPecaProps[]>([]);
        const [thisInfoPage, setThisInfoPage] = useState<IPaginationProps>({
            currentePage: 0,
            itemForPage: 50,
            totalItems: 0,
            totalPages: 0
        });
        const [toogleFormConfirmAdd, setToogleFormConfirmAdd] = useState<boolean>(false);
        const [typeFilter, setTypeFilter] = useState<string>("");
        const [textFilter, setTextFilter] = useState<string>("");
        const [toogleTypeFilterList, setToogleTypeFilterList] = useState<boolean>(false)
        const [itemAdd, setItemAdd] = useState<IPecaProps | undefined>(undefined);
        useEffect(() => {
            const intersectionObserver = new IntersectionObserver(([entry]) => {
                const ratio = entry.intersectionRatio;
                if (ratio > 0) {
                    setThisCurrentPage((current) => current + 50)
                }

            })
            if (sentinel.current) {
                intersectionObserver.observe(sentinel.current)
            }
            return () => {
                intersectionObserver.disconnect();
            }

        }, [sentinel && toogle === true])

        useEffect(() => {
            if (toogle) {
                ThisFetchDataPecas()
            }
        }, [thisCurrentPage])

        async function ThisFetchDataPecas() {
            await Api.get(`/assistencia-tecnica/pecas/${thisCurrentPage}/${thisInfoPage.itemForPage}`)
                .then(res => {
                    setThisInfoPage((current) => ({
                        ...current,
                        currentePage: res.data.currentPage,
                        totalPages: res.data.quantityPages,
                        totalItems: res.data.total
                    })),
                        setThisData((current) => [...current, ...res.data.pecas])
                })
                .catch(err => console.log(err))
        }
        const { Button } = ButtonUi();

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
                                    onChange={() => { }}
                                    onClick={() => setToogleTypeFilterList(current => !current)} />
                                <ul className={toogleTypeFilterList ?
                                    styles.listTypeFilter :
                                    styles.listTypeFilter_close} >
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
                                    <li onClick={() => {
                                        setTypeFilter((current) => current = "FAMÍLIA")
                                        setToogleTypeFilterList((current) => !current)
                                    }} >FAMÍLIA</li>
                                </ul>
                            </div>
                            <div className={styles.containerInputFilter} >
                                <input
                                    type="text"
                                    value={textFilter}
                                    onChange={(e) => setTextFilter(e.target.value)} />
                            </div>
                            <div className={styles.buttonFilter} >
                                <Button
                                    classUi="default"
                                    color="blue"
                                    icon={Icons.Filter}
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
                                    {thisData && (
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
                                    )}
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
                        onClick={() => changeToogle(false)}
                    />
                </footer>
            </section >
        )
    }

    return {
        Card,
        FetchDataPecas
    }
}
