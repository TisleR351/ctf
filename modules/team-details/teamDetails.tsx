"use client";

import "./teamDetails.css";
import { UserMinified } from "@/utils/types/user";
import React, { HTMLAttributes, useState } from "react";
import Display from "@/components/display/display";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCopy,
  faCrown,
  faPersonWalkingArrowRight,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { usePathname } from "next/navigation";
import { useUser } from "@/utils/contexts/userContext";
import DisplayInteractive from "@/components/display-interractive/displayInteractive";
import { Message } from "@/components/message/message";
import { MessageEnums } from "@/utils/enums/MessageEnums";

interface TeamDetailsProps extends HTMLAttributes<HTMLDivElement> {
  teamId: string;
  teamName: string;
  teamToken?: string;
  teamPoints: number;
  teamCaptain: UserMinified;
  teamPlayers: UserMinified[];
}

export default function TeamDetails({
  teamId,
  teamName,
  teamPoints,
  teamToken,
  teamCaptain,
  teamPlayers,
}: TeamDetailsProps) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleCopy() {
    if (teamToken !== undefined) {
      navigator.clipboard
        .writeText(teamToken)
        .then(() => setSuccess("Token successfully copied to clipboard"))
        .catch((error) => {
          setError("Erreur lors de la copie du token :" + `${error}`);
        });

      setTimeout(() => {
        setSuccess("");
      }, 3000);
    }
  }

  async function handleDelete() {
    const token =
      !!sessionStorage.getItem("token") && sessionStorage.getItem("token");

    if (!token) {
      return;
    }

    try {
      const response = await fetch("/api/teams", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ team_id: teamId }),
      });

      if (response.ok) {
        window.location.reload();
      } else {
        setError("Failed to delete team");
      }
    } catch (error) {
      setError(`${error}`);
    }
  }

  async function handleLeave() {
    const token = sessionStorage.getItem("token");

    if (!token) {
      return;
    }

    try {
      const response = await fetch("/api/teams", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ team_id: teamId }),
      });

      if (response.ok) {
        window.location.reload();
      }
    } catch (error) {
      setError(`${error}`);
    }
  }

  const { user } = useUser();
  const pathname = usePathname();
  return (
    <div className={"team-details-container"}>
      {error && <Message type={MessageEnums.ERROR} message={error} />}
      {success && <Message type={MessageEnums.SUCCESS} message={success} />}
      <div className={"team-details-name-points-container"}>
        {pathname !== "/my-team" ? (
          <Display
            value={teamName}
            label={"Team name"}
            className={"team-details-name-display"}
          />
        ) : user?._id === teamCaptain._id ? (
          <DisplayInteractive
            type={MessageEnums.ERROR}
            value={teamName}
            label={"Team name"}
            teamId={teamId}
            icon={faTrash}
            onClick={handleDelete}
            className={"team-details-name-display"}
          />
        ) : (
          <DisplayInteractive
            type={MessageEnums.ERROR}
            value={teamName}
            label={"Team name"}
            teamId={teamId}
            icon={faPersonWalkingArrowRight}
            onClick={handleLeave}
            className={"team-details-name-display"}
          />
        )}
        <Display
          label={"Points"}
          value={teamPoints}
          className={"team-details-points-display"}
        />
        {teamToken && (
          <DisplayInteractive
            type={MessageEnums.AVAILABLE}
            label={"Token"}
            teamId={teamId}
            icon={faCopy}
            onClick={handleCopy}
            className={"team-details-token-display"}
          />
        )}
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
            {teamPlayers &&
              teamPlayers.map((player, index) => (
                <tr key={index}>
                  <td>
                    {player._id === teamCaptain._id && (
                      <FontAwesomeIcon
                        icon={faCrown}
                        className={"crown-icon"}
                      />
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
