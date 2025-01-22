"use client";

import "./page.css";
import React from "react";
import Countdown from "@/components/countdown/countdown";
import Image from "next/image";
import discord from "@/public/discord.png";
import ectf_logo from "@/public/ectf_logo.png";
import BaseLayout from "@/modules/layout/layout";
import Link from "next/link";

export default function AboutUsPage() {
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
      <div className={"discord-link"}>
        <Link href="https://discord.gg/3kH63ckmeb" target="_blank">
          <Image
            src={discord}
            alt="Join Discord"
            width={250}
            height={40}
            className="about-us-discord-button"
          />
        </Link>
      </div>
    </BaseLayout>
  );
}
