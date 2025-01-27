import { useUser } from "@/utils/contexts/userContext";
import TeamDetails from "@/modules/team-details/teamDetails";

export default function MyTeamDetails() {
  const { user } = useUser();

  return user ? (
    <TeamDetails
      teamPoints={user.team.points}
      teamPlayers={user.team.players}
      teamCaptain={user.team.captain}
      teamName={user.team.name}
      teamToken={user.team.token}
    />
  ) : (
    <p>Loading...</p>
  );
}
