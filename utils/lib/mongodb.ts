import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
const dbName = process.env.MONGODB_DB_NAME!;

if (!uri || !dbName) {
  throw new Error("Please define the MONGODB_URI and MONGODB_DB_NAME environment variables inside .env.local");
}

let cachedClient: MongoClient | null = null;
let cachedDb: any = null;

export const getClient = async (): Promise<MongoClient> => {
  if (cachedClient) {
    return cachedClient;
  }

  try {
    const client = new MongoClient(uri, {
      maxPoolSize: 10, // Ajustez ce nombre en fonction de votre besoin
      minPoolSize: 2,  // Maintient un minimum de connexions ouvertes
    });
    cachedClient = await client.connect();
    return cachedClient;
  } catch (error) {
    throw new Error(`Failed to connect to database`);
  }
};

export const getDb = async () => {
  if (cachedDb) {
    return cachedDb;
  }

  const client = await getClient();
  cachedDb = client.db(dbName);
  return cachedDb;
};
