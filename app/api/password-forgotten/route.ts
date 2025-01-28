import { NextResponse } from "next/server";
import {
  generateToken,
  updateUser,
  sendEmail,
  findUserByEmail,
} from "@/utils/services/apiServices";

export async function POST(request: Request) {
  try {
    const { to } = await request.json();

    if (!to) {
      return NextResponse.json(
        { error: "E-mail must be provided." },
        { status: 400 },
      );
    }

    const user = await findUserByEmail(to);

    if (!user) {
      return NextResponse.json(
        { error: "User with provided e-mail does not exist." },
        { status: 404 },
      );
    }

    const token = generateToken();
    const expirationDate = new Date(Date.now() + 30 * 60 * 1000);

    await updateUser(
      { email: to },
      {
        $set: {
          "resetPassword.token": token,
          "resetPassword.expiresAt": expirationDate,
        },
      },
    );

    const subject = "Password Reset Request";
    const message = `Hello,\n\nClick the link to reset your password:\nhttps://ectf.fr/reset-password?token=${token}\n\nThis link expires in 30 minutes.`;

    await sendEmail(to, subject, message);

    return NextResponse.json(
      { message: "Password reset email sent." },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error", details: error },
      { status: 500 },
    );
  }
}
