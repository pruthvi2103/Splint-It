import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import socketIOClient, { Socket } from "socket.io-client";

const USER_JOIN_EVENT = "userJoin";
const USER_LEAVE_EVENT = "userLeave";
const SOCKET_SERVER_URL =
  process.env.NEXT_WS_URL || "http://localhost:4000/user-room";

const useOnlineUsers = () => {
  const { data: session, status } = useSession();
  const [onlineUsers, setOnlineUsers] = useState<any[]>([]); // Sent and received messages
  const socketRef = useRef<Socket>();
  const beOnline = () => {
    socketRef?.current?.emit(USER_JOIN_EVENT, {
      email: session?.user?.email,
      name: session?.user?.name,
      image: session?.user?.image,
    });
  };
  useEffect(() => {
    if (status !== "loading") {
      // Creates a WebSocket connection
      socketRef.current = socketIOClient(SOCKET_SERVER_URL, {});

      beOnline();

      // Listens for incoming messages
      socketRef.current.on(USER_JOIN_EVENT, (data) => {
        // const incomingMessage = {
        //   ...message,
        //    ownedByCurrentUser: message?.sentBy?.email === session?.user?.email,
        // }

        setOnlineUsers(data);
      });
      socketRef.current.on(USER_LEAVE_EVENT, (data) => {
        // const incomingMessage = {
        //   ...message,
        //    ownedByCurrentUser: message?.sentBy?.email === session?.user?.email,
        // }

        setOnlineUsers(data);
      });
      // Destroys the socket reference
      // when the connection is closed
    }
    return () => {
      socketRef?.current?.emit(USER_LEAVE_EVENT, {
        email: session?.user?.email,
        name: session?.user?.name,
        image: session?.user?.image,
      });
      socketRef?.current?.disconnect();
    };
  }, [status]);

  // Sends a message to the server that
  // forwards it to all users in the same room

  return { beOnline, onlineUsers };
};

export default useOnlineUsers;
