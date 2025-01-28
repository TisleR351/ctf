import { NextResponse } from "next/server";
import { getDb } from "@/utils/lib/mongodb";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { Client } from "ssh2";

// Interface pour le corps de la requête
interface RequestBody {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

// Extraction des variables d'environnement
const {
  SSH_HOST,
  SSH_PORT,
  SSH_USERNAME,
  SSH_PASSWORD,
  EMAIL_FROM,
  APP_NAME,
} = process.env;

export async function POST(request: Request) {
  try {
    const { email, username, password, confirmPassword } = (await request.json()) as RequestBody;

    // Vérification des champs requis
    if (!email || !username || !password || !confirmPassword) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 },
      );
    }

    // Vérification de la correspondance des mots de passe
    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: "Passwords do not match." },
        { status: 400 },
      );
    }

    // Validation du mot de passe
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{12,}$/;
    if (!passwordRegex.test(password)) {
      return NextResponse.json(
        {
          error:
            "The password must contain at least 12 characters, one uppercase, lowercase, number, and special character.",
        },
        { status: 400 },
      );
    }

    // Hashage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    const db = await getDb();

    // Vérification de l'existence de l'utilisateur
    const existingUser = await db.collection("user").findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email or username already exists." },
        { status: 400 },
      );
    }

    // Génération d'un token
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

    // Vérifier que les variables d'environnement SSH et Email sont définies
    if (!SSH_HOST || !SSH_PORT || !SSH_USERNAME || !SSH_PASSWORD) {
      console.error("SSH configuration is incomplete.");
      // Vous pouvez choisir de renvoyer une erreur ou de continuer sans envoyer l'email
    }

    if (!EMAIL_FROM || !APP_NAME) {
      console.error("Email configuration is incomplete.");
      // Vous pouvez choisir de renvoyer une erreur ou de continuer sans envoyer l'email
    }

    if (SSH_HOST && SSH_PORT && SSH_USERNAME && SSH_PASSWORD && EMAIL_FROM && APP_NAME) {
      // Configuration de la connexion SSH
      const sshConfig = {
        host: SSH_HOST,           // Adresse IP ou domaine du serveur
        port: Number(SSH_PORT),   // Port SSH (22 par défaut)
        username: SSH_USERNAME,   // Nom d'utilisateur SSH
        password: SSH_PASSWORD,   // Mot de passe SSH
        tryKeyboard: true,
      };

      const conn = new Client();

      /**
       * Exécute une commande sur la connexion SSH établie.
       * @param cmd Commande à exécuter
       * @returns Le contenu (string) retourné par la commande
       */
      const runCommand = async (cmd: string): Promise<string> => {
        return new Promise((resolve, reject) => {
          conn.exec(cmd, (err, stream) => {
            if (err) {
              return reject(`Erreur lors de l'exécution de la commande: ${err.message}`);
            }

            let output = "";
            let errorOutput = "";

            stream.on("data", (data: Buffer) => {
              output += data.toString();
            });

            // Récupération du flux d'erreur
            stream.stderr.on("data", (data: Buffer) => {
              errorOutput += data.toString();
            });

            // Quand la commande se termine
            stream.on("close", (code: number, signal: string) => {
              // On ferme la connexion juste après la fin de la commande
              conn.end();

              if (code === 0) {
                resolve(output);
              } else {
                // S'il y a un code de sortie != 0 ou un message d'erreur, on rejette
                const errMsg = errorOutput
                  ? `Erreur standard: ${errorOutput}`
                  : `Commande échouée (code: ${code}, signal: ${signal})`;
                reject(errMsg);
              }
            });
          });
        });
      };

      // Fonction pour envoyer l'email de bienvenue via SSH
      const sendWelcomeEmail = async () => {
        return new Promise<string>((resolve, reject) => {
          conn
            .on("ready", async () => {
              console.log("Connexion SSH établie!");

              try {
                // Construction de la commande d'envoi d'e-mail via sendmail
                // On force l'enveloppe d'expédition et l'entête "From" à EMAIL_FROM
                const subject = "Welcome to the ECTF!";
                const message = `Hello ${username},

Welcome to our Capture The Flag! We're excited to have you on board.

Best regards,
The ECTF Team`;

                // Échapper les caractères spéciaux dans l'email pour éviter des erreurs de commande
                const escapedEmail = email.replace(/(["\\])/g, '\\$1');

                const emailCommand = `echo -e "From: ${EMAIL_FROM}\\nTo: ${escapedEmail}\\nSubject: ${subject}\\n\\n${message}" | sendmail -t -f ${EMAIL_FROM}`;

                const cmdResult = await runCommand(emailCommand);
                resolve(cmdResult);
              } catch (error) {
                reject(error);
              }
            })
            .on("error", (err) => {
              reject(`Échec de la connexion SSH: ${err.message}`);
            })
            .connect(sshConfig);
        });
      };

      try {
        const emailResult = await sendWelcomeEmail();
        console.log("E-mail envoyé avec succès:", emailResult);
      } catch (emailError) {
        console.error("Erreur lors de l'envoi de l'e-mail de bienvenue:", emailError);
        // Vous pouvez choisir de renvoyer une erreur ou de continuer selon votre logique métier
        // Par exemple, ici nous continuons même si l'e-mail échoue
      }
    }

    // Si tout s'est bien passé, on renvoie la réponse
    return NextResponse.json(
      { message: "Sign up successfully. A welcome email has been sent." },
      { status: 201 },
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Erreur dans l'API:", errorMessage);

    return NextResponse.json(
      { error: "Internal server error", details: errorMessage },
      { status: 500 }
    );
  }
}
