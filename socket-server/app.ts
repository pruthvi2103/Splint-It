import express, { Request, Response } from "express";
import { Socket, Server } from "socket.io";
import { MongoClient } from "mongodb";
import { createAdapter } from "@socket.io/mongo-adapter";
import { containsObject, removeByAttr } from "./utils";
require("dotenv").config();
const DB = "test";
const COLLECTION = "socket.io-adapter-events";

const mongoClient = new MongoClient(process.env.MONGODB_URI || "", {});
let activeUsers: {
  name: string;
  type: string;
  image: string;
  subject: string;
  email: string;
}[] = [];
interface Imessage {
  body: string;
  sentBy: { name: string; email: string };
}
const conversations: Record<string, Imessage[]> = {};
const main = async () => {
  mongoClient.connect();
  try {
    await mongoClient.db(DB).createCollection(COLLECTION, {
      capped: true,
      size: 1e6,
    });
  } catch (e) {
    // collection already exists
  }
  const mongoCollection = mongoClient.db(DB).collection(COLLECTION);
  const app = express();
  const server = require("http").Server(app);
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });
  io.adapter(createAdapter(mongoCollection));

  const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
  const USER_JOIN_EVENT = "userJoin";
  const USER_LEAVE_EVENT = "userLeave";
  app.get("/", (req: Request, res: Response) => {
    res.json({ data: "hello world" });
  });
  io.on("connection", (socket: Socket) => {
    const { roomId } = socket.handshake.query;
    if (roomId) {
      socket.join(roomId);
      if (conversations[roomId as unknown as string]) {
        io.in(roomId).emit(
          NEW_CHAT_MESSAGE_EVENT,
          conversations[roomId as unknown as string]
        );
      }
      // Listen for new messages
      socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
        if (conversations[roomId as unknown as string]) {
          conversations[roomId as unknown as string].push({ ...data });
        } else {
          conversations[roomId as unknown as string] = [{ ...data }];
        }

        io.in(roomId).emit(
          NEW_CHAT_MESSAGE_EVENT,
          conversations[roomId as unknown as string]
        );
      });

      // Leave the room if the user closes the socket
      socket.on("disconnect", () => {
        socket.leave(roomId as unknown as string);
      });
    }
  });
  const teacherRoom = io.of("user-room");
  teacherRoom.on("connection", (socket: Socket) => {
    socket.join("user-room");
    // Listen for new messages
    // data= { name:"XYZ",type:"teacher",image:"a" }
    socket.on(USER_JOIN_EVENT, (data) => {
      if (!containsObject(data, activeUsers)) {
        activeUsers.push(data);
      }

      teacherRoom.in("user-room").emit(USER_JOIN_EVENT, activeUsers);
    });
    socket.on(USER_LEAVE_EVENT, (data) => {
      activeUsers = removeByAttr(activeUsers, "email", data.email) as {
        name: string;
        type: string;
        image: string;
        subject: string;
        email: string;
      }[];
    });

    // Leave the room if the user closes the socket
    socket.on("disconnect", () => {
      socket.leave("user-room" as unknown as string);
    });
  });
  server.listen(process.env.PORT, () =>
    console.log(`Socket API Up on ${process.env.PORT}!`)
  );
};

main();
