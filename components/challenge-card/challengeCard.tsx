"use client";
import "./challengeCard.css";
import React, { HTMLAttributes, useEffect, useState } from "react";
import ChallengeModal from "@/modules/challenge-modal/challengeModal";
import { Challenge } from "@/utils/types/challenge";
import { useUser } from "@/utils/contexts/userContext";
import { MessageEnums } from "@/utils/enums/MessageEnums";
import { ChallengeCardTypeEnums } from "@/utils/enums/ChallengeCardEnums";

interface ChallengeCardProps extends HTMLAttributes<HTMLButtonElement> {
  challenge: Challenge;
  className?: string;
}

export default function ChallengeCard({
  challenge,
  className,
  ...props
}: ChallengeCardProps) {
  const { user } = useUser();
  const [type, setType] = React.useState<string>(
    ChallengeCardTypeEnums.PRIMARY,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [attempts, setAttempts] = useState<number>(0);

  useEffect(() => {
    if (user) {
      setType(ChallengeCardTypeEnums.PRIMARY);
      if (user?.team) {
        const triedChallenge = user.team.tried_challenges?.find(
          (c) => c.challenge_id === challenge._id,
        );

        if (triedChallenge) {
          setAttempts(triedChallenge.attempts);
          if (triedChallenge.flag) {
            setType(MessageEnums.SUCCESS);
          }
        }
      }
    }
  }, [user, challenge]);

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
          attempts={attempts}
          setAttemptsAction={setAttempts}
          isOpen={isModalOpen}
          onCloseAction={closeModal}
          challenge={challenge}
        />
      )}
    </>
  );
}
