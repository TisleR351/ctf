import { useUser } from "@/utils/contexts/userContext";
import TeamDetails from "@/modules/team-details/teamDetails";

export default function MyTeamDetails() {
  const { user } = useUser();

  return user ? (
    user.team ? (
      <TeamDetails
        teamId={user.team._id}
        teamPoints={user.team.points}
        teamPlayers={user.team.players}
        teamCaptain={user.team.captain}
        teamName={user.team.name}
        teamToken={user.team.token}
      />
    ) : (
      <p>You can join or create a team :)</p>
    )
  ) : (
    <p>User not found, please login before trying to access your team!</p>
  );
}
