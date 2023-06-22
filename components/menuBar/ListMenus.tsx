import { BsBoxes } from "react-icons/bs";
import { FaServer, FaTruck } from "react-icons/fa";
import { MdOutlineEngineering } from "react-icons/md";

const List = [
    {
        class: "row_active",
        text: "ESTOQUE",
        link: "/estoque",
        icon: <BsBoxes />,
        rotas: []
    },
    {
        class: "row",
        text: "EXPEDIÇÃO",
        link: "/#",
        icon: <FaTruck />,
        rotas: []
    },
    {
        class: "row",
        text: "PRODUÇÃO",
        link: "/#",
        icon: <FaServer />,
        rotas: []
    },
    {
        class: "row",
        text: "GERENCIAL",
        link: "/#",
        icon: <MdOutlineEngineering />,
        rotas: []
    }
]

interface ListMenusProps {
    id: number
}


export function ListMenus() {
    return {
        List
    }
}