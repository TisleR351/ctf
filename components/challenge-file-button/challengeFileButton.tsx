import "./challengeFileButton.css";
import { HTMLAttributes } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileZipper } from "@fortawesome/free-solid-svg-icons";

interface ChallengeFileButtonProps extends HTMLAttributes<HTMLButtonElement> {
  className?: string;
  label?: string;
  isPartOfTeam: boolean;
}

export function ChallengeFileButton({
  className,
  label,
  isPartOfTeam,
  ...props
}: ChallengeFileButtonProps) {
  return (
    <button
      className={`challenge-file-button ${className || ""}`.trim()}
      disabled={!isPartOfTeam || label === "N/A"}
      {...props}
    >
      <FontAwesomeIcon
        icon={faFileZipper}
        width={30}
        height={30}
        className={"login-menu-button-icon"}
      />
      {!!label && label}
    </button>
  );
}
