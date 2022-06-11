import express, { Request, Response } from "express";
import { Socket, Server } from "socket.io";

const app = express();
const server = require("http").Server(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
const port = 4000;
app.get("/", (req: Request, res: Response) => {
  res.json({ data: "hello world" });
});
io.on("connection", (socket: Socket) => {
  const { roomId } = socket.handshake.query;
  if (roomId) {
    socket.join(roomId);

    // Listen for new messages
    socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
      io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
    });

    // Leave the room if the user closes the socket
    socket.on("disconnect", () => {
      socket.leave(roomId as unknown as string);
    });
  }
});
server.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);
