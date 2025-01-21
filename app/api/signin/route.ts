import { NextResponse } from "next/server";
import { getDb } from "@/public/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  const { emailOrUsername, password } = await request.json();

  if (!emailOrUsername || !password) {
    return NextResponse.json(
      { error: "Email/Username and password are required." },
      { status: 400 },
    );
  }

  try {
    const db = await getDb();

    // Recherche par email ou nom d'utilisateur
    const user = await db.collection("user").findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email/username or password." },
        { status: 401 },
      );
    }

    // Vérification du mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid email/username or password." },
        { status: 401 },
      );
    }

    const token = user.token;

    // Réponse réussie avec le token
    const response = NextResponse.json(
      { message: "Sign in successful.", token },
      { status: 200 },
    );

    response.headers.set("Content-Type", "application/javascript");

    return response;
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
