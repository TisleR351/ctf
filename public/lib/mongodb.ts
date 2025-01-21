import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI!);
const dbName = process.env.MONGODB_DB_NAME!;

let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  clientPromise = client.connect();
} else {
  clientPromise = client.connect();
}

export const getClient = async () => {
  return await clientPromise;
};

export const getDb = async () => {
  const client = await getClient();
  return client.db(dbName);
};
