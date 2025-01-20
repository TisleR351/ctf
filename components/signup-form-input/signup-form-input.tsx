import "./signup-form-input.css";

import { HTMLAttributes } from "react";

interface SignupFormInputProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  label: string;
  type?: string;
}

export default function SignupFormInput({
  className,
  label,
  type,
  ...props
}: SignupFormInputProps) {
  return (
    <div className={`signup-form-group-input ${className}`.trim()} {...props}>
      <label htmlFor={`signup-form-${type}-input`}>{label}</label>
      <input
        id={`signup-form-${type}-input`}
        type={type}
        className={"signup-form-input"}
      />
    </div>
  );
}
