import { BsBoxes } from "react-icons/bs";
import { FaServer, FaTruck } from "react-icons/fa";
import { MdOutlineEngineering } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";

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



const List = [
    {
        class: "row_active",
        text: "ESTOQUE",
        link: "/#",
        visible: false,
        icon: <BsBoxes />,
        rotas: [
            {
                text: "Fábrica",
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
                text: "Matriz",
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
] as listMenusProps[]



export function ListMenus() {
    return {
        List
    }
}