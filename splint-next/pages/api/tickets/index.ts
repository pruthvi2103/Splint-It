import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import {
  createTicket,
  getAllPendingTickets,
  getAllTickets,
  updateTicket,
} from "../../../services/server/tickets";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getSession({ req });

    if (session) {
      if (req.method === "POST") {
        try {
          const ticketData = await createTicket({
            ...req.body,
            raisedBy: session.user?.email,
          });
          res.status(200).json(ticketData);
        } catch (error) {
          res.status(500).json({ message: "server error", error });
        }
      }
      if (req.method === "GET") {
        try {
          const ticketData = await getAllPendingTickets();
          res.status(200).json(ticketData);
        } catch (error) {
          res.status(500).json({ message: "server error", error });
        }
      }
      if (req.method === "PUT") {
        try {
          const ticketData = await updateTicket(req.body);
          res.status(200).json(ticketData);
        } catch (error) {
          console.log(error);

          res.status(500).json({ message: "server error", error });
        }
      }
    } else {
      res.status(401).json({ message: "not authorized" });
    }
  } catch (error) {}
}
