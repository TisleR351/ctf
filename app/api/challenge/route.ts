import { NextResponse } from "next/server";
import { getDb } from "@/utils/lib/mongodb";

interface Challenge {
  name: string;
  category: string;
  description: string;
  points: number;
  flag: string[];
  file_url: string;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const groupBy = url.searchParams.get("group_by");

  try {
    const db = await getDb();

    if (groupBy === "category") {
      const groupedChallenges = await db
        .collection("challenge")
        .aggregate([
          {
            $group: {
              _id: "$category",
              challenges: { $push: "$$ROOT" },
            },
          },
          { $project: { _id: 0, category: "$_id", challenges: 1 } },
          {
            $addFields: {
              challenges: {
                $map: {
                  input: "$challenges",
                  as: "challenge",
                  in: {
                    _id: "$$challenge._id",
                    name: "$$challenge.name",
                    category: "$$challenge.category",
                    description: "$$challenge.description",
                    points: "$$challenge.points",
                    file_url: "$$challenge.file_url",
                  },
                },
              },
            },
          },
        ])
        .toArray();

      return NextResponse.json(groupedChallenges, { status: 200 });
    }

    const challenges = await db
      .collection("challenge")
      .find({}, { projection: { flag: 0 } })
      .toArray();

    return NextResponse.json(challenges, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const authHeader = request.headers.get("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { error: "Authorization header missing or malformed." },
      { status: 401 },
    );
  }

  const token = authHeader.split(" ")[1];

  try {
    const db = await getDb();

    const user = await db.collection("user").findOne({ token });

    if (!user || user.role !== 10000) {
      return NextResponse.json(
        {
          error: "Unauthorized. Insufficient permissions.",
          user: user,
          token: token,
        },
        { status: 403 },
      );
    }

    const { name, category, description, points, flag, file_url } =
      await request.json();

    if (
      !name ||
      !category ||
      !description ||
      points == null ||
      !flag ||
      !file_url
    ) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 },
      );
    }

    if (typeof flag !== "string") {
      return NextResponse.json(
        { error: "Flags must be provided as a comma-separated string." },
        { status: 400 },
      );
    }

    const flags = flag.match(/ectf{.*?}/g);

    if (!flags || flags.length === 0) {
      return NextResponse.json(
        {
          error:
            "Invalid flag format. Flags must follow the pattern 'ectf{...}'.",
        },
        { status: 400 },
      );
    }

    const newChallenge: Challenge = {
      name,
      category,
      description,
      points,
      flag: flags,
      file_url,
    };

    await db.collection("challenge").insertOne(newChallenge);

    return NextResponse.json(
      { message: "Challenge created successfully." },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
