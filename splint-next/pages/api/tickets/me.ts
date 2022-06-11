import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import {
  getActiveTicketForStudent,
  getAllTickets,
} from "../../../services/server/tickets";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getSession({ req });

    if (session) {
      const ticketData = await getActiveTicketForStudent(session.user?.email!);
      res.status(200).json(ticketData);
    } else {
      res.status(401).json({ message: "not authorized" });
    }
  } catch (error) {}
}
