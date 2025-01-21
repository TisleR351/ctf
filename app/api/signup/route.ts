import { NextResponse } from "next/server";
import { getDb } from "@/public/lib/mongodb";
import bcrypt from "bcryptjs";
import crypto from "crypto";

export async function POST(request: Request) {
  const { email, username, password, confirmPassword } = await request.json();

  if (!email || !username || !password || !confirmPassword) {
    return NextResponse.json(
      { error: "Every fields are required." },
      { status: 400 },
    );
  }

  if (password !== confirmPassword) {
    return NextResponse.json(
      { error: "Passwords do not match." },
      { status: 400 },
    );
  }

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{12,}$/;
  if (!passwordRegex.test(password)) {
    return NextResponse.json(
      {
        error:
          "The password must contain at least 12 characters, one uppercase, lowercase, number and special character.",
      },
      { status: 400 },
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const db = await getDb();

    const existingUser = await db.collection("user").findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email or username already exists." },
        { status: 400 },
      );
    }

    const token = crypto.randomBytes(32).toString("hex");

    const newUser = {
      email: email,
      username: username,
      password: hashedPassword,
      role: 0,
      team: "",
      points: 0,
      token: token,
      createdAt: new Date(),
    };

    await db.collection("user").insertOne(newUser);

    return NextResponse.json(
      { message: "Sign up successfully." },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
