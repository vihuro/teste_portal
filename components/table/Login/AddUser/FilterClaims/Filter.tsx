import { useState, useEffect } from "react";
import Api from "../../../../../service/api/login/login";
import style from "./style.module.css";
import { BiAddToQueue } from "react-icons/bi";
import { CiMenuKebab } from "react-icons/ci";
import Message from "../../../../message/Message";

interface claimsProps {
    claimId: string,
    claimName: string,
    claimValue: string
}
interface listItemsProps {
    claimId: string,
    claimValue: string,
}

function FilterCardName({ list }: { list: listItemsProps[] }) {
    const [items, setItems] = useState<itemsVisibleProps[]>([]);


    useEffect(() => {
        if (items.length === 0) {
            const novaLista = list.map((item) => {
                return {
                    claimId: item.claimId,
                    claimValue: item.claimValue,
                    visible: true
                }
            })
            setItems(novaLista);
        }

    }, [list])

    interface itemsVisibleProps {
        claimId: string,
        claimValue: string,
        visible: boolean
    }



    function changeVisivle({
        claimId,
        visible
    }: {
        claimId: string,
        visible: boolean
    }) {
        setItems(items.map((item) => {
            return {
                ...item,
                visible: item.claimId === claimId ? visible : item.visible
            }
        }))
    }
    function Card() {

        return (
            <div className={style.containerCardValue} onClick={e => e.stopPropagation()} >
                <table className={style.tableFilterValue}>
                    <tbody>
                        {items && (
                            items.map((item) =>
                                <tr key={item.claimId}>
                                    <td>
                                        <input type="checkbox"
                                            id={item.claimId}
                                            onChange={e => changeVisivle({
                                                claimId: item.claimId,
                                                visible: e.target.checked
                                            })}
                                            checked={item.visible} />
                                    </td>
                                    <td>
                                        <label htmlFor={item.claimId} >{item.claimValue}</label>
                                    </td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>

        )
    }
    return {
        Card,
        items
    }

}

function Filter({
    toogle,
    changeToogle,
    changeListClaims,
    listClaimsInCardAdd }:
    {
        toogle: boolean,
        changeToogle: Function,
        changeListClaims: Function,
        listClaimsInCardAdd: claimsProps[]
    }) {
    const [data, setData] = useState<claimsProps[]>([]);

    const [toogleCardFilterValue, setToogleFilterValue] = useState<boolean>(false);
    const [message, setDataMessage] = useState({
        message: "aqui",
        type: "SUCESS"
    })
    const [toogleMessage, setToogleMessage] = useState<boolean>(false);

    const { Card: CardFilterValue, items: itemFilterValue } = FilterCardName({
        list: data.map(item => ({
            claimId: item.claimId,
            claimValue: item.claimValue
        }))
    })

    useEffect(() => {
        FetchData()
    }, [changeListClaims])


    async function FetchData() {
        await Api.get("/claimstype")
            .then(res => setData(res.data.dataClaims))
            .catch(err => console.log(err))
    }
    const filter = data.filter(item => {
        return itemFilterValue.some((name) =>
            name.claimValue === item.claimValue && name.visible) &&
            !listClaimsInCardAdd.some(selectdItem => selectdItem.claimId === item.claimId)
    })
    function addItemInListClaims(claim: claimsProps) {

        changeListClaims([...listClaimsInCardAdd, claim])
    }


    return (
        <div className={style.card} >
            <div className={toogleMessage ?
                style.container_message :
                style.container_message_close} >
                <Message
                    message={message.message}
                    type={message.type}
                    stateMessage={toogleMessage}
                    action={setToogleMessage}
                />
            </div>
            <div className={style.title} >
                <h3>FILTRO</h3>
            </div>
            <div className={style.container_table} >
                <table>
                    <thead>
                        <tr>
                            <th>
                                Name
                                <CiMenuKebab />
                            </th>
                            <th>
                                Value
                                <CiMenuKebab onClick={() =>
                                    setToogleFilterValue(!toogleCardFilterValue)} />
                                <div className={toogleCardFilterValue ?
                                    style.card_filter_value :
                                    style.card_filter_value_close} >
                                    <CardFilterValue />
                                </div>
                            </th>
                            <th>Add.</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filter && (
                            filter.map((item, index) => (
                                <tr key={item.claimId} >
                                    <td>
                                        {item.claimName}
                                    </td>
                                    <td>
                                        {item.claimValue}
                                    </td>
                                    <td>
                                        <BiAddToQueue onClick={() => addItemInListClaims(item)} />
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

            </div>
            <div className={style.container_button} >
                <button onClick={() => changeToogle(false)} >
                    FECHAR
                </button>
            </div>
        </div>
    )
}

export default function CardFilter() {
    return {
        Filter
    }
}


