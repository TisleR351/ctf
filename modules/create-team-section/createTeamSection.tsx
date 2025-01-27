import "./createTeamSection.css";
import MainButton from "@/components/main-button/mainButton";
import { useState } from "react";
import CreateTeamModal from "@/components/create-team-modal/createTeamModal";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export function CreateTeamSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className={"create-team-container"}>
      <MainButton
        icon={faPlus}
        onClick={() => setIsModalOpen(true)}
        label={"Create a team"}
      />
      {isModalOpen && (
        <CreateTeamModal isOpen={isModalOpen} onCloseAction={closeModal} />
      )}
    </div>
  );
}
