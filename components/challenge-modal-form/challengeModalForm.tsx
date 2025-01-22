import "./challengeModalForm.css";
import { HTMLAttributes } from "react";
import MainInput from "@/components/main-input/mainInput";

interface ChallengeModalFormProps extends HTMLAttributes<HTMLFormElement> {
  className?: string;
  flag?: string;
  isPartOfTeam: boolean;
}

export default function ChallengeModalForm({
  className,
  isPartOfTeam,
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
        disabled={!isPartOfTeam || !!flag}
        placeholder={flag && flag}
        className={"challenge-modal-form-flag-input"}
      />
      <button
        type={"submit"}
        className={"challenge-form-submit-button"}
        disabled={!isPartOfTeam || !!flag}
      >
        Submit flag
      </button>
    </form>
  );
}
