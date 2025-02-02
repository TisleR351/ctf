import { NextResponse } from "next/server";
import { getDb } from "@/utils/lib/mongodb";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const groupBy = url.searchParams.get("group_by");

  try {
    const db = await getDb();

    // Obtenez le nombre total d'équipes
    const totalTeamsCount = await db.collection("teams").countDocuments();

    if (groupBy === "category") {
      const groupedChallenges = await db
          .collection("challenge")
          .aggregate([
            {
              $lookup: {
                from: "teams", // Joindre la collection teams
                let: { challenge_id: "$_id" }, // Passer l'_id du challenge à la jointure
                pipeline: [
                  {
                    $unwind: "$tried_challenges", // Décomposer le tableau "tried_challenges"
                  },
                  {
                    // Convertir le "challenge_id" en ObjectId pour comparer
                    $addFields: {
                      "tried_challenges.challenge_id": {
                        $toObjectId: "$tried_challenges.challenge_id"
                      }
                    }
                  },
                  {
                    $match: {
                      $expr: {
                        $eq: ["$tried_challenges.challenge_id", "$$challenge_id"], // Assurer que l'ID du challenge correspond
                      },
                      "tried_challenges.flag": { $ne: null }, // Ne conserver que les réussites (flag != null)
                    },
                  },
                  {
                    $group: {
                      _id: "$_id", // Regrouper par team
                    },
                  },
                ],
                as: "teamsSucceeded", // Liste des équipes ayant réussi ce challenge
              },
            },
            {
              $addFields: {
                teamsSucceededCount: { $size: "$teamsSucceeded" }, // Compter le nombre de teams ayant réussi
                successPercentage: {
                  $cond: {
                    if: { $eq: [totalTeamsCount, 0] },
                    then: 0,
                    else: {
                      $round: [
                        { $multiply: [{ $divide: [{ $size: "$teamsSucceeded" }, totalTeamsCount] }, 100] },
                        2
                      ]
                    }
                  }
                } // Calculer le pourcentage de réussite et arrondir à deux chiffres
              },
            },
            {
              $group: {
                _id: "$category", // Regrouper par catégorie
                challenges: { $push: "$$ROOT" }, // Rassembler les challenges sous chaque catégorie
              },
            },
            { $project: { _id: 0, category: "$_id", challenges: 1 } }, // Retirer le champ _id
            {
              $addFields: {
                challenges: {
                  $map: {
                    input: "$challenges",
                    as: "challenge",
                    in: {
                      _id: "$$challenge._id",
                      name: "$$challenge.name",
                      category: "$$challenge.category",
                      description: "$$challenge.description",
                      points: "$$challenge.points",
                      author: "$$challenge.author",
                      file_url: "$$challenge.file_url",
                      teamsSucceededCount: "$$challenge.teamsSucceededCount", // Ajouter le nombre de teams ayant réussi
                      successPercentage: "$$challenge.successPercentage" // Ajouter le pourcentage de réussite
                    },
                  },
                },
              },
            },
          ])
          .toArray();

      return NextResponse.json(groupedChallenges, { status: 200 });
    }

    // Si "group_by" n'est pas défini ou est une valeur différente, retourner simplement les challenges
    const challenges = await db
        .collection("challenge")
        .find({}, { projection: { flag: 0 } })
        .toArray();

    return NextResponse.json(challenges, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
