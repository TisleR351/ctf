"use client";

import "./challengeModal.css";

import { Message } from "@/components/message/message";
import { ChallengeFileButton } from "@/components/challenge-file-button/challengeFileButton";
import ChallengeModalForm from "@/components/challenge-modal-form/challengeModalForm";
import React, { HTMLAttributes, useState } from "react";
import { MessageEnums } from "@/public/enums/MessageEnums";
import ModalWindow from "@/modules/modal-window/challengeModal";

interface ChallengeModalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onCloseAction: () => void;
}

export default function ChallengeModal({
  isOpen,
  onCloseAction,
}: ChallengeModalProps) {
  let type;
  let message;
  const [isConnected, setIsConnected] = useState(true);
  const [flag, setFlag] = useState("This is the flag");

  if (isConnected && flag) {
    type = MessageEnums.SUCCESS;
    message = "You already solved this challenge.";
  } else if (!isConnected) {
    message = "You have to login before trying to solve a challenge.";
    type = MessageEnums.NEUTRAL;
  }
  return (
    <ModalWindow isOpen={isOpen} onCloseAction={onCloseAction}>
      <div className="challenge-modal-content-title">The lost park</div>
      <div className="challenge-modal-content-credits">75 pts</div>
      <div className="challenge-modal-content-description">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
        pulvinar, purus vitae cursus sollicitudin, enim erat bibendum sapien, at
        tincidunt massa purus eget nulla. Nullam auctor purus sit amet neque
        efficitur facilisis. Donec id purus facilisis, dapibus mi et, suscipit
        metus. Etiam maximus ipsum odio, non sodales arcu rhoncus ut. Donec sit
        amet neque eleifend lectus commodo mattis eget id nibh. Aenean eget
        cursus lectus, feugiat interdum ex. Vestibulum ante ipsum primis in
        faucibus nec.
      </div>
      <div className="challenge-modal-content-author">
        <strong>Author: </strong>TisleR351
      </div>
      {type && <Message type={type} message={message} />}
      <ChallengeFileButton isConnected={isConnected} />
      <ChallengeModalForm flag={flag} isConnected={isConnected} />
    </ModalWindow>
  );
}
