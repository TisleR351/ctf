"use client";

import "./overlay.css";
import MainMenu from "@/modules/main-menu/mainMenu";
import ProfileMenu from "@/modules/profile-menu/profileMenu";
import LoginMenu from "@/components/login-menu/loginMenu";
import { CreateChallengeSection } from "@/modules/create-challenge-section/createChallengeSection";
import { usePathname } from "next/navigation";
import { CreateTeamSection } from "@/modules/create-team-section/createTeamSection";
import { JoinTeamSection } from "@/modules/join-team-section/joinTeamSection";
import { useUser } from "@/utils/contexts/userContext";
import TeamInfoSection from "@/modules/team-info-section/teamInfoSection";

export default function Overlay() {
  const { user } = useUser();
  const pathname = usePathname();

  const isAdmin = user?.role === 10000;
  const isChallengesPage = pathname === "/challenges";
  const isTeamsPage = pathname === "/teams";
  const isMyTeamPage = pathname === "/my-team";

  return (
    <div className="overlay">
      <div className="main-menu-container">
        <MainMenu />
      </div>
      <div className="sub-menu-container">
        {isAdmin && isChallengesPage && <CreateChallengeSection />}
        {isTeamsPage && user?.team && (
          <TeamInfoSection
            teamName={user.team.name}
            teamPoints={user.team.points}
          />
        )}
        {user && (isTeamsPage || isMyTeamPage) && !user.team && (
          <>
            <JoinTeamSection />
            <CreateTeamSection />
          </>
        )}
        {user ? (
          <ProfileMenu name={user.username} points={user.points} />
        ) : (
          <LoginMenu />
        )}
      </div>
    </div>
  );
}
