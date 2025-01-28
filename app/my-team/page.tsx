"use client";

import "./page.css";
import React from "react";
import BaseLayout from "@/modules/layout/layout";
import MyTeamDetails from "@/modules/my-team-details/myTeamDetails";

export default function MyTeamPage() {
  return (
    <BaseLayout>
      <MyTeamDetails />
    </BaseLayout>
  );
}
