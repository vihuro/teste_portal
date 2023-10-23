import { useEffect, useState } from "react"
import InputUi from "../../../../UI/input/Input";
import styles from "./style.module.css";
import ButtonUi from "../../../../UI/button/Button";

interface Props {
    changeToogle: Function,
    fetchDataFilter: Function,
    dataFilterProps: FilterProps,
    setDataTable: Function,
    fetchDataWithoutFilter: Function,
    changeCurrentPage: Function,
    cleanFilter: Function,
    setFilterFecth: Function,
    currentPage: number
}
interface FilterProps {
    CodigoRadar: string,
    Unidade: string,
    Descricao: string,
    Familia: string
}

export default function Filter({ changeToogle,
    dataFilterProps,
    fetchDataFilter,
    setDataTable,
    changeCurrentPage,
    cleanFilter,
    fetchDataWithoutFilter,
    setFilterFecth,
    currentPage }: Props) {

    const [filter, setFilter] = useState<FilterProps>();


    useEffect(() => {
        setFilter((current) => ({
            ...current,
            CodigoRadar: dataFilterProps.CodigoRadar,
            Descricao: dataFilterProps.Descricao,
            Familia: dataFilterProps.Familia,
            Unidade: dataFilterProps.Unidade
        }))
    }, [])

    const { Input } = InputUi()
    const { Button } = ButtonUi();

    async function Filter() {
        setDataTable([])
        setFilterFecth(filter)
        changeCurrentPage((current: number) => current = 0)
        // setDataTable((current) => current = [])
        await fetchDataFilter(filter)
        changeToogle(false)


    }

    async function ClenFilter() {
        cleanFilter()
        changeToogle(false)
    }

    return (
        <form className={styles.form} action="">
            <header></header>
            <main className={styles.body} >
                {filter && (
                    <>
                        <div className={styles.containerInput} >
                            <Input
                                id="txtCodigoRadar"
                                text="CÓDIGO RADAR"
                                autoComplete="off"
                                value={filter.CodigoRadar}
                                onChange={(e) => {
                                    setFilter(() => ({
                                        ...filter,
                                        CodigoRadar: e.target.value
                                    }))
                                }} />
                        </div>
                        <div className={styles.containerInput} >
                            <Input
                                id="txtDescricao"
                                text="DESCRIÇÃO"
                                value={filter.Descricao}
                                autoComplete="off"
                                onChange={(e) => {
                                    setFilter(() => ({
                                        ...filter,
                                        Descricao: e.target.value
                                    }))
                                }}
                            />
                        </div>
                        <div className={styles.containerInput} >
                            <Input
                                id="txtUnidade"
                                text="UNIDADE"
                                value={filter.Unidade}
                                autoComplete="off"
                                onChange={(e) => {
                                    setFilter(() => ({
                                        ...filter,
                                        Unidade: e.target.value
                                    }))
                                }}
                            />
                        </div>
                        <div className={styles.containerInput} >
                            <Input
                                id="txtFamilia"
                                text="FAMÍLIA"
                                value={filter.Familia}
                                autoComplete="off"
                                onChange={(e) => {
                                    setFilter(() => ({
                                        ...filter,
                                        Familia: e.target.value
                                    }))
                                }}
                            />
                        </div>
                    </>
                )}
            </main>
            <footer className={styles.footer} >
                <div>
                    <Button
                        classUi="glass"
                        color="green"
                        text="FILTRAR"
                        type="button"
                        onClick={() => Filter()}
                    />
                </div>
                <div>
                    <Button
                        classUi="glass"
                        color="red"
                        text="LIMPAR FILTRO"
                        type="button"
                        onClick={() => ClenFilter()}
                    />
                </div>
            </footer>
        </form>
    )
}