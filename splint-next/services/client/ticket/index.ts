import { ICreateTicketPayload } from "../../server/tickets/ticket.types";
import { httpService } from "../http";

const BASE_URL = "/api/tickets";
export const createTicket = async (payload: ICreateTicketPayload) => {
  const res = await httpService.post<ICreateTicketPayload>(BASE_URL, payload);
  return res.data;
};
export const getActiveTicketsForStudent = async () => {
  const res = await httpService.get(`${BASE_URL}/me`);
  return res.data;
};
