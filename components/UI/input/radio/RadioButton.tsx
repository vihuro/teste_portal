import { InputHTMLAttributes } from "react";
import style from "./style.module.css";

type radioProps = {
  text?: string;
  color: string;
  id: string;
} & InputHTMLAttributes<HTMLInputElement>;

function Radio({ text, id, color, ...res }: radioProps) {

  return (
    <section className={style.containerRadio}>
      <input
        id={id}
        type="radio"
        className={`${style.input} ${style[`--${color}`]}`}
        {...res}
      />
      {text && (
        <label
          
          className={`${style.label} ${style[`--${color}`]}`}
          htmlFor={id}
        >
          {text}
        </label>
      )}
    </section>
  );
}

export default function RadioButton() {
  return {
    Radio,
  };
}
