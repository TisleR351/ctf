import "./signupFormInput.css";
import { InputHTMLAttributes, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

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
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className={`signup-form-group-input ${className}`.trim()}>
      <label>{label}</label>
      <div className="input-wrapper">
        <input
          type={type === "password" && !showPassword ? "password" : "text"}
          className={`signup-form-input ${className}`}
          {...props}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="toggle-password-btn"
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </button>
        )}
      </div>
    </div>
  );
}
