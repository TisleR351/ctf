"use client";
import "./mainButton.css";
import { ButtonHTMLAttributes } from "react";

interface LoginMenuButtonAttributes
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string;
  label: string;
  className?: string;
}

export default function MainButton({
  icon,
  label,
  className,
  ...props
}: LoginMenuButtonAttributes) {
  return (
    <div className="main-button-container">
      <button className={`main-button ${className || ""}`.trim()} {...props}>
        <i className={`main-button-icon icon fa ${icon}`}></i>
        <div>{label}</div>
      </button>
    </div>
  );
}
