"use client";

import "./countdown.css";

import React, { useState, useEffect } from "react";

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const eventDate = new Date(Date.UTC(2025, 0, 31, 11, 0, 0));

    const updateCountdown = () => {
      const now = new Date();
      const diff = eventDate.getTime() - now.getTime();

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    const interval = setInterval(updateCountdown, 1000);
    updateCountdown(); // Initialisation immédiate

    return () => clearInterval(interval); // Nettoyage à la fin
  }, []);

  return (
    <div className="countdown">
      ECTF25 starts in
      <span id="countdown">
        {`${timeLeft.days} D ${timeLeft.hours} H ${timeLeft.minutes} M ${timeLeft.seconds} S`}
      </span>
    </div>
  );
}
