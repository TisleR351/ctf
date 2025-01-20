import "./mainTextArea.css";
import { TextareaHTMLAttributes } from "react";

interface MainInputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  className?: string;
}

export default function MainTextArea({
  className,
  label,
  ...props
}: MainInputProps) {
  return (
    <div className={`main-text-area-container ${className || ""}`.trim()}>
      {label && <label>{label}</label>}
      <textarea className={"main-text-area"} {...props} />
    </div>
  );
}
