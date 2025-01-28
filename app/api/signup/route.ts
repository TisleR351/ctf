import { NextResponse } from "next/server";
import {
  hashPassword,
  validatePassword,
  generateToken,
  sendEmail,
} from "@/utils/services/apiServices";
import { getDb } from "@/utils/lib/mongodb";

export async function POST(request: Request) {
  try {
    const { email, username, password, confirmPassword } = await request.json();

    if (!email || !username || !password || !confirmPassword) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 },
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: "Passwords do not match." },
        { status: 400 },
      );
    }

    if (!validatePassword(password)) {
      return NextResponse.json(
        { error: "The password does not meet the security criteria." },
        { status: 400 },
      );
    }

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

    const hashedPassword = await hashPassword(password);
    const token = generateToken();

    await db.collection("user").insertOne({
      email,
      username,
      password: hashedPassword,
      role: 0,
      team: "",
      points: 0,
      token,
      createdAt: new Date(),
    });

    const subject = "Welcome to the ECTF!";
    const message = `Hello ${username},\n\nWelcome to our Capture The Flag!\n\nBest regards,\nThe ECTF Team`;

    await sendEmail(email, subject, message);

    return NextResponse.json(
      { message: "Sign up successfully. A welcome email has been sent." },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error", details: error },
      { status: 500 },
    );
  }
}
