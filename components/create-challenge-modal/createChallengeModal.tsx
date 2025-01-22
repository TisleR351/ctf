"use client";

import "./createChallengeModal.css";
import React, { useState } from "react";
import ModalWindow from "@/modules/modal-window/challengeModal";
import MainInput from "@/components/main-input/mainInput";
import MainTextArea from "@/components/main-text-area/mainTextArea";
import MainButton from "@/components/main-button/mainButton";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import MainSelect from "@/components/main-select/mainSelect";
import { Message } from "@/components/message/message";
import { MessageEnums } from "@/utils/enums/MessageEnums";

interface CreateChallengeModalProps {
  isOpen: boolean;
  onCloseAction: () => void;
}

export default function CreateChallengeModal({
  isOpen,
  onCloseAction,
}: CreateChallengeModalProps) {
  const [title, setTitle] = useState("");
  const [credits, setCredits] = useState(100);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Hardware");
  const [fileUrl, setFileUrl] = useState("");
  const [flag, setFlag] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const options = [
    { value: "Hardware", label: "Hardware" },
    { value: "Cryptography", label: "Cryptography" },
    { value: "OSINT", label: "OSINT" },
    { value: "Web", label: "Web" },
    { value: "Forensic", label: "Forensic" },
    { value: "Steganography", label: "Steganography" },
    { value: "Miscellaneous", label: "Miscellaneous" },
  ];

  const handleSave = async () => {
    setError(null);
    setSuccess(false);

    if (!title || !credits || !description || !category || !fileUrl || !flag) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await fetch("/api/challenge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name: title,
          category,
          description,
          points: credits,
          flag,
          file_url: fileUrl,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        console.log(data);
        setError(data.error || "Failed to create challenge.");
        return;
      }

      setSuccess(true);
      setTitle("");
      setCredits(0);
      setDescription("");
      setCategory("");
      setFileUrl("");
      setFlag("");
      onCloseAction();
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <ModalWindow isOpen={isOpen} onCloseAction={onCloseAction}>
      <div className={"create-challenge-modal-content"}>
        {error && (
          <Message
            type={MessageEnums.ERROR}
            message={error}
            className={"create-challenge-message"}
          />
        )}
        {success && (
          <Message
            type={MessageEnums.SUCCESS}
            message={"Challenge created successfully."}
            className={"create-challenge-message"}
          />
        )}
        <MainInput
          label={"Challenge title"}
          type={"text"}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={"title-input"}
        />
        <MainInput
          label={"Credits"}
          type={"number"}
          value={credits}
          onChange={(e) => setCredits(Number(e.target.value))}
          className={"credits-input"}
        />
        <MainTextArea
          label={"Challenge description"}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={"description-text-area"}
        />
        <MainSelect
          label="Choose an option"
          options={options}
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
          className={"category-input"}
        />
        <MainInput
          label={"File URL"}
          type={"text"}
          value={fileUrl}
          onChange={(e) => setFileUrl(e.target.value)}
          className={"file-url-input"}
        />
        <MainInput
          label={"Flag"}
          type={"text"}
          value={flag}
          onChange={(e) => setFlag(e.target.value)}
          className={"flag-input"}
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
