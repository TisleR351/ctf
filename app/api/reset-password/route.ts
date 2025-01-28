import { NextResponse } from "next/server";
import { getDb } from "@/utils/lib/mongodb";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    // Récupérer les données envoyées par le client
    const body = await request.json();
    const { token, password } = body;

    // Vérification de la présence des champs nécessaires
    if (!token || !password) {
      return NextResponse.json(
        { error: "Token and new password are required." },
        { status: 400 },
      );
    }

    // Connexion à la base de données
    const db = await getDb();

    // Rechercher l'utilisateur par le token et vérifier son expiration
    const user = await db.collection("user").findOne({
      passwordResetToken: token,
      passwordResetExpires: { $gt: new Date() }, // Vérifier si le token est toujours valide
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired token." },
        { status: 400 },
      );
    }

    // Hashage du nouveau mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Mise à jour du mot de passe de l'utilisateur et suppression du token
    await db.collection("user").updateOne(
      { _id: user._id },
      {
        $set: { password: hashedPassword },
        $unset: { passwordResetToken: "", passwordResetExpires: "" },
      },
    );

    return NextResponse.json(
      { message: "Password has been successfully updated." },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error: `${error}` }, { status: 500 });
  }
}
