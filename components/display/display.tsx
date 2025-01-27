import React, { HTMLAttributes } from "react";
import "./display.css";

interface DisplayProps extends HTMLAttributes<HTMLDivElement> {
  label?: string;
  value: string | number;
  className?: string;
}

export default function Display({ label, value, className }: DisplayProps) {
  return (
    <div className={`display-container ${className}`}>
      {label && <div className="display-label">{label}</div>}
      <div className={`display-content ${className}`.trim()}>
        <div className="display-value">{value}</div>
      </div>
    </div>
  );
}
