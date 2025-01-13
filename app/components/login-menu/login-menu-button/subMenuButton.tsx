"use client";
import "./subMenuButton.css";
import { ButtonHTMLAttributes } from "react";
import Link from "next/link";

interface MenuButtonAttributes extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string;
  label: string;
  href: string;
  className?: string;
}

export default function SubMenuButton({
  icon,
  label,
  className,
  href,
  ...props
}: MenuButtonAttributes) {
  return (
    <Link href={href} className={"sub-menu-link"}>
      <button
        className={`sub-menu-button ${className || ""}`.trim()}
        {...props}
      >
        <i className={`sub-menu-button-icon icon fa ${icon}`}></i>
        <div>{label}</div>
      </button>
    </Link>
  );
}
