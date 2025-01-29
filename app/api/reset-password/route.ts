import { NextResponse } from "next/server";
import { hashPassword, updateUser } from "@/utils/services/apiServices";
import { getDb } from "@/utils/lib/mongodb";

function isValidPassword(password: string) {
  const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{12,}$/;
  return passwordRegex.test(password);
}

export async function POST(request: Request) {
  try {
    const { token, password } = await request.json();

    if (!token || !password) {
      return NextResponse.json(
        { error: "Token and new password are required." },
        { status: 400 },
      );
    }

    const db = await getDb();
    const user = await db.collection("user").findOne({
      "resetPassword.token": token,
      "resetPassword.expiresAt": { $gt: new Date() },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired token." },
        { status: 400 },
      );
    }

    if (!isValidPassword(password)) {
      return NextResponse.json(
          { error: "Invalid password format or length (must contain at least 12 characters, one uppercase, lowercase, number and special character.)." },
          { status: 400 }
      );
    }

    const hashedPassword = await hashPassword(password);
    await updateUser(
      { _id: user._id },
      { $set: { password: hashedPassword }, $unset: { resetPassword: "" } },
    );

    return NextResponse.json(
      { message: "Password has been successfully updated." },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error", details: error },
      { status: 500 },
    );
  }
}
