import "./joinTeamSection.css";
import MainButton from "@/components/main-button/mainButton";
import { useState } from "react";
import { faPeopleArrows, faPlus } from "@fortawesome/free-solid-svg-icons";
import JoinTeamModal from "@/components/join-team-modal/joinTeamModal";

export function JoinTeamSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className={"create-team-container"}>
      <MainButton
        icon={faPeopleArrows}
        onClick={() => setIsModalOpen(true)}
        label={"Join a team"}
      />
      {isModalOpen && (
        <JoinTeamModal isOpen={isModalOpen} onCloseAction={closeModal} />
      )}
    </div>
  );
}
