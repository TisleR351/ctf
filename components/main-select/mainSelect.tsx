import "./mainSelect.css";
import { SelectHTMLAttributes } from "react";

interface MainSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  className?: string;
  options: { value: string; label: string }[];
}

export default function MainSelect({
  className,
  label,
  options,
  ...props
}: MainSelectProps) {
  return (
    <div className={`main-select-container ${className || ""}`.trim()}>
      {label && <label>{label}</label>}
      <select className="main-select" {...props}>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
