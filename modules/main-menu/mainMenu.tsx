import MenuButton from "@/components/menu-button/menuButton";
import "./mainMenu.css";
import Divider from "@/components/divider/divider";
import {
  faFlag,
  faUserGraduate,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

function Logo() {
  return <p>CTF</p>;
}

export default function MainMenu() {
  return (
    <div className="main-menu">
      <div className="main-menu-header">
        <Logo />
      </div>
      <Divider direction="horizontal" />
      <div className="main-menu-content">
        <MenuButton icon={faFlag} tooltip="Challenges" href={"/challenges"} />
        <MenuButton icon={faUsers} tooltip="Teams" href={"/teams"} />
      </div>
      <Divider direction="horizontal" />
      <MenuButton icon={faUserGraduate} tooltip="About us" href={"/about-us"} />
    </div>
  );
}
