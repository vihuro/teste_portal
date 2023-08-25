import { BiAddToQueue } from "react-icons/bi";
import ButtonUi from "../../../../UI/button/Button";
import Loading from "../../../../loading/Loading";
import Message from "../../../../message/Message";
import style from "./style.module.css";
import { useState, useEffect } from "react";
import Api from "../../../../../service/api/login/login";
import FilterName from "./filterName/FilterName";

interface responseClaimsProps {
    totalClaims: number,
    dataClaims: claimsPorps[]
}
interface claimsPorps {
    claimId: string,
    claimName: string,
    claimValue: string
}
interface props {
    userClaimId: string,
    claimsId: string[],
    changeToogle: Function,
    fechDataTable: Function

}

export default function CardFilter({ userClaimId, changeToogle, claimsId, fechDataTable }: props) {

    const [toogleMessage, setToogleMessage] = useState<boolean>(false);
    const [dataMessage, setDataMessage] = useState({
        message: "",
        type: "WARNING"
    })
    const [filterName, setFilterName] = useState<claimsPorps[]>([]);
    const [toogleLoading, setToogleLoading] = useState<boolean>(false);
    const [data, setData] = useState<responseClaimsProps>();
    const [toogleFilterName, setToogleFilterName] = useState<boolean>(false);
    const { Button } = ButtonUi();
    useEffect(() => {
        FetchData();

    }, [userClaimId, claimsId]);



    async function AdicionarClaims(claimId: string) {
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


    async function FetchData() {
        await Api.get("/claimsType")
            .then(res => setData(res.data))
            .catch(err => console.log(err));
        ChangeFilterName();

    }
    function ChangeFilterName() {
        if (data) {

            const teste = data.dataClaims.filter(item => {
                if (!claimsId.includes(item.claimId)) {
                    return item;
                }
            })
            setFilterName(teste);

        }
    }



    // const filterName = data?.dataClaims.filter(item => {
    //     if (!claimsId.includes(item.claimId)) {
    //         return item;
    //     }
    // })

    const { List: FilterNameList, listFilter: listFilterName } = FilterName({ name: filterName.map(item => item.claimName), visible: toogleFilterName })

    const filter = data && data.dataClaims ? data.dataClaims.filter(item => {
        if(!claimsId?.includes(item.claimId)){
            return item;
        }


    }) : [];



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
                                <td onClick={() => setToogleFilterName(!filterName)} >
                                    Name
                                    {/* <section className={style.filterName} >
                                        <FilterNameList />

                                    </section> */}
                                </td>
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
                                                AdicionarClaims(item.claimId)} />
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