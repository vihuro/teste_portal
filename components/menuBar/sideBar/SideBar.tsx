"use client"
import { useEffect, useState } from "react";
import { ListMenus } from "../ListMenus";
import style from "./style.module.css";
import { FiSettings } from "react-icons/fi";

interface Props {
    id: number
}

export default function SideBar() {
    const { List } = ListMenus();

    const [listMenus, setListMenus] = useState(List);
    const [marginTop, setMarginTop] = useState("0px");
    const [toogle, setToogle] = useState(false);

    useEffect(() => {
        setListMenus(listMenus);
    }, [List])

    function changeList({ id }: Props) {
        const newList = listMenus.map((item, index) => {
            if (index === id) {
                switch (item.text) {
                    case "ESTOQUE":
                        setMarginTop("0px");
                        break;
                    case "EXPEDIÇÃO":
                        setMarginTop("55px");
                        break;
                    case "PRODUÇÃO":
                        setMarginTop("110px");
                        break;
                    case "GERENCIAL":
                        setMarginTop("165px");
                        break;
                    default:
                        setMarginTop("0px");
                        break;
                }
            }

            return {
                ...item,
                class: index === id ? "row_active" : "row"
            };
        });

        setListMenus(newList);
    }

    return (
        <section className={
            `${toogle ?
                style.side_bar :
                style.side_bar_close
            }`} >
            <header className={style.header} >
                <FiSettings onClick={() => setToogle(!toogle)} />
            </header>
            <div className={style.body} >
                <ul className={style.list} >
                    {listMenus.map((item, index) => (
                        <li
                            onClick={() => {
                                changeList({ id: index });
                            }}
                            className={style[item.class]}
                            key={index}
                        >
                            {item.icon}
                            <a  >{item.text}</a>
                        </li>
                    ))}
                    <div className={style.selector} style={{
                        marginTop: marginTop
                    }} />
                </ul>
            </div>
            <footer className={style.footer} ></footer>
        </section>
    )
}