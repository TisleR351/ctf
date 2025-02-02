"use client";

import "./challengeModal.css";

import { Message } from "@/components/message/message";
import { ChallengeFileButton } from "@/components/challenge-file-button/challengeFileButton";
import ChallengeModalForm from "@/components/challenge-modal-form/challengeModalForm";
import React, {Dispatch, HTMLAttributes, SetStateAction, useEffect, useState} from "react";
import ModalWindow from "@/modules/modal-window/challengeModal";
import { Challenge } from "@/utils/types/challenge";
import Link from "next/link";
import { useUser } from "@/utils/contexts/userContext";
import { MessageEnums } from "@/utils/enums/MessageEnums";

interface ChallengeModalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onCloseAction: () => void;
  challenge: Challenge;
  attempts: number;
  setAttemptsAction: Dispatch<SetStateAction<number>>;
}

export default function ChallengeModal({
  isOpen,
  attempts,
  onCloseAction,
  challenge,
}: ChallengeModalProps) {
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
        <div><strong>Solves : </strong>{challenge.teamsSucceededCount}</div>
        <div><strong>Percentage : </strong>{challenge.successPercentage}%</div>
      {/*{type && <Message type={type} message={message} time={20000} />}*/}
      {/*<div className={"challenge-file-button-link"}>*/}
      {/*  <Link href={`/challenge-directory/${challenge.file_url}`}>*/}
      {/*    <ChallengeFileButton isPartOfTeam={isPartOfTeam} label={challenge.file_url}/>*/}
      {/*  </Link>*/}
      {/*</div>*/}
      {/*<ChallengeModalForm*/}
      {/*  numberAttempts={attempts}*/}
      {/*  setNumberAttempts={setAttemptsAction}*/}
      {/*  challenge_id={`${challenge._id}`}*/}
      {/*  flag={flag}*/}
      {/*  isPartOfTeam={isPartOfTeam}*/}
      {/*/>*/}
    </ModalWindow>
  );
}
