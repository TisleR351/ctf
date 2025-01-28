import "./challengeFileButton.css";
import { HTMLAttributes } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileZipper } from "@fortawesome/free-solid-svg-icons";

interface ChallengeFileButtonProps extends HTMLAttributes<HTMLButtonElement> {
  className?: string;
  isPartOfTeam: boolean;
}

export function ChallengeFileButton({
  className,
  isPartOfTeam,
  ...props
}: ChallengeFileButtonProps) {
  return (
    <button
      className={`challenge-file-button ${className || ""}`.trim()}
      disabled={!isPartOfTeam}
      {...props}
    >
      <FontAwesomeIcon
        icon={faFileZipper}
        width={30}
        height={30}
        className={"login-menu-button-icon"}
      />
      FileName.zip
    </button>
  );
}
