"use client";

import "./overlay.css";
import MainMenu from "@/modules/main-menu/mainMenu";
import { useState, useEffect } from "react";
import ProfileMenu from "@/modules/profile-menu/profileMenu";
import LoginMenu from "@/components/login-menu/loginMenu";
import { CreateChallengeSection } from "@/modules/create-challenge-section/createChallengeSection";
import { usePathname } from "next/navigation";

export default function Overlay() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState<string>("Me");
  const [isAdmin, setIsAdmin] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const isConnected = !!token;
    setIsLoggedIn(isConnected);

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
          setIsAdmin(data.user?.role === 10000);
          setName(data.user?.username);
        });
    } else {
      setIsAdmin(false);
    }
  }, []);

  return (
    <div className="overlay">
      <div className="main-menu-container">
        <MainMenu />
      </div>
      <div className="sub-menu-container">
        {isAdmin && pathname === "/challenge" && <CreateChallengeSection />}
        {isLoggedIn ? <ProfileMenu name={name} /> : <LoginMenu />}
      </div>
    </div>
  );
}
