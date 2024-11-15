import ButtonMenu from "@/app/components/buttons/buttonMenu";
import "./menu.css";
import Divider from "@/app/components/divider/divider";

function Logo() {
  return <p>CTF</p>;
}

export default function Menu() {
  return (
    <div className="main-menu">
      <div className="main-menu-header">
        <Logo />
      </div>
      <Divider />
      <div className="main-menu-content">
        <ButtonMenu icon="fa-flag" />
        <ButtonMenu icon="fa-sort-amount-up-alt" />
        <ButtonMenu icon="fa-users" />
      </div>
      <Divider />
      <ButtonMenu icon="fa-user-graduate" />
    </div>
  );
}
