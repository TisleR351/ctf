"use client";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "./page.css";
import React, { useEffect, useState } from "react";
import ChallengeTypeCard from "@/modules/challenge-type-card/challengeTypeCard";
import BaseLayout from "@/modules/layout/layout";
import { CategoryGroup } from "@/utils/types/challenge";

export default function Challenge() {
  const [categories, setCategories] = useState<CategoryGroup[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoggedIn(!!sessionStorage.getItem("token"));
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/challenge?group_by=category");
        if (!response.ok) {
          throw new Error("Failed to fetch challenges");
        }

        const data: CategoryGroup[] = await response.json();
        setCategories(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <BaseLayout>
        <div className="loading">Loading challenges...</div>
      </BaseLayout>
    );
  }

  if (error) {
    return (
      <BaseLayout>
        <div className="error">{error}</div>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout>
      <div className={"challenges-container"}>
        {categories.map((categoryGroup) => (
          <ChallengeTypeCard
            isLoggedIn={isLoggedIn}
            key={categoryGroup.category}
            title={categoryGroup.category}
            challenges={categoryGroup.challenges}
          />
        ))}
      </div>
    </BaseLayout>
  );
}
