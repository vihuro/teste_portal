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
                        text: "Estoque Fábrica",
                        label: "Estoque",
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
                        text: "ESTOQUE MATRIZ TABELA",
                        label: "ESTOQUE GRM",
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
                        text: "ESTOQUE MATRIZ",
                        label: "BI GRM",
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
                text: "Manutenção Fábrica",
                label: "Fábrica",
                visible: false,
                rotas: [
                    {
                        text: "BI",
                        label:"BI",
                        rotas: [{
                            text: "",
                            visible: false,
                            link: "/manutencao/bi"
                        }]
                    },
                    {
                        text: "OS",
                        label:"OS",
                        rotas: [{
                            text: "",
                            visible: false,
                            link: "/manutencao"

                        }]
                    }
                ]
            },
            {
                text: "Assistência Matriz",
                label: "Matriz",
                visible: false,
                rotas: [
                    {
                        text: "BI ASSISTEC GEREAL",
                        label: "BI",
                        rotas: [
                            {
                                text: "",
                                visible: false,
                                link: "/assistencia-tecnica/bi"
                            }
                        ]
                    },
                    {
                        text: "ORÇAMENTO ASSITEC",
                        label: "ORÇAMENTOS",
                        rotas: [
                            {
                                text: "",
                                visible: false,
                                link: "/assistencia-tecnica/orcamento"
                            }
                        ]
                    },
                    {
                        text: "CLIENTE ASSITEC",
                        label: "CLIENTE",
                        rotas: [
                            {
                                text: "",
                                visible: false,
                                link: "/assistencia-tecnica/cliente"
                            }
                        ]
                    },
                    {
                        text: "PEÇAS ASSISTEC",
                        label: "PEÇAS",
                        rotas: [
                            {
                                text: "",
                                visible: false,
                                link: "/assistencia-tecnica/pecas"
                            }
                        ]
                    },
                    {
                        text: "MÁQUINAS ASSISTEC",
                        label: "MÁQUINAS",
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
                label: "Usuários",
                text: "Usuários Gerencial",
                link: "/gerencial/login"
            },
            {
                label: "Regras",
                text: "Regras",
                link: "/#"
            },
            {
                label: "Estoque",
                text: "Estoque Gerencial",
                visible: false,
                rotas: [
                    {
                        label: "Estoque Matriz Gerencial",
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