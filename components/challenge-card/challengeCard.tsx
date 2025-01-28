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
    ChallengeCardTypeEnums.NEUTRAL,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      setType(ChallengeCardTypeEnums.PRIMARY);
      if (user?.team) {
        const triedChallenge = user.team.tried_challenges?.find(
          (c) => c.challenge_id === challenge._id,
        );

        if (triedChallenge) {
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
          isOpen={isModalOpen}
          onCloseAction={closeModal}
          challenge={challenge}
        />
      )}
    </>
  );
}
