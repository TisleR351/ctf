import "./overlay.css";
import MainMenu from "@/app/components/main-menu/mainMenu";

export default function Overlay() {
  return (
    <div className="overlay">
      <div className="main-menu-container">
        <MainMenu />
      </div>
    </div>
  );
}
