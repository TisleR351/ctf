import "./signupFormInput.css";

import { InputHTMLAttributes } from "react";

interface SignupFormInputProps extends InputHTMLAttributes<HTMLInputElement> {
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
    <div className={`signup-form-group-input ${className}`.trim()}>
      <label>{label}</label>
      <input
        type={type}
        className={`signup-form-input ${className}`}
        {...props}
      />
    </div>
  );
}
