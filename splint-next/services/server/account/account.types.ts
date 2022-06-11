export enum UserRoles {
  STUDENT = "student",
  TEACHER = "teacher",
}
export enum Subjects {
  MATHS = "maths",
  PHYSICS = "physics",
  CHEMISTRY = "chemistry",
}
export interface IUserAccount {
  email: string;
  role: UserRoles;
  subjects: Subjects;
}
export interface ITeacherCollection {
  email: IUserAccount["email"];
}
