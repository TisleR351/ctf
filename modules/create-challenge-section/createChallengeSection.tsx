import "./createChallengeSection.css";
import MainButton from "@/components/main-button/mainButton";
import { useState } from "react";
import CreateChallengeModal from "@/components/create-challenge-modal/createChallengeModal";

export function CreateChallengeSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className={"create-challenge-container"}>
      <MainButton
        icon={"fa-plus"}
        onClick={() => setIsModalOpen(true)}
        label={"Create a challenge"}
      />
      {isModalOpen && (
        <CreateChallengeModal isOpen={isModalOpen} onCloseAction={closeModal} />
      )}
    </div>
  );
}
