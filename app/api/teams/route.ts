import { NextResponse } from "next/server";
import { getDb } from "@/utils/lib/mongodb";
import crypto from "crypto";
import { Collection, Db, ObjectId } from "mongodb";
import { TeamMongoDB, TeamMongoDBWithRanking } from "@/utils/types/team";

const jsonErrorResponse = (message: string, status: number) =>
  NextResponse.json({ error: message }, { status });

const updateUserTeam = async (db: Db, userId: string, teamId: string) => {
  const userUpdate = await db
    .collection("user")
    .updateOne({ _id: new ObjectId(userId) }, { $set: { team: teamId } });
  return userUpdate.modifiedCount > 0;
};

export async function GET(request: Request) {
  const url = new URL(request.url);
  const teamName = url.searchParams.get("teamName"); // Récupérer le paramètre query "teamName"
  const sortOrder = url.searchParams.get("sortOrder") || "desc"; // Récupérer l'ordre de tri (par défaut 'desc')

  try {
    const db = await getDb();

    // Définir un filtre de base
    let filter = {};
    if (teamName) {
      filter = { name: teamName }; // Filtrer par le nom de l'équipe
    }

    // Définir l'ordre de tri par points
    const sortByPoints = sortOrder === "asc" ? 1 : -1;

    // Récupérer les équipes en fonction du filtre et trier par points
    const teams = await db
      .collection("teams")
      .find(filter, { projection: { token: 0, tried_challenges: 0 } })
      .sort({ points: sortByPoints })
      .toArray();

    const teamsWithRanking = teams.map((team, index: number) => ({
      ...team,
      ranking: index + 1,
    })) as unknown as TeamMongoDBWithRanking[];

    const teamsWithDetails = await Promise.all(
      teamsWithRanking.map(async (team) => {
        const captain = await db
          .collection("user")
          .findOne(
            { _id: new ObjectId(team.captain) },
            { projection: { username: 1, points: 1 } },
          );

        const players = await db
          .collection("user")
          .find(
            {
              _id: { $in: team.players.map((id: string) => new ObjectId(id)) },
            },
            { projection: { username: 1, points: 1 } },
          )
          .toArray();

        return {
          ...team,
          captain: captain || null,
          players,
        };
      }),
    );

    // Retourner les équipes avec leurs détails et leur classement
    return NextResponse.json({ teams: teamsWithDetails }, { status: 200 });
  } catch (error) {
    return jsonErrorResponse(`${error}`, 500);
  }
}

export async function DELETE(request: Request) {
  const authorizationHeader = request.headers.get("Authorization");

  if (!authorizationHeader) {
    return jsonErrorResponse("'Authorization' header is required.", 400);
  }

  const match = authorizationHeader.match(/^Bearer (.+)$/);
  if (!match) {
    return jsonErrorResponse("Invalid Authorization header format.", 400);
  }

  const token = match[1]; // Extraire le token

  const { team_id } = await request.json();

  if (!team_id) {
    return jsonErrorResponse("'team_id' is required.", 400);
  }

  try {
    const db = await getDb();

    // Trouver l'utilisateur correspondant au token
    const user = await db.collection("user").findOne({ token });
    if (!user) {
      return jsonErrorResponse("User not found or invalid token.", 404);
    }

    // Trouver l'équipe à partir de l'ID
    const team = await db
      .collection("teams")
      .findOne({ _id: new ObjectId(team_id) });
    if (!team) {
      return jsonErrorResponse("Team not found.", 404);
    }

    // Vérifier si l'utilisateur est le capitaine
    if (team.captain !== user._id.toString()) {
      return jsonErrorResponse("Only the captain can delete the team.", 403);
    }

    // Suppression de l'équipe
    const deleteResult = await db
      .collection("teams")
      .deleteOne({ _id: new ObjectId(team_id) });
    if (deleteResult.deletedCount === 0) {
      return jsonErrorResponse("Failed to delete team.", 500);
    }

    // Mise à jour des utilisateurs pour retirer l'attribut 'team'
    const updateUsersResult = await db
      .collection("user")
      .updateMany({ team: team_id }, { $unset: { team: "" } });

    if (updateUsersResult.modifiedCount === 0) {
      return jsonErrorResponse(
        "Failed to remove team association from users.",
        500,
      );
    }

    return NextResponse.json(
      { message: "Team deleted successfully." },
      { status: 200 },
    );
  } catch (error) {
    return jsonErrorResponse(`${error}`, 500);
  }
}

