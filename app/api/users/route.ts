import { NextResponse } from "next/server";
import { getDb } from "@/public/lib/mongodb";

export async function GET() {
  try {
    const db = await getDb();
    const items = await db.collection("users").find().toArray();
    return NextResponse.json(items);
  } catch (error) {
    console.error("Erreur MongoDB:", error);
    return NextResponse.json(
      { error: "Impossible de récupérer les éléments" },
      { status: 500 },
    );
  }
}
