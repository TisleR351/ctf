import { NextResponse } from "next/server";
import { getDb } from "@/public/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required." },
      { status: 400 },
    );
  }

  try {
    const db = await getDb();

    const user = await db.collection("user").findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 },
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 },
      );
    }

    const token = user.token;

    const response = NextResponse.json(
      { message: "Sign in successful.", token },
      { status: 200 },
    );

    response.headers.set("Content-Type", "application/javascript");

    return response;
  } catch (error) {
    console.error("Sign in error: ", error);
    return NextResponse.json({ error: "Non" }, { status: 500 });
  }
}
