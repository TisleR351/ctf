"use client";
import "./subMenu.css";
import Divider from "@/app/components/divider/divider";
import SubMenuButton from "@/app/components/login-menu/login-menu-button/subMenuButton";

export default function SubMenu() {
  return (
    <div className={"sub-menu"}>
      <SubMenuButton
        icon={"fa-right-to-bracket"}
        href={"/signin"}
        label={"Sign in"}
      />
      <Divider direction={"vertical"} className="sub-menu-divider" />
      <SubMenuButton icon={"fa-dragon"} href={"/signup"} label={"Sign up"} />
    </div>
  );
}
