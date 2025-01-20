import "./challengeModalForm.css";
import { HTMLAttributes } from "react";
import MainInput from "@/components/main-input/mainInput";

interface ChallengeModalFormProps extends HTMLAttributes<HTMLFormElement> {
  className?: string;
  flag?: string;
  isConnected: boolean;
}

export default function ChallengeModalForm({
  className,
  isConnected,
  flag,
  ...props
}: ChallengeModalFormProps) {
  return (
    <form
      className={`challenge-modal-form-container ${className || ""}`.trim()}
      {...props}
    >
      <MainInput
        type={"text"}
        disabled={!isConnected || !!flag}
        placeholder={flag && flag}
      />
      <button
        type={"submit"}
        className={"challenge-form-submit-button"}
        disabled={!isConnected || !!flag}
      >
        Submit flag
      </button>
    </form>
  );
}
