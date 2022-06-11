"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const mongodb_1 = require("mongodb");
const mongo_adapter_1 = require("@socket.io/mongo-adapter");
require("dotenv").config();
const DB = "test";
const COLLECTION = "socket.io-adapter-events";
const mongoClient = new mongodb_1.MongoClient(process.env.MONGODB_URI || "", {});
const activeUsers = [];
const conversations = {};
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    mongoClient.connect();
    try {
        yield mongoClient.db(DB).createCollection(COLLECTION, {
            capped: true,
            size: 1e6,
        });
    }
    catch (e) {
        // collection already exists
    }
    const mongoCollection = mongoClient.db(DB).collection(COLLECTION);
    const app = (0, express_1.default)();
    const server = require("http").Server(app);
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: "*",
        },
    });
    io.adapter((0, mongo_adapter_1.createAdapter)(mongoCollection));
    const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
    const USER_JOIN_EVENT = "userJoin";
    const USER_LEAVE_EVENT = "userLeave";
    app.get("/", (req, res) => {
        res.json({ data: "hello world" });
    });
    io.on("connection", (socket) => {
        const { roomId } = socket.handshake.query;
        if (roomId) {
            socket.join(roomId);
            if (conversations[roomId]) {
                io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, conversations[roomId]);
            }
            // Listen for new messages
            socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
                if (conversations[roomId]) {
                    conversations[roomId].push(Object.assign({}, data));
                }
                else {
                    conversations[roomId] = [Object.assign({}, data)];
                }
                io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, conversations[roomId]);
            });
            // Leave the room if the user closes the socket
            socket.on("disconnect", () => {
                socket.leave(roomId);
            });
        }
    });
    const teacherRoom = io.of("user-room");
    teacherRoom.on("connection", (socket) => {
        socket.join("user-room");
        // Listen for new messages
        // data= { name:"XYZ",type:"teacher",image:"a" }
        socket.on(USER_JOIN_EVENT, (data) => {
            activeUsers.push(data);
            teacherRoom.in("user-room").emit(USER_JOIN_EVENT, activeUsers);
        });
        socket.on(USER_LEAVE_EVENT, (data) => { });
        // Leave the room if the user closes the socket
        socket.on("disconnect", () => {
            socket.leave("user-room");
        });
    });
    server.listen(process.env.PORT, () => console.log(`Socket API Up on ${process.env.PORT}!`));
});
main();
