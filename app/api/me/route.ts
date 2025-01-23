import { NextResponse } from "next/server";
import { getDb } from "@/utils/lib/mongodb";

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

    return NextResponse.json({ user: userInfo }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
