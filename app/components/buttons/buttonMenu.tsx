import "./buttonMenu.css";
import { ButtonHTMLAttributes } from "react";

interface MenuButtonAttributes extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string;
  tooltip?: string;
}

export default function ButtonMenu({
  icon,
  tooltip,
  ...props
}: MenuButtonAttributes) {
  return (
    <>
      <button className="button-menu" {...props}>
        <i className={`icon fa ${icon}`}></i>
        {tooltip && <span className="tooltip">{tooltip}</span>}
      </button>
    </>
  );
}
