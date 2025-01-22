import { NextResponse } from "next/server";
import { getDb } from "@/utils/lib/mongodb";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email parameter is missing." },
        { status: 400 },
      );
    }

    const db = await getDb();

    const user = await db.collection("user").findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "User with the specified email not found." },
        { status: 404 },
      );
    }

    const { password, token, ...userInfo } = user;

    return NextResponse.json({ user: userInfo }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
