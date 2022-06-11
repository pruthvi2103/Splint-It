import {
  ITeacherCollection,
  IUserAccount,
  Subjects,
} from "../account/account.types";

export enum EscalationLevel {
  AUTOMATED = "automated",
  MENTOR_LEVEL = "mentor-level",
}
export enum TicketStatus {
  PENDING = "pending",
  ONGOING = "ongoing",
  COMPLETED = "completed",
  URGENT = "urgent",
}
export interface ITicket {
  _id?: string;
  query: string;
  chatHistory?: string;
  escalationLevel: EscalationLevel;
  status: TicketStatus;
  asigneee?: ITeacherCollection["email"];
  subject: Subjects;
  raisedBy: IUserAccount["email"];
}

export interface ICreateTicketPayload {
  query: ITicket["query"];
  subject: ITicket["subject"];
  raisedBy: IUserAccount["email"];
}
export interface IUpdateTicketPayload {
  query: Required<ITicket["query"]>;
  chatHistory?: string;
  escalationLevel?: EscalationLevel;
  status?: TicketStatus;
  asigneee?: ITeacherCollection["email"];
  subject?: Subjects;
}
