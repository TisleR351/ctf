import "./menuButton.css";
import { ButtonHTMLAttributes } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface MenuButtonAttributes extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconDefinition;
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
        <FontAwesomeIcon icon={icon} width={40} height={40} />
        {tooltip && <span className="tooltip">{tooltip}</span>}
      </button>
    </Link>
  );
}