export async function PUT(request: Request) {
  const authorizationHeader = request.headers.get("Authorization");

  if (!authorizationHeader) {
    return jsonErrorResponse("'Authorization' header is required.", 400);
  }

  const match = authorizationHeader.match(/^Bearer (.+)$/);
  if (!match) {
    return jsonErrorResponse("Invalid Authorization header format.", 400);
  }

  const token = match[1]; // Extraire le token

  const { team_id } = await request.json();

  if (!team_id) {
    return jsonErrorResponse("'team_id' is required.", 400);
  }

  try {
    const db = await getDb();

    // Trouver l'utilisateur correspondant au token
    const user = await db.collection("user").findOne({ token });
    if (!user) {
      return jsonErrorResponse("User not found or invalid token.", 404);
    }

    const userId = `${user._id}`;

    // Trouver l'équipe à partir de l'ID
    const team = await db
      .collection("teams")
      .findOne({ _id: new ObjectId(team_id) });
    if (!team) {
      return jsonErrorResponse("Team not found.", 404);
    }

    if (!team.players.includes(userId)) {
      return jsonErrorResponse("User is not part of this team.", 403);
    }

    const teamCollection: Collection<TeamMongoDB> = db.collection("teams");
    const updateTeamResult = await teamCollection.updateOne(
      { _id: new ObjectId(team_id) },
      { $pull: { players: userId } },
    );

    if (updateTeamResult.modifiedCount === 0) {
      return jsonErrorResponse("Failed to remove user from the team.", 500);
    }

    // Vider l'attribut 'team' de l'utilisateur
    const updateUserResult = await db
      .collection("user")
      .updateOne({ _id: new ObjectId(userId) }, { $unset: { team: "" } });

    if (updateUserResult.modifiedCount === 0) {
      return jsonErrorResponse("Failed to update user's team attribute.", 500);
    }

    return NextResponse.json(
      { message: "User removed from team successfully." },
      { status: 200 },
    );
  } catch (error) {
    return jsonErrorResponse(`${error}`, 500);
  }
}

export async function POST(request: Request) {
  const authorizationHeader = request.headers.get("Authorization");

  if (!authorizationHeader) {
    return jsonErrorResponse("'Authorization' header is required.", 400);
  }

  const match = authorizationHeader.match(/^Bearer (.+)$/);
  if (!match) {
    return jsonErrorResponse("Invalid Authorization header format.", 400);
  }

  const token = match[1]; // Extraire le token

  const { name, token: teamToken } = await request.json();

  if (!name && !teamToken) {
    return jsonErrorResponse("Either 'name' or 'token' must be provided.", 400);
  }

  try {
    const db = await getDb();

    // Trouver l'utilisateur correspondant au token
    const user = await db.collection("user").findOne({ token });
    if (!user) {
      return jsonErrorResponse("User not found or invalid token.", 404);
    }

    const userId = `${user._id}`;

    // Vérifier si l'utilisateur appartient déjà à une équipe
    if (user.team) {
      return jsonErrorResponse("User already belongs to a team.", 400);
    }

    if (name) {
      const existingTeam = await db.collection("teams").findOne({ name });
      if (existingTeam) {
        return jsonErrorResponse("A team with this name already exists.", 400);
      }

      const generatedToken = crypto.randomBytes(16).toString("hex");

      const newTeam = {
        name,
        token: generatedToken,
        captain: userId,
        players: [userId],
        points: 0,
        tried_challenges: [],
      };

      const result = await db.collection("teams").insertOne(newTeam);
      const teamId = `${result.insertedId}`;

      const userUpdated = await updateUserTeam(db, userId, teamId);
      if (!userUpdated) {
        return jsonErrorResponse("Failed to update user with team.", 500);
      }

      return NextResponse.json(
        { message: "Team created successfully.", token: generatedToken },
        { status: 201 },
      );
    }

    if (teamToken) {
      const team = await db.collection("teams").findOne({ token: teamToken });
      if (!team) {
        return jsonErrorResponse("Team with this token does not exist.", 400);
      }

      if (team.players.length >= 5) {
        return jsonErrorResponse("This team already has 5 players.", 400);
      }

      const teamsCollection: Collection<TeamMongoDB> = db.collection("teams");

      const updateTeamResult = await teamsCollection.updateOne(
        { _id: team._id },
        { $push: { players: userId } },
      );

      if (updateTeamResult.modifiedCount === 0) {
        return jsonErrorResponse("Failed to add user to the team.", 500);
      }

      const userUpdated = await updateUserTeam(db, userId, `${team._id}`);
      if (!userUpdated) {
        return jsonErrorResponse("Failed to update user with team.", 500);
      }

      return NextResponse.json(
        { message: "User successfully added to the team." },
        { status: 200 },
      );
    }

    return jsonErrorResponse("Either 'name' or 'token' must be provided.", 400);
  } catch (error) {
    return jsonErrorResponse(`${error}`, 500);
  }
}
