import "./buttonMenu.css";
import { ButtonHTMLAttributes } from "react";

interface MenuButtonAttributes extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string;
}

export default function ButtonMenu({ icon, ...props }: MenuButtonAttributes) {
  return (
    <button className="button-menu" {...props}>
      <i className={`icon fa ${icon}`}></i>
    </button>
  );
}
