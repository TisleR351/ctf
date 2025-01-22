"use client";
import "./mainButton.css";
import { ButtonHTMLAttributes } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface LoginMenuButtonAttributes
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconDefinition;
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
        <FontAwesomeIcon
          icon={icon}
          width={40}
          height={40}
          className={"main-button-icon"}
        />
        <div>{label}</div>
      </button>
    </div>
  );
}
