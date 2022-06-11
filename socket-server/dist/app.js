"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
const server = require("http").Server(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
    },
});
const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
const port = 4000;
app.get("/", (req, res) => {
    res.json({ data: "hello world" });
});
io.on("connection", (socket) => {
    const { roomId } = socket.handshake.query;
    if (roomId) {
        socket.join(roomId);
        // Listen for new messages
        socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
            io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
        });
        // Leave the room if the user closes the socket
        socket.on("disconnect", () => {
            socket.leave(roomId);
        });
    }
});
server.listen(port, () => console.log(`Example app listening on port ${port}!`));
