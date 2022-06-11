import { MongoClient, MongoClientOptions } from "mongodb";

const uri = process.env.MONGODB_URI;
const options: MongoClientOptions = {};

let client;
let clientPromise: MongoClient | Promise<MongoClient> | undefined = undefined;

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise && uri) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  if (uri) {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
  }
  // In production mode, it's best to not use a global variable.
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;
