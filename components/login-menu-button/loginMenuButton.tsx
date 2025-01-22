"use client";
import "./loginMenuButton.css";
import { ButtonHTMLAttributes } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface LoginMenuButtonAttributes
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconDefinition;
  label: string;
  href: string;
  className?: string;
}

export default function LoginMenuButton({
  icon,
  label,
  className,
  href,
  ...props
}: LoginMenuButtonAttributes) {
  return (
    <Link href={href} className={"login-menu-link"}>
      <button
        className={`login-menu-button ${className || ""}`.trim()}
        {...props}
      >
        <FontAwesomeIcon
          icon={icon}
          width={30}
          height={30}
          className={"login-menu-button-icon"}
        />
        <div>{label}</div>
      </button>
    </Link>
  );
}
