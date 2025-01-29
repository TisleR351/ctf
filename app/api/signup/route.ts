import { NextResponse } from "next/server";
import {
  hashPassword,
  validatePassword,
  generateToken,
  sendEmail,
} from "@/utils/services/apiServices";
import { getDb } from "@/utils/lib/mongodb";

function isValidEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length >= 8 && email.length <= 90;
}

function isValidPassword(password: string) {
  const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{12,}$/;
  return passwordRegex.test(password);
}

export async function POST(request: Request) {
  try {
    const { email, username, password, confirmPassword } = await request.json();

    if (!email || !username || !password || !confirmPassword) {
      return NextResponse.json(
          { error: "All fields are required." },
          { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
          { error: "Invalid email format or length (must be between 8 and 90 characters)." },
          { status: 400 }
      );
    }

    if (!isValidPassword(password)) {
      return NextResponse.json(
          { error: "Invalid password format or length (must contain at least 12 characters, one uppercase, lowercase, number and special character.)." },
          { status: 400 }
      );
    }

    if (username.length < 3 || username.length > 35) {
      return NextResponse.json(
          { error: "Username must be between 6 and 35 characters." },
          { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
          { error: "Passwords do not match." },
          { status: 400 }
      );
    }

    if (!validatePassword(password)) {
      return NextResponse.json(
          { error: "The password does not meet the security criteria." },
          { status: 400 }
      );
    }

    const db = await getDb();
    const existingUser = await db.collection("user").findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return NextResponse.json(
          { error: "Email or username already exists." },
          { status: 400 }
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
        { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
        { error: "Internal server error", details: error },
        { status: 500 }
    );
  }
}
