import "./createChallengeSection.css";
import MainButton from "@/components/main-button/mainButton";
import { useState } from "react";
import CreateChallengeModal from "@/components/create-challenge-modal/createChallengeModal";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export function CreateChallengeSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className={"create-challenge-container"}>
      <MainButton
        icon={faPlus}
        onClick={() => setIsModalOpen(true)}
        label={"Create a challenge"}
      />
      {isModalOpen && (
        <CreateChallengeModal isOpen={isModalOpen} onCloseAction={closeModal} />
      )}
    </div>
  );
}
