"use client";

import "./teamDetails.css";
import { UserMinified } from "@/utils/types/user";
import { HTMLAttributes } from "react";
import Display from "@/components/display/display";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons";

interface TeamDetailsProps extends HTMLAttributes<HTMLDivElement> {
  teamName: string;
  teamToken?: string;
  teamPoints: number;
  teamCaptain: UserMinified;
  teamPlayers: UserMinified[];
}

export default function TeamDetails({
  teamName,
  teamPoints,
  teamToken,
  teamCaptain,
  teamPlayers,
}: TeamDetailsProps) {
  return (
    <div className={"team-details-container"}>
      <div className={"team-details-name-points-container"}>
        <Display
          value={teamName}
          label={"team name"}
          className={"team-details-name-display"}
        />
        {teamToken && (
          <Display
            label={"token"}
            value={teamToken}
            className={"team-details-token-display"}
          />
        )}
        <Display
          label={"points"}
          value={teamPoints}
          className={"team-details-points-display"}
        />
      </div>
      <div className="team-details-players-container">
        <table className="players-table">
          <thead>
            <tr>
              <th className={"table-username"}>username</th>
              <th className={"table-points"}>points</th>
            </tr>
          </thead>
          <tbody>
            {teamPlayers.map((player, index) => (
              <tr key={index}>
                <td>
                  {player._id === teamCaptain._id && (
                    <FontAwesomeIcon icon={faCrown} className={"crown-icon"} />
                  )}
                  {player.username}
                </td>
                <td>{player.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
