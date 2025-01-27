"use client";

import React, { useEffect, useState } from "react";
import { Team } from "@/utils/types/team";
import BaseLayout from "@/modules/layout/layout";
import { useParams } from "next/navigation";
import TeamDetails from "@/modules/team-details/teamDetails";

export default function TeamDetailPage() {
  const [team, setTeam] = useState<Team>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const params = useParams();

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch("/api/teams?teamName=" + params.teamName);
        if (!response.ok) {
          throw new Error("Failed to fetch teams");
        }

        const data: { teams: Team[] } = await response.json();
        setTeam(data.teams[0]);
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
      {team && (
        <TeamDetails
          teamId={team._id}
          teamPoints={team.points}
          teamPlayers={team.players}
          teamCaptain={team.captain}
          teamName={team.name}
        />
      )}
    </BaseLayout>
  );
}
