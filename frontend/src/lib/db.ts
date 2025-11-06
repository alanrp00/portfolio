import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI!;
if (!uri) throw new Error("Missing MONGO_URI");

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// Reutiliza conexión en dev
const globalWithMongo = global as typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
};

if (process.env.NODE_ENV === "development") {
  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export async function getDb(dbName = "portfolio") {
  const c = await clientPromise;
  return c.db(dbName);
}
