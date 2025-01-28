import { NextResponse } from "next/server";
import { getDb } from "@/utils/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(request: Request) {
  try {
    const authorizationHeader = request.headers.get("Authorization");

    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Authorization header missing or invalid." },
        { status: 401 },
      );
    }

    const token = authorizationHeader.split(" ")[1];

    const db = await getDb();

    const user = await db.collection("user").findOne({ token });

    if (!user) {
      return NextResponse.json(
        { error: "User not found or token invalid." },
        { status: 401 },
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, token: __, ...userInfo } = user;

    if (userInfo.team) {
      const team = await db
        .collection("teams")
        .findOne({ _id: new ObjectId(userInfo.team) });

      if (team) {
        // Fetch the captain's information
        const captain = await db
          .collection("user")
          .findOne(
            { _id: new ObjectId(team.captain) },
            { projection: { username: 1, email: 1, points: 1 } },
          );

        // Fetch players except the current user
        const playerIds = team.players;

        const players = await db
          .collection("user")
          .find(
            { _id: { $in: playerIds.map((id: string) => new ObjectId(id)) } },
            { projection: { username: 1, points: 1 } },
          )
          .toArray();

        userInfo.team = {
          ...team,
          players: players,
          captain: captain || null,
        };
      }
    }

    return NextResponse.json({ user: userInfo }, { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
