import "@/app/globals.css";
import "./layout.css";
import "./scrollbar.css";
import "@/modules/layout/scrollbar.css";
import Background from "@/components/background/background";
import Overlay from "@/modules/overlay/overlay";
import { ReactNode } from "react";

export default function BaseLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <Background />
      <div className={"page-content"}>{children}</div>
      <Overlay />
    </>
  );
}
