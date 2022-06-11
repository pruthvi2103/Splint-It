import { getUserAccountType } from "../account";
import { IUserAccount, UserRoles } from "../account/account.types";

export const isTeacher = async (email: IUserAccount["email"]) => {
  if ((await getUserAccountType(email)) === UserRoles.TEACHER) {
    return true;
  }
  return false;
};
