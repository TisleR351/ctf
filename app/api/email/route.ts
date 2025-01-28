import { NextResponse } from "next/server";
import { Client } from "ssh2";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { to, subject, message } = body;

    // Vérification des champs
    if (!to || !subject || !message) {
      return NextResponse.json(
        { error: "Les champs 'to', 'subject', et 'message' sont requis." },
        { status: 400 }
      );
    }

    // Configuration de la connexion SSH
    const sshConfig = {
      host: "20.199.24.144",    // Adresse IP ou domaine du serveur
      port: 22,                // Port SSH (22 par défaut)
      username: "grgrebr",     // Nom d'utilisateur SSH (NE PAS CHANGER)
      password: "VMAZURE?Greg1701!$", // Mot de passe SSH (NE PAS CHANGER)
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

    // Établissement de la connexion et exécution de la commande
    const result = await new Promise<string>((resolve, reject) => {
      conn
        .on("ready", async () => {
          console.log("Connexion SSH établie!");
          try {
            // Construction de la commande d'envoi d'e-mail via sendmail
            // On force l'enveloppe d'expédition et l'entête "From" à no-reply@ectf.fr
            const emailCommand = `echo -e "From: no-reply@ectf.fr\\nTo: ${to}\\nSubject: ${subject}\\n\\n${message}" | sendmail -t -f no-reply@ectf.fr`;

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

    // Si tout s'est bien passé, on renvoie la réponse
    return NextResponse.json(
      { message: "E-mail envoyé avec succès!", output: result },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Erreur dans l'API:", errorMessage);

    return NextResponse.json(
      { error: "Erreur interne du serveur", details: errorMessage },
      { status: 500 }
    );
  }
}
