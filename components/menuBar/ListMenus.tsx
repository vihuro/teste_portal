import { BsBoxes } from "react-icons/bs";
import { FaServer, FaTruck } from "react-icons/fa";
import { MdOutlineEngineering } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsTools } from "react-icons/bs";
import { IListMenusProps } from "./sideBar/IProps";




const List = [
    {
        class: "row_active",
        text: "ESTOQUE",
        link: "/#",
        visible: false,
        icon: <BsBoxes />,
        rotas: [
            {
                text: "Estoque Fábrica",
                label: "Fábrica",
                visible: false,
                rotas: [
                    {
                        text: "Fábrica",
                        visible: false,
                        rotas: [
                            {
                                text: "",
                                link: "/#",
                            }
                        ]
                    }
                ],
                link: "/#"
            },
            {
                text: "Estoque Matriz",
                label: "Matriz",
                visible: false,
                rotas: [
                    {
                        text: "Estoque grm",
                        visible: false,
                        rotas: [
                            {
                                text: "",
                                link: "/estoque/matriz/grm",
                                visible: false
                            }
                        ]
                    },
                    {
                        text: "BI grm",
                        visible: false,
                        rotas: [
                            {
                                text: "",
                                link: "/estoque/matriz/grm/bi",
                                visible: false
                            }
                        ]
                    }
                ],
                link: "/#"
            }
        ]
    },
    {
        class: "row",
        text: "EXPEDIÇÃO",
        link: "/#",
        visible: false,
        icon: <FaTruck />,
        rotas: []
    },
    {
        class: "row",
        text: "PRODUÇÃO",
        link: "/#",
        visible: false,
        icon: <FaServer />,
        rotas: []
    },
    {
        class: "row",
        text: "COMPRAS",
        link: "/#",
        visible: false,
        icon: <AiOutlineShoppingCart />,
        rotas: []
    },
    {
        class: "row",
        text: "ASSISTÊNCIA TÉCNICA",
        link: "/#",
        visible: false,
        icon: <BsTools />,
        rotas: [
            {
                label: "Manutenção Fábrica",
                text: "Fábrica",
                visible: false,
                rotas: [
                    {
                        text: "BI",
                        rotas: [{
                            text: "",
                            visible: false,
                            link: "/manutencao/bi"
                        }]
                    },
                    {
                        text: "OS",
                        rotas: [{
                            text: "",
                            visible: false,
                            link: "/manutencao"

                        }]
                    }
                ]
            },
            {
                label: "Assistencia Matriz",
                text: "Matriz",
                visible: false,
                rotas: [
                    {
                        text: "BI",
                        rotas: [
                            {
                                text: "",
                                visible: false,
                                link: "/assistencia-tecnica/bi"
                            }
                        ]
                    },
                    {
                        text: "ORÇAMENTOS",
                        rotas: [
                            {
                                text: "",
                                visible: false,
                                link: "/assistencia-tecnica/orcamento"
                            }
                        ]
                    },
                    {
                        text: "CLIENTE",
                        rotas: [
                            {
                                text: "",
                                visible: false,
                                link: "/assistencia-tecnica/cliente"
                            }
                        ]
                    },
                    {
                        text: "PEÇAS",
                        rotas: [
                            {
                                text: "",
                                visible: false,
                                link: "/assistencia-tecnica/pecas"
                            }
                        ]
                    },
                    {
                        text: "MÁQUINAS",
                        rotas: [
                            {
                                text: "",
                                visible: false,
                                link: "/assistencia-tecnica/maquina"
                            }
                        ]
                    }
                ]
            }
        ]

    },
    {
        class: "row",
        text: "GERENCIAL",
        link: "/#",
        visible: false,
        icon: <MdOutlineEngineering />,
        rotas: [
            {
                text: "Usuários",
                link: "/gerencial/login"
            },
            {
                text: "Regras",
                link: "/#"
            },
            {
                text: "Estoque",
                visible: false,
                rotas: [
                    {
                        text: "Estoque Matriz grm",
                        visible: false,
                        rotas: [
                            {
                                text: "",
                                link: "/gerencial/estoque/matriz/grm",
                                visible: false
                            }
                        ]
                    }
                ],
                link: "/#"
            },
        ]
    }
] as IListMenusProps[]



export { List }