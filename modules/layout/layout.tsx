"use client";

import "@/app/globals.css";
import "./layout.css";
import "./scrollbar.css";
import "@/modules/layout/scrollbar.css";
import Background from "@/components/background/background";
import Overlay from "@/modules/overlay/overlay";
import { ReactNode, useEffect, useState } from "react";
import { User } from "@/utils/types/user";
import { UserProvider } from "@/utils/contexts/userContext";

export default function BaseLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const isConnected = !!token;
    if (isConnected) {
      fetch("/api/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch user info.");
          }
          return response.json();
        })
        .then((data) => {
          setUser(data.user);
        })
        .catch(() => {
          setUser(undefined);
        });
    }
  }, []);

  return (
    <UserProvider value={{ user, setUser }}>
      <Background />
      <div className={"page-content"}>{children}</div>
      <Overlay />
    </UserProvider>
  );
}
