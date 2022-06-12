import { getSession } from "next-auth/react";
import { getAssignedTicket } from "../../../services/server/tickets";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getSession({ req });

    if (session) {
      const ticketData = await getAssignedTicket(session.user.email);
      res.status(200).json(ticketData);
    }
  } catch (error) {}
}
