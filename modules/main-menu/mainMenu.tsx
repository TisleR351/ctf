import MenuButton from "@/components/menu-button/menuButton";
import "./mainMenu.css";
import Divider from "@/components/divider/divider";

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
        <MenuButton icon="fa-flag" tooltip="Challenge" href={"/challenge"} />
        <MenuButton
          icon="fa-sort-amount-up-alt"
          tooltip="Ranking"
          href={"/ranking"}
        />
        <MenuButton icon="fa-users" tooltip="Teams" href={"/teams"} />
      </div>
      <Divider direction="horizontal" />
      <MenuButton
        icon="fa-user-graduate"
        tooltip="About us"
        href={"/about-us"}
      />
    </div>
  );
}
