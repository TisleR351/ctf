"use client";
import "./overlay.css";
import MainMenu from "@/app/components/main-menu/mainMenu";
import SubMenu from "@/app/components/sub-menu/subMenu";

export default function Overlay() {
  return (
    <div className="overlay">
      <div className="main-menu-container">
        <MainMenu />
      </div>
      <div className="sub-menu-container">
        <SubMenu />
      </div>
    </div>
  );
}
