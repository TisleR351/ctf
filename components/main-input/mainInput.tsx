import "./mainInput.css";
import { InputHTMLAttributes } from "react";

interface MainInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
}

export default function MainInput({
  className,
  label,
  ...props
}: MainInputProps) {
  return (
    <div className={`main-input-container ${className || ""}`.trim()}>
      {label && <label>{label}</label>}
      <input className={"main-input"} {...props} />
    </div>
  );
}
