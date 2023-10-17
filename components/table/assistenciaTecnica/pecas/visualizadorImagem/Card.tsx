import { Url } from "../../../../utils/Url";
import style from "./style.module.css";


interface props {
    changeToogle: Function,
    image: string
}

const url = Url.PECA_ASSISTENCIA_TECNICA.URL


export default function Card({ changeToogle, image }: props) {

    return (
        <div className={style.card}
            tabIndex={0}
            onClick={() => changeToogle(false)}
            onKeyDown={(e) => {
                if (e.key === "Escape") {
                    changeToogle(false)
                }

            }} >
            {image && (

                <img src={`${url}/${image}`} alt="" />
            )}
        </div>
    )
}