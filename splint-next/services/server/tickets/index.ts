import { IUserAccount } from "../account/account.types";
import { getCollectionFromDB } from "../db/helpers";
import clientPromise from "../db/mongoDb";
import {
  EscalationLevel,
  ICreateTicketPayload,
  ITicket,
  IUpdateTicketPayload,
  TicketStatus,
} from "./ticket.types";

export const createTicket = async ({
  query,
  subject,
  raisedBy,
}: ICreateTicketPayload) => {
  try {
    const tickets = await getCollectionFromDB<ITicket>("tickets");
    const ticketData: ITicket = {
      escalationLevel: EscalationLevel.AUTOMATED,
      query: query,
      subject: subject,
      status: TicketStatus.PENDING,
      raisedBy,
    };
    const ticketResult = await tickets.insertOne({
      ...ticketData,
    });
    return { ...ticketData, ...ticketResult };
  } catch (error) {
    throw error;
  }
};
export const getAllPendingTickets = async () => {
  const tickets = await getCollectionFromDB<ITicket>("tickets");
  const allTickets = await tickets
    .find({
      status: { $ne: TicketStatus.COMPLETED },
    })
    .toArray();

  return allTickets;
};
export const getAssignedTicket = async (email: IUserAccount["email"]) => {
  const tickets = await getCollectionFromDB<ITicket>("tickets");
  const allTickets = await tickets
    .find({
      status: TicketStatus.ONGOING,
      asigneee: email,
    })
    .toArray();

  return allTickets;
};
export const getActiveTicketForStudent = async (
  email: IUserAccount["email"]
) => {
  const tickets = await getCollectionFromDB<ITicket>("tickets");
  const allTickets = await tickets
    .find({
      status: { $ne: TicketStatus.COMPLETED },
      raisedBy: email,
    })
    .toArray();

  return allTickets;
};
export const getAllTickets = async () => {
  const tickets = await getCollectionFromDB<ITicket>("tickets");
  const allTickets = await tickets.find({}).toArray();
  return allTickets;
};
export const updateTicket = async ({
  query,
  asigneee,
  chatHistory,
  escalationLevel,
  status,
  subject,
}: IUpdateTicketPayload) => {
  const tickets = await getCollectionFromDB<ITicket>("tickets");
  const ticket = await tickets.findOneAndUpdate(
    { query },
    {
      $set: {
        ...(asigneee && { asigneee }),
        ...(chatHistory && { chatHistory }),
        ...(escalationLevel && { escalationLevel }),
        ...(status && { status }),
        ...(subject && { subject }),
      },
    },
    { returnDocument: "after" }
  );
  return ticket.value;
};
