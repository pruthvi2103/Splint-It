import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import socketIOClient, { Socket } from "socket.io-client";

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage"; // Name of the event
const MENTOR_CONNECTED = "mentorConnected";
const SOCKET_SERVER_URL = process.env.NEXT_WS_URL || "http://localhost:4000";

const useChat = (roomId: string) => {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<any[]>([]); // Sent and received messages
  const socketRef = useRef<Socket>();

  useEffect(() => {
    // Creates a WebSocket connection
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomId },
    });
    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {});
    // Listens for incoming messages
    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
      // const incomingMessage = {
      //   ...message,
      //    ownedByCurrentUser: message?.sentBy?.email === session?.user?.email,
      // };
      console.log(message);

      setMessages((messages) => message);
    });

    // Destroys the socket reference
    // when the connection is closed
    return () => {
      socketRef?.current?.disconnect();
    };
  }, [roomId]);

  // Sends a message to the server that
  // forwards it to all users in the same room
  const sendMessage = (messageBody: string) => {
    socketRef?.current?.emit(NEW_CHAT_MESSAGE_EVENT, {
      body: messageBody,
      sentBy: {
        email: session?.user?.email,
        name: session?.user?.name,
        image: session?.user?.image,
      },
    });
  };

  return { messages, sendMessage, userEmail: session?.user?.email };
};

export default useChat;
