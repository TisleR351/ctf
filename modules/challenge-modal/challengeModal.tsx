"use client";

import "./challengeModal.css";

import { Message } from "@/components/message/message";
import { ChallengeFileButton } from "@/components/challenge-file-button/challengeFileButton";
import ChallengeModalForm from "@/components/challenge-modal-form/challengeModalForm";
import React, { HTMLAttributes, useEffect, useState } from "react";
import { MessageEnums } from "@/utils/enums/MessageEnums";
import ModalWindow from "@/modules/modal-window/challengeModal";
import { Challenge } from "@/utils/types/challenge";
import Link from "next/link";

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
  let type;
  let message;
  const [isPartOfTeam, setIsPartOfTeam] = useState(false);
  const [flag, setFlag] = useState("This is the flag");

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const isConnected = !!token;

    if (isConnected) {
      fetch("/api/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch user info.");
          }
          return response.json();
        })
        .then((data) => {
          setIsPartOfTeam(!!data.user.team);
        });
    } else {
      setIsPartOfTeam(false);
    }
  }, []);

  if (isPartOfTeam && flag) {
    type = MessageEnums.SUCCESS;
    message = "You already solved this challenge.";
  } else if (!isPartOfTeam) {
    message =
      "You have to be part of a team before trying to solve a challenge.";
    type = MessageEnums.NEUTRAL;
  }

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
        <strong>Author: </strong>
        {challenge.author}
      </div>
      {type && <Message type={type} message={message} />}
      <div className={"challenge-file-button-link"}>
        <Link href={`/challenge-directory/${challenge.file_url}`}>
          <ChallengeFileButton isPartOfTeam={isPartOfTeam} />
        </Link>
      </div>
      <ChallengeModalForm flag={flag} isPartOfTeam={isPartOfTeam} />
    </ModalWindow>
  );
}
