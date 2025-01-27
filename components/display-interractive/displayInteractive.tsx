import React, { HTMLAttributes } from "react";
import "./displayInteractive.css";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface DisplayProps extends HTMLAttributes<HTMLDivElement> {
  label?: string;
  value: string | number;
  teamId: string;
  icon: IconProp;
  className?: string;
  onClick?: () => void;
}

export default function DisplayInteractive({
  label,
  value,
  onClick,
  icon,
  className,
}: DisplayProps) {
  return (
    <div className={`display-interactive-container ${className}`.trim()}>
      {label && <div className="display-interactive-label">{label}</div>}
      <div className="display-interactive-value">{value}</div>
      <button className={"display-interactive-button"} onClick={onClick}>
        <FontAwesomeIcon icon={icon} />
      </button>
    </div>
  );
}
