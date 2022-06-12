import {
  ICreateTicketPayload,
  IUpdateTicketPayload,
} from "../../server/tickets/ticket.types";
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
export const getAllTickets = async () => {
  const res = await httpService.get(`${BASE_URL}/all`);
  return res.data;
};
export const getActiveTicketForMentor = async () => {
  const res = await httpService.get(`${BASE_URL}`);
  return res.data;
};
export const getAssignedTicket = async () => {
  const res = await httpService.get(`${BASE_URL}/mentor`);
  return res.data;
};
export const assignTicket = async (payload: IUpdateTicketPayload) => {
  const res = await httpService.put(`${BASE_URL}`, payload);
  return res.data;
};
