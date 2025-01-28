import { Client } from "ssh2";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { getDb } from "@/utils/lib/mongodb";

const { SSH_HOST, SSH_PORT, SSH_USERNAME, SSH_PASSWORD, EMAIL_FROM } =
  process.env;

if (!SSH_HOST || !SSH_PORT || !SSH_USERNAME || !SSH_PASSWORD || !EMAIL_FROM) {
  throw new Error("SSH configuration is missing in environment variables.");
}

// Hachage de mot de passe
export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, 10);
};

// Validation de mot de passe
export const validatePassword = (password: string): boolean => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{12,}$/;
  return passwordRegex.test(password);
};

// Génération d'un token unique
export const generateToken = (): string =>
  crypto.randomBytes(32).toString("hex");

// Connexion SSH et exécution de commande
export const executeSSHCommand = (command: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const conn = new Client();
    conn
      .on("ready", () => {
        conn.exec(command, (err, stream) => {
          if (err) {
            reject(`SSH Command Execution Error: ${err.message}`);
            return;
          }

          let output = "";
          let errorOutput = "";

          stream.on("data", (data: Buffer) => (output += data.toString()));
          stream.stderr.on(
            "data",
            (data: Buffer) => (errorOutput += data.toString()),
          );

          stream.on("close", (code: number) => {
            conn.end();
            if (code === 0) {
              resolve(output);
            } else {
              reject(`Command failed with code ${code}: ${errorOutput}`);
            }
          });
        });
      })
      .on("error", (err) => reject(`SSH Connection Error: ${err.message}`))
      .connect({
        host: SSH_HOST,
        port: Number(SSH_PORT),
        username: SSH_USERNAME,
        password: SSH_PASSWORD,
        tryKeyboard: true,
      });
  });
};

// Envoi d'e-mail via SSH
export const sendEmail = async (
  to: string,
  subject: string,
  message: string,
): Promise<void> => {
  const escapedEmail = to.replace(/(["\\])/g, "\\$1");
  const emailCommand = `echo -e "From: ${EMAIL_FROM}\\nTo: ${escapedEmail}\\nSubject: ${subject}\\n\\n${message}" | sendmail -t -f ${EMAIL_FROM}`;
  await executeSSHCommand(emailCommand);
};

// Vérification de l'utilisateur dans la base de données
export const findUserByEmail = async (email: string) => {
  const db = await getDb();
  return db.collection("user").findOne({ email });
};

// Mise à jour de l'utilisateur dans la base de données
export const updateUser = async (query: object, update: object) => {
  const db = await getDb();
  return db.collection("user").updateOne(query, update);
};
