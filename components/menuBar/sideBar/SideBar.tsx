"use client"
import { useEffect, useState, memo } from "react";
import { List } from "../ListMenus";
import style from "./style.module.css";
import { FiSettings } from "react-icons/fi";
import { parseCookies } from "nookies";
import TokenDrecriptor from "../../../service/DecriptorToken";
import { tokenProps } from "../../utils/infoToken";
import { IListMenusProps } from "./IProps";
import { roles } from "./Function";


export default function SideBar({ idList }: { idList?: number }) {


    const [valueToken, setValueToken] = useState<tokenProps>();
    const [listMenus, setListMenus] = useState<IListMenusProps[]>([]);
    const [marginTop, setMarginTop] = useState("0px");
    const [toogle, setToogle] = useState<boolean>(false);
    const [validate, setValidate] = useState<boolean>(false);


    useEffect(() => {
        const token = parseCookies().ACCESS_TOKEN;

        setValueToken(TokenDrecriptor(token));
        setListMenus(() => List);

    }, [])
    useEffect(() => {
        if (listMenus.length > 0 && !validate) {
            setValidate(true);
            changeList(idList ?? 0, false)
        }
    }, [listMenus])


    function changeList(id: number, valueToogle?: boolean) {

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
                    case "COMPRAS":
                        setMarginTop("165px");
                        break;
                    case "ASSISTÊNCIA TÉCNICA":
                        setMarginTop("220px");
                        break;
                    case "GERENCIAL":
                        setMarginTop("275px");
                        break;
                    default:
                        setMarginTop("0px");
                        break;
                }
            }

            return {
                ...item,
                class: index === id ? "row_active" : "row",
                visible: valueToogle !== undefined ? valueToogle :
                    index === id ? !item.visible : false
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

    function validateModulo({ text }: { text: string }) {

        if (!valueToken) {
            return false; // Não há informações de token, não permitir acesso
        }

        const found = roles.find(item => item.text.toLowerCase() === text.toLowerCase());

        const foundToken = found?.role.find(item =>
            valueToken[item.name as keyof tokenProps])



        const foundRoleAndToken = found?.role.find(item => {
            if (item.value === valueToken[item.name as keyof tokenProps]) {
                return true;
            }
        })
        if (foundRoleAndToken) return true;


        return false


        // return false;




        // if (foundToken) {
        //     return true;

        // } else {
        //     return false;
        // }
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
                        listMenus.map((item, index) => {
                            const visibleMenu = validateModulo({ text: item.text });
                            return (
                                <li
                                    onClick={() => {
                                        if (visibleMenu) {
                                            changeList(index);
                                        }
                                    }}
                                    style={{
                                        color: visibleMenu ? "white" : "#ffffff82"
                                    }}
                                    className={style[item.class]}
                                    key={index}
                                >
                                    {item.icon}
                                    <a style={{
                                        color: visibleMenu ? "white" : "#ffffff82"
                                    }} >{item.text}</a>
                                    {item.visible && item.rotas.length > 0 && (
                                        <ul className={style.subMenu} onClick={(e) => e.stopPropagation()} >
                                            {item.rotas.map((primeiraRota, index) => {
                                                const visibleSubMenu = validateModulo({ text: primeiraRota.text })

                                                return (
                                                    <ul key={index}>
                                                        <li onClick={() => {
                                                            if (visibleSubMenu) {
                                                                changeVisibleSegundaRota(index)
                                                            }
                                                        }} style={{
                                                            color: visibleSubMenu ? "white" : "#ffffff82"
                                                        }} >
                                                            {primeiraRota.link !== "/#" ?
                                                                <a style={{
                                                                    color: visibleSubMenu ? "white" : "#ffffff82"
                                                                }} href={primeiraRota.link}>{primeiraRota.label}</a>
                                                                : primeiraRota.label}

                                                        </li>

                                                        {(primeiraRota.visible && primeiraRota.rotas && primeiraRota.rotas.length > 0) && (
                                                            <>
                                                                <ul className={style.segundoSubMenu} >
                                                                    {primeiraRota.rotas.map((segundaRota, index) => {
                                                                        const visibleSubMenu = validateModulo({ text: segundaRota.text })

                                                                        return (
                                                                            <li key={index} >
                                                                                {segundaRota.rotas && (
                                                                                    <a style={{
                                                                                        color: visibleSubMenu ? "white" : "#ffffff82"
                                                                                    }} href={visibleSubMenu ? segundaRota.rotas[0].link : undefined}>{segundaRota.label}</a>
                                                                                )}

                                                                            </li>
                                                                        )
                                                                    })}
                                                                </ul>
                                                            </>
                                                        )}

                                                    </ul>
                                                )
                                            })}
                                        </ul>
                                    )}

                                </li>
                            )
                        })
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
