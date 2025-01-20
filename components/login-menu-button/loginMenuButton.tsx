"use client";
import "./loginMenuButton.css";
import { ButtonHTMLAttributes } from "react";
import Link from "next/link";

interface LoginMenuButtonAttributes
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string;
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
        <i className={`login-menu-button-icon icon fa ${icon}`}></i>
        <div>{label}</div>
      </button>
    </Link>
  );
}
