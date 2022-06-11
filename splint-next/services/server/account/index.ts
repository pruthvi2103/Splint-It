import { getCollectionFromDB } from "../db/helpers";
import clientPromise from "../db/mongoDb";
import { ITeacherCollection, IUserAccount, UserRoles } from "./account.types";

export const getUserAccountType = async (email: IUserAccount["email"]) => {
  try {
    if (clientPromise) {
      const accounts = await getCollectionFromDB<ITeacherCollection>(
        "teachers"
      );
      const userAccount = await accounts.findOne({ email });
      if (userAccount) {
        return UserRoles.TEACHER;
      } else {
        return UserRoles.STUDENT;
      }
    } else {
      throw "Issue with db connection";
    }
  } catch (error) {
    throw error;
  }
};
