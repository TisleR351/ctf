"use client";
import "./challengeCard.css";
import { HTMLAttributes, useState } from "react";
import { ChallengeCardTypeEnums } from "@/utils/enums/ChallengeCardEnums";
import ChallengeModal from "@/modules/challenge-modal/challengeModal";
import { Challenge } from "@/utils/types/challenge";

interface ChallengeCardProps extends HTMLAttributes<HTMLButtonElement> {
  challenge: Challenge;
  type: ChallengeCardTypeEnums;
  className?: string;
}

export default function ChallengeCard({
  type,
  challenge,
  className,
  ...props
}: ChallengeCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        className={`challenge-card bg-${type} ${className || ""}`.trim()}
        {...props}
        onClick={handleCardClick}
      >
        <div className="challenge-card-title">{challenge.name}</div>
        <div className="challenge-card-credits">{challenge.points}</div>
      </button>

      {isModalOpen && (
        <ChallengeModal
          isOpen={isModalOpen}
          onCloseAction={closeModal}
          challenge={challenge}
        />
      )}
    </>
  );
}
