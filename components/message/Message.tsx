import style from "./style.module.css";
import { CiWarning } from "react-icons/ci";
import { BiWindowClose } from "react-icons/bi";
import { MdVerifiedUser } from "react-icons/md";

interface messagePros {
    message: string,
    type: string,
    stateMessage: boolean,
    action: (value: boolean) => void;
}
interface typeColorProps {
    background: string,
    color: string
}


const color: Record<string, typeColorProps> = {
    "WARNING": {
        background: "#ff8800d2",
        color: "#754301"
    },
    "ERROR": {
        background: "#ff0000d2",
        color: "#630303"
    },
    "SUCESS": {
        background: "#00ffa3d2",
        color: "#036310"
    }

}

const Message = (data: messagePros) => {


    return (
        <div className={style.card} style={color[data.type]}>
            <div className={style.section_icon} >
                {data.type === "ERROR" ? <BiWindowClose /> :
                    data.type === "SUCESS" ? <MdVerifiedUser /> :
                        <CiWarning />}

            </div>
            <div className={style.section_text} >
                <span>{data.message}</span>
            </div>
            <div>
                <span
                className={style.button}
                    onClick={() =>
                        data.action(!data.stateMessage)} >
                    x
                </span>
            </div>

        </div>
    )

}

Message.defaultProps = {
    type: "SUCESS",
    message: "Erro inesperado!",
    action: true
}

export default Message