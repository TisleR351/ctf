import { NextResponse } from "next/server";
import { getDb } from "@/utils/lib/mongodb";
import crypto from "crypto";
import { ObjectId } from "mongodb"; // Import de ObjectId

export async function POST(request: Request) {
  const { name, token, id_user } = await request.json();

  if (!id_user) {
    return NextResponse.json(
      { error: "Field 'userId' is required." },
      { status: 400 },
    );
  }

  try {
    const db = await getDb();

    const userId = new ObjectId(id_user);
    const existingUser = await db.collection("user").findOne({ _id: userId });
    if (existingUser?.team) {
      return NextResponse.json(
        { error: "User already belongs to a team." },
        { status: 400 },
      );
    }

    // Si 'name' est fourni, on crée une nouvelle équipe
    if (name) {
      // Vérification si l'équipe existe déjà
      const existingTeam = await db.collection("teams").findOne({ name });
      if (existingTeam) {
        return NextResponse.json(
          { error: "A team with this name already exists." },
          { status: 400 },
        );
      }

      // Génération d'un code unique pour l'équipe
      const generatedToken = crypto.randomBytes(16).toString("hex");

      const newTeam = {
        name,
        code: generatedToken,
        captain: id_user,
        players: [id_user],
        points: 0,
        tried_challenges: [],
      };

      // Insertion de la nouvelle équipe dans la collection
      const result = await db.collection("teams").insertOne(newTeam);

      // Récupération de l'ID de l'équipe nouvellement créée
      const teamId = `${result.insertedId}`;

      // Vérification si l'utilisateur existe
      const user = await db.collection("user").findOne({ _id: userId });
      if (!user) {
        return NextResponse.json({ error: "User not found." }, { status: 404 });
      }

      // Mise à jour de l'utilisateur pour ajouter l'équipe
      const updateResult = await db
        .collection("user")
        .updateOne({ _id: userId }, { $set: { team: teamId } });

      if (updateResult.modifiedCount === 0) {
        return NextResponse.json(
          { error: "Failed to update user with team." },
          { status: 500 },
        );
      }

      return NextResponse.json(
        {
          message: "Team created successfully.",
          token: generatedToken,
        },
        { status: 201 },
      );
    }

    if (token) {
      const team = await db.collection("teams").findOne({ code: token });
      if (!team) {
        return NextResponse.json(
          { error: "Team with this token does not exist." },
          { status: 400 },
        );
      }

      if (team.players.length >= 5) {
        return NextResponse.json(
          { error: "This team already has 5 players." },
          { status: 400 },
        );
      }

      const updateTeamResult = await db
        .collection("teams")
        .updateOne({ _id: team._id }, { $push: { players: id_user } });

      if (updateTeamResult.modifiedCount === 0) {
        return NextResponse.json(
          { error: "Failed to add user to the team." },
          { status: 500 },
        );
      }

      const updateUserResult = await db
        .collection("user")
        .updateOne({ _id: userId }, { $set: { team: `${team._id}` } });

      if (updateUserResult.modifiedCount === 0) {
        return NextResponse.json(
          { error: "Failed to update user with team." },
          { status: 500 },
        );
      }

      return NextResponse.json(
        { message: "User successfully added to the team." },
        { status: 200 },
      );
    }

    return NextResponse.json(
      { error: "Either 'name' or 'token' must be provided." },
      { status: 400 },
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while processing the request." },
      { status: 500 },
    );
  }
}
