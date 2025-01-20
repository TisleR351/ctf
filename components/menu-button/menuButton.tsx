import "./menuButton.css";
import { ButtonHTMLAttributes } from "react";
import Link from "next/link";

interface MenuButtonAttributes extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string;
  href: string;
  tooltip?: string;
  className?: string;
}

export default function MenuButton({
  icon,
  tooltip,
  className,
  href,
  ...props
}: MenuButtonAttributes) {
  return (
    <Link href={href} className={"menu-button-link"}>
      <button className={`menu-button ${className || ""}`.trim()} {...props}>
        <i className={`icon fa ${icon}`}></i>
        {tooltip && <span className="tooltip">{tooltip}</span>}
      </button>
    </Link>
  );
}
