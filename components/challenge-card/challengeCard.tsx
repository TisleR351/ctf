"use client";
import "./challengeCard.css";
import { HTMLProps, useState } from "react";
import { ChallengeCardTypeEnums } from "@/public/enums/ChallengeCardEnums";
import ChallengeModal from "@/modules/challenge-modal/challengeModal";

interface ChallengeCardProps extends HTMLProps<HTMLButtonElement> {
  type: ChallengeCardTypeEnums;
  className?: string;
}

export default function ChallengeCard({
  type,
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
        <div className="challenge-card-title">The lost park</div>
        <div className="challenge-card-credits">75 pts</div>
      </button>

      {isModalOpen && (
        <ChallengeModal isOpen={isModalOpen} onCloseAction={closeModal} />
      )}
    </>
  );
}
