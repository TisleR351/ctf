import {NextResponse} from "next/server";


export async function POST(request: Request) {
  // const authHeader = request.headers.get("Authorization");
  //
  // if (!authHeader || !authHeader.startsWith("Bearer ")) {
  //   return NextResponse.json(
  //     { error: "Authorization header missing or malformed." },
  //     { status: 401 },
  //   );
  // }
  //
  // const token = authHeader.split(" ")[1];
  //
  // try {
  //   const db = await getDb();
  //
  //   const user = await db.collection("user").findOne({ token });
  //
  //   if (!user) {
  //     return NextResponse.json({ error: "User not found." }, { status: 404 });
  //   }
  //
  //   if (!user.team) {
  //     return NextResponse.json(
  //       {
  //         error: "User is not associated with any team. Participation denied.",
  //       },
  //       { status: 403 },
  //     );
  //   }
  //
  //   // Vérification de l'existence de l'équipe
  //   const team = await db
  //     .collection("teams")
  //     .findOne({ _id: new ObjectId(user.team) });
  //
  //   if (!team) {
  //     return NextResponse.json(
  //       { error: "Team does not exist." },
  //       { status: 404 },
  //     );
  //   }
  //
  //   const body = await request.json();
  //   const { attempt, challenge_id } = body;
  //
  //   // Validation des paramètres
  //   if (!attempt || !challenge_id) {
  //     return NextResponse.json(
  //       { error: "Both 'attempt' and 'challenge_id' are required." },
  //       { status: 400 },
  //     );
  //   }
  //
  //   // Récupération du challenge
  //   const challenge = await db
  //     .collection("challenge")
  //     .findOne({ _id: new ObjectId(challenge_id) });
  //
  //   if (!challenge) {
  //     return NextResponse.json(
  //       { error: "Challenge not found." },
  //       { status: 404 },
  //     );
  //   }
  //
  //   const isCorrectFlag = challenge.flag.includes(attempt);
  //
  //   if (!team.tried_challenges) {
  //     team.tried_challenges = [];
  //   }
  //
  //   const triedChallenge = team.tried_challenges.find(
  //     (ch: { challenge_id: string }) => ch.challenge_id === challenge_id,
  //   );
  //
  //   if (triedChallenge) {
  //     if (triedChallenge.flag) {
  //       return NextResponse.json(
  //         {
  //           error:
  //             "This challenge has already been completed. No additional points awarded.",
  //         },
  //         { status: 403 },
  //       );
  //     } else {
  //       if (!isCorrectFlag) {
  //         await db
  //           .collection("teams")
  //           .updateOne(
  //             { _id: team._id, "tried_challenges.challenge_id": challenge_id },
  //             { $inc: { "tried_challenges.$.attempts": 1 } },
  //           );
  //         return NextResponse.json(
  //           { message: "Incorrect flag. Attempt count incremented." },
  //           { status: 422 },
  //         );
  //       } else {
  //         await db.collection("teams").updateOne(
  //           { _id: team._id, "tried_challenges.challenge_id": challenge_id },
  //           {
  //             $set: { "tried_challenges.$.flag": attempt },
  //             $inc: { "tried_challenges.$.attempts": 1 },
  //           },
  //         );
  //         await db
  //           .collection("user")
  //           .updateOne(
  //             { _id: user._id },
  //             { $inc: { points: challenge.points } },
  //           );
  //         await db
  //           .collection("teams")
  //           .updateOne(
  //             { _id: team._id },
  //             { $inc: { points: challenge.points } },
  //           );
  //         return NextResponse.json(
  //           { message: "Challenge successfully completed. Points awarded." },
  //           { status: 200 },
  //         );
  //       }
  //     }
  //   } else {
  //     if (!isCorrectFlag) {
  //       await db.collection("teams").updateOne(
  //         { _id: team._id },
  //         {
  //           $addToSet: {
  //             tried_challenges: {
  //               challenge_id,
  //               flag: undefined,
  //               attempts: 1,
  //             },
  //           },
  //         },
  //       );
  //       return NextResponse.json(
  //         { message: "Incorrect flag. Challenge added to tried list." },
  //         { status: 422 },
  //       );
  //     } else {
  //       await db.collection("teams").updateOne(
  //         { _id: team._id },
  //         {
  //           $addToSet: {
  //             tried_challenges: { challenge_id, flag: attempt, attempts: 1 },
  //           },
  //           $inc: { points: challenge.points },
  //         },
  //       );
  //       await db
  //         .collection("user")
  //         .updateOne({ _id: user._id }, { $inc: { points: challenge.points } });
  //       return NextResponse.json(
  //         { message: "Challenge successfully completed. Points awarded." },
  //         { status: 200 },
  //       );
  //     }
  //   }
  // } catch (error) {
  //   return NextResponse.json({ error: error }, { status: 500 });
  // }


    return NextResponse.json(
      { error: "Nice try! But it's too late to submit any flag! ;) You can post your trophy on discord. Open a ticket and we'll had 100 points to your team" },
      { status: 404 },
    );
}
