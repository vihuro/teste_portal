import style from "./style.module.css";
import { CircleLoader } from "react-spinners";

export default function Loading() {
    return (

        <div>
            <CircleLoader
                color="#36d7b7"
                size={100}
            />
        </div>
    )

}

