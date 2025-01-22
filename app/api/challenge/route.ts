import { NextResponse } from "next/server";
import { getDb } from "@/utils/lib/mongodb";

interface Challenge {
  name: string;
  category: string;
  description: string;
  points: number;
  author: string;
  flag: string[];
  file_url: string;
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

    const { name, category, description, points, flag, file_url, author } =
      await request.json();

    if (
      !name ||
      !category ||
      !description ||
      !author ||
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
      author,
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
