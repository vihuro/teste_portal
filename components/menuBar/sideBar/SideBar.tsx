"use client"
import { useEffect, useState } from "react";
import { ListMenus } from "../ListMenus";
import style from "./style.module.css";
import { FiSettings } from "react-icons/fi";
import { json } from "stream/consumers";

interface Props {
    id: number
}

interface RotasProps {
    text: string;
    link?: string;
    visible: boolean;
    rotas?: RotasProps[];
  }
  
  interface listMenusProps {
    class: string;
    icon: JSX.Element;
    text: string;
    visible: boolean;
    link: string;
    rotas: RotasProps[];
  }

export default function SideBar() {
    const { List } = ListMenus();

    const [listMenus, setListMenus] = useState<listMenusProps[]>([]);
    const [marginTop, setMarginTop] = useState("0px");
    const [toogle, setToogle] = useState(false);

    useEffect(() => {
        setListMenus(List as listMenusProps[]);
    }, [])

    function changeList(id: number) {
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
                class: index === id ? "row_active" : "row",
                visible: index === id ? !item.visible : false
            };
        });



        setListMenus(newList);
    }


    function changeVisibleSegundaRota(id: number) {
        const newList = listMenus.map((item, index1) => {
            const rotas = item.rotas.map((rotas, index2) => {

                return {
                    ...rotas,
                    visible: index2 === id ? !rotas.visible : false
                }
            })
            return {
                ...item,
                rotas: rotas
            }
        })

        setListMenus(newList)

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
                    {listMenus && (
                        listMenus.map((item, index) => (
                            <li
                                onClick={() => {

                                    changeList(index);

                                }}
                                className={style[item.class]}
                                key={index}
                            >
                                {item.icon}
                                <a>{item.text}</a>
                                {item.visible && item.rotas.length > 0 && (
                                    <ul className={style.subMenu} onClick={(e) => e.stopPropagation()} >
                                        {item.rotas.map((primeiraRota, index) => {

                                            return (
                                                <ul key={index}>
                                                    <li onClick={() => {
                                                        changeVisibleSegundaRota(index)
                                                    }} >{primeiraRota.text}</li>

                                                    {primeiraRota.visible && primeiraRota.rotas && primeiraRota.rotas.length > 0 && (
                                                        <>
                                                            <ul className={style.segundoSubMenu} >
                                                                {primeiraRota.rotas.map((segundaRota, index) => (
                                                                    <li key={index} >
                                                                        {segundaRota.rotas && (
                                                                            <a href={segundaRota.rotas[0].link}>{segundaRota.text}</a>
                                                                        )}

                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </>
                                                    )}

                                                </ul>
                                            )
                                        })}
                                    </ul>
                                )}

                            </li>
                        ))

                    )}
                    <div className={style.selector} style={{
                        marginTop: marginTop
                    }} />
                </ul>
            </div>
            <footer className={style.footer} ></footer>
        </section>
    )
}