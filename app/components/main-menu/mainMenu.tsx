import ButtonMenu from "@/app/components/buttons/buttonMenu";
import "./mainMenu.css";
import Divider from "@/app/components/divider/divider";

function Logo() {
  return <p>CTF</p>;
}

export default function MainMenu() {
  return (
    <div className="main-menu">
      <div className="main-menu-header">
        <Logo />
      </div>
      <Divider />
      <div className="main-menu-content">
        <ButtonMenu icon="fa-flag" tooltip="Challenge" />
        <ButtonMenu icon="fa-sort-amount-up-alt" tooltip="Ranking" />
        <ButtonMenu icon="fa-users" tooltip="Teams" />
      </div>
      <Divider />
      <ButtonMenu icon="fa-user-graduate" tooltip="About us" />
    </div>
  );
}
