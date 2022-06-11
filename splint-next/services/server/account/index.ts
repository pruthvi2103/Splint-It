import { MongoClient } from "mongodb";
import clientPromise from "../db/mongoDb";
import { ITeacherCollection, IUserAccount } from "./account.types";

export const getUserAccountType = async (email: IUserAccount["email"]) => {
  try {
    if (clientPromise) {
      const databaseConn =
        await (clientPromise as unknown as Promise<MongoClient>);
      const database = databaseConn.db("test");
      const accounts = database.collection<ITeacherCollection>("teachers");
      const userAccount = await accounts.findOne({ email });
      if (userAccount) {
        return "teacher";
      } else {
        return "student";
      }
    } else {
      throw "Issue with db connection";
    }
  } catch (error) {
    throw error;
  }
};
