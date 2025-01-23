"use client";

import "./joinTeamModal.css";
import React, { useState } from "react";
import MainInput from "@/components/main-input/mainInput";
import MainButton from "@/components/main-button/mainButton";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { Message } from "@/components/message/message";
import { MessageEnums } from "@/utils/enums/MessageEnums";
import ModalWindow from "@/modules/modal-window/challengeModal";

interface CreateTeamModalProps {
  isOpen: boolean;
  onCloseAction: () => void;
}

export default function JoinTeamModal({
  isOpen,
  onCloseAction,
}: CreateTeamModalProps) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [teamToken, setTeamToken] = useState("");

  const handleSave = async () => {
    setError(null);
    setSuccess(false);

    const token = sessionStorage.getItem("token");
    if (!token) {
      setError("No authentication token found.");
      return;
    }

    try {
      const userResponse = await fetch("/api/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!userResponse.ok) {
        const userError = await userResponse.json();
        setError(userError.error || "Failed to fetch user information.");
        return;
      }

      const userData = await userResponse.json();
      const userId = userData?.user?._id;

      if (!teamToken || !userId) {
        setError("All fields are required.");
        return;
      }

      const teamResponse = await fetch("/api/teams", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          token: teamToken,
          id_user: userId,
        }),
      });

      if (!teamResponse.ok) {
        const teamError = await teamResponse.json();
        setError(teamError.error || "Failed to join the team.");
        return;
      }

      setSuccess(true);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <ModalWindow isOpen={isOpen} onCloseAction={onCloseAction}>
      <div className={"create-team-modal-content"}>
        {error && (
          <Message
            type={MessageEnums.ERROR}
            message={error}
            className={"create-team-error-message"}
          />
        )}
        {success && (
          <Message
            type={MessageEnums.SUCCESS}
            message={`Team joined successfully.`}
            className={"create-team-success-message"}
          />
        )}
        <MainInput
          label={"Team token"}
          type={"text"}
          required={true}
          value={teamToken}
          onChange={(e) => setTeamToken(e.target.value)}
          className={"team-token-input"}
        />
        <MainButton
          icon={faSave}
          label={"Save"}
          onClick={handleSave}
          className={"save-button"}
        />
      </div>
    </ModalWindow>
  );
}
