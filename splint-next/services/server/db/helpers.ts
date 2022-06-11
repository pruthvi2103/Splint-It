import { Collection, MongoClient } from "mongodb";
import clientPromise from "./mongoDb";

export const getCollectionFromDB = async <T>(
  collection: string
): Promise<Collection<T>> => {
  const databaseConn = await (clientPromise as unknown as Promise<MongoClient>);
  const database = databaseConn.db("test");
  return database.collection<T>(collection);
};
