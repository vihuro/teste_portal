import style from "./style.module.css";

interface props {
    url: string,
    changeToogle: Function
}

export default function Vizualizador({ changeToogle, url }: props) {
    return (
        <div onClick={() => changeToogle(false)}>
            
            <img src={`http://localhost:32769/api/v1/image/${url}`} alt="" />
        </div>
    )
}