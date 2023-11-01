import styles from "./style.module.css";


export default function Card({ text }: { text: string }) {

    const textInLine = text ? text.split("\n") : [""];

    return (
        <div className={styles.card} >
            <div>
                <ul>
                    {textInLine.length > 0 && (
                        textInLine.map((item, index) => (
                            item !== "" && (
                                <li key={index} >{item}</li>
                            )
                        ))
                    )}
                </ul>
                {/* <textarea  >
                    {text}
                </textarea> */}
            </div>
        </div>
    )
}