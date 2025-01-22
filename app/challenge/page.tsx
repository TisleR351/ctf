import "@fortawesome/fontawesome-free/css/all.min.css";
import "./page.css";
import React from "react";
import BaseLayout from "@/modules/layout/layout";
import Image from "next/image";
import ectf_logo from "@/public/ectf_logo.png";
import Countdown from "@/components/countdown/countdown";
import discord from "@/public/discord.png";

export default function Challenge() {
  return (
    <BaseLayout>
      <Image
        src={ectf_logo}
        alt="ECTF Logo"
        width={250}
        height={100}
        className="about-us-logo"
      />
      <div className="about-us-title">Welcome to ECTF25</div>
      <Countdown />
      <div className="about-us-info">
        The website is not available to the public yet, join our Discord to get
        notified when registrations are available.
      </div>
      <a
        href="https://discord.gg/3kH63ckmeb"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src={discord}
          alt="Join Discord"
          width={250}
          height={40}
          className="about-us-discord-button"
        />
      </a>
    </BaseLayout>
  );
}
