"use client";

import "./challengeModal.css";

import { Message } from "@/components/message/message";
import { ChallengeFileButton } from "@/components/challenge-file-button/challengeFileButton";
import ChallengeModalForm from "@/components/challenge-modal-form/challengeModalForm";
import React, { HTMLAttributes, useEffect, useState } from "react";
import ModalWindow from "@/modules/modal-window/challengeModal";
import { Challenge } from "@/utils/types/challenge";
import Link from "next/link";
import { useUser } from "@/utils/contexts/userContext";
import { MessageEnums } from "@/utils/enums/MessageEnums";

interface ChallengeModalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onCloseAction: () => void;
  challenge: Challenge;
}

export default function ChallengeModal({
  isOpen,
  onCloseAction,
  challenge,
}: ChallengeModalProps) {
  const { user } = useUser();
  const [isPartOfTeam, setIsPartOfTeam] = useState<boolean>(false);
  const [attempts, setAttempts] = useState<number>(0);
  const [flag, setFlag] = useState<undefined | string>(undefined);
  const [type, setType] = useState<MessageEnums>();
  const [message, setMessage] = useState<string>();

  useEffect(() => {
    if (user?.team) {
      setIsPartOfTeam(true);

      const triedChallenge = user.team.tried_challenges?.find(
        (c) => c.challenge_id === challenge._id,
      );

      if (triedChallenge) {
        setAttempts(triedChallenge.attempts);
        if (triedChallenge.flag) {
          setFlag(triedChallenge.flag);
          setType(MessageEnums.SUCCESS);
          setMessage("Congratulations, you already solved this challenge!");
        } else {
          setFlag(undefined);
        }
      }
    } else {
      setIsPartOfTeam(false);
      setType(MessageEnums.NEUTRAL);
      setMessage(
        "You must be part of a team to participate in this challenge.",
      );
    }
  }, [user, challenge]);
  return (
    <ModalWindow isOpen={isOpen} onCloseAction={onCloseAction}>
      <div className="challenge-modal-content-title">{challenge.name}</div>
      <div className="challenge-modal-content-credits">{challenge.points}</div>
      <div className="challenge-modal-content-description">
        {challenge.description.split("\n").map((line, index) => (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </div>
      <div className="challenge-modal-content-author">
        <div>
          <strong>author: </strong>
          {challenge.author}
        </div>
        <div>
          <strong>attempts: </strong>
          {attempts}
        </div>
      </div>
      {type && <Message type={type} message={message} time={20000} />}
      <div className={"challenge-file-button-link"}>
        <Link href={`/challenge-directory/${challenge.file_url}`}>
          <ChallengeFileButton isPartOfTeam={isPartOfTeam} />
        </Link>
      </div>
      <ChallengeModalForm
        numberAttempts={attempts}
        setNumberAttempts={setAttempts}
        challenge_id={`${challenge._id}`}
        flag={flag}
        isPartOfTeam={isPartOfTeam}
      />
    </ModalWindow>
  );
}
