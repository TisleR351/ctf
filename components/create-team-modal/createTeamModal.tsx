"use client";

import "./createTeamModal.css";
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

export default function CreateTeamModal({
  isOpen,
  onCloseAction,
}: CreateTeamModalProps) {
  const [teamName, setTeamName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [teamToken, setTeamToken] = useState(false);

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

      if (!teamName || !userId) {
        setError("All fields are required.");
        return;
      }

      // Save team
      const teamResponse = await fetch("/api/teams", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: teamName,
          id_user: userId,
        }),
      });

      if (!teamResponse.ok) {
        const teamError = await teamResponse.json();
        setError(teamError.error || "Failed to create team.");
        return;
      }

      const data = await teamResponse.json();

      setTeamToken(data.token);
      setSuccess(true);
      setTeamName("");
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
            message={`Team created successfully.\n \n Please copy this token and send it to your mates in order to make them join your team!\n \n {${teamToken}}`}
            className={"create-team-success-message"}
          />
        )}
        <MainInput
          label={"Team name"}
          type={"text"}
          required={true}
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          className={"team-name-input"}
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
