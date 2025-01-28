import "./challengeModalForm.css";
import {
  Dispatch,
  FormEvent,
  HTMLAttributes,
  SetStateAction,
  useState,
} from "react";
import MainInput from "@/components/main-input/mainInput";
import { Message } from "@/components/message/message";
import { MessageEnums } from "@/utils/enums/MessageEnums";

interface ChallengeModalFormProps extends HTMLAttributes<HTMLFormElement> {
  setNumberAttempts: Dispatch<SetStateAction<number>>;
  numberAttempts: number;
  className?: string;
  challenge_id: string;
  flag?: string;
  isPartOfTeam: boolean;
}

export default function ChallengeModalForm({
  className,
  numberAttempts,
  setNumberAttempts,
  isPartOfTeam,
  challenge_id,
  flag,
  ...props
}: ChallengeModalFormProps) {
  const [attempt, setAttempt] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const token = sessionStorage.getItem("token");

    if (!token) {
      setErrorMessage("Token not found.");
      return;
    }

    const requestBody = {
      attempt,
      challenge_id,
    };

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/flag", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (response.ok) {
        window.location.reload();
      } else {
        setErrorMessage(data.error || data.message || "An error occurred.");
      }
    } catch (error) {
      setErrorMessage(`${error}`);
    } finally {
      setNumberAttempts(numberAttempts + 1);
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form
        className={`challenge-modal-form-container ${className || ""}`.trim()}
        onSubmit={handleSubmit}
        {...props}
      >
        <MainInput
          type="text"
          disabled={!isPartOfTeam || !!flag}
          placeholder={flag && flag}
          className="challenge-modal-form-flag-input"
          value={attempt}
          onChange={(e) => setAttempt(e.target.value)}
        />
        <button
          type="submit"
          className="challenge-form-submit-button"
          disabled={!isPartOfTeam || !!flag || isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit flag"}
        </button>
      </form>

      {errorMessage && (
        <Message type={MessageEnums.ERROR} message={errorMessage} />
      )}
    </>
  );
}
