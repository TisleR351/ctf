import React, { HTMLAttributes } from "react";
import "./displayInteractive.css";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MessageEnums } from "@/utils/enums/MessageEnums";

interface DisplayProps extends HTMLAttributes<HTMLDivElement> {
  label?: string;
  value?: string | number;
  teamId: string;
  type: MessageEnums;
  icon: IconProp;
  className?: string;
  onClick?: () => void;
}

export default function DisplayInteractive({
  label,
  value,
  onClick,
  icon,
  type,
  className,
}: DisplayProps) {
  return (
    <div className={`display-interactive-container ${className}`}>
      {label && <div className="display-interactive-label">{label}</div>}
      <div className={`display-interactive-content ${className}`.trim()}>
        {value && <div className="display-interactive-value">{value}</div>}
        <button
          className={`display-interactive-button-${type}`}
          onClick={onClick}
        >
          <FontAwesomeIcon icon={icon} />
        </button>
      </div>
    </div>
  );
}
