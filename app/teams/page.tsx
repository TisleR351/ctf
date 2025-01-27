"use client";

import "./page.css";
import React, { useEffect, useState } from "react";
import BaseLayout from "@/modules/layout/layout";
import { Team } from "@/utils/types/team";

export default function AboutUsPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch("/api/teams");
        if (!response.ok) {
          throw new Error("Failed to fetch teams");
        }

        const data: { teams: Team[] } = await response.json();
        setTeams(data.teams);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) {
    return (
      <BaseLayout>
        <div className="loading">Loading teams...</div>
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
      <div className="teams-container">
        <table className="teams-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Captain</th>
              <th className="teams-points">Points</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team) => (
              <tr
                key={team._id}
                onClick={() => (window.location.href = "/teams/" + team.name)}
              >
                <td>{team.name}</td>
                <td>{team.captain.username}</td>
                <td>{team.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </BaseLayout>
  );
}
