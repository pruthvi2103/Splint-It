import { MongoClient } from "mongodb";

declare global {
  var _mongoClientPromise: MongoClient | Promise<MongoClient>;
}
