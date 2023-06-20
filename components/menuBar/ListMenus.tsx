import { BsBoxes } from "react-icons/bs";
import { FaServer, FaTruck } from "react-icons/fa";
import { MdOutlineEngineering } from "react-icons/md";

const List = [
    {
        class: "row_active",
        text: "ESTOQUE",
        icon: <BsBoxes />,
        rotas: []
    },
    {
        class: "row",
        text: "EXPEDIÇÃO",
        icon: <FaTruck />,
        rotas: []
    },
    {
        class: "row",
        text: "PRODUÇÃO",
        icon: <FaServer />,
        rotas: []
    },
    {
        class: "row",
        text: "GERENCIAL",
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