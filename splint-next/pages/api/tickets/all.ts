import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { getAllTickets } from "../../../services/server/tickets";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // const session = await getSession({ req });

    if (true) {
      const ticketData = await getAllTickets();
      res.status(200).json(ticketData);
    }
  } catch (error) {}
}
