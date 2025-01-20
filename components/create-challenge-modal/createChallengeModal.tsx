import "./createChallengeModal.css";
import { HTMLAttributes } from "react";
import ModalWindow from "@/modules/modal-window/challengeModal";
import MainInput from "@/components/main-input/mainInput";
import MainTextArea from "@/components/main-text-area/mainTextArea";
import MainButton from "@/components/main-button/mainButton";

interface CreateChallengeModalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onCloseAction: () => void;
}

export default function CreateChallengeModal({
  isOpen,
  onCloseAction,
}: CreateChallengeModalProps) {
  return (
    <ModalWindow isOpen={isOpen} onCloseAction={onCloseAction}>
      <div className={"create-challenge-modal-content"}>
        <MainInput
          label={"Challenge title"}
          type={"text"}
          className={"title-input"}
        />
        <MainInput
          label={"Credits"}
          type={"number"}
          className={"credits-input"}
        />
        <MainTextArea
          label={"Challenge description"}
          className={"description-text-area"}
        />
        <MainInput
          label={"File URL"}
          type={"text"}
          className={"file-url-input"}
        />
        <MainInput label={"Flag"} type={"text"} className={"flag-input"} />
        <MainButton icon={"fa-save"} label={"Save"} className={"save-button"} />
      </div>
    </ModalWindow>
  );
}
