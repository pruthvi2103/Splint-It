import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import socketIOClient, { Socket } from "socket.io-client";
import { teacherSubjects } from "../constants/teacher-subjects";

const USER_JOIN_EVENT = "userJoin";
const USER_LEAVE_EVENT = "userLeave";
const MENTOR_ASSIGN_EVENT = "mentorAssign";
const SOCKET_SERVER_URL =
  process.env.NEXT_PUBLIC_WS_URL || "http://localhost:4000";

const useOnlineUsers = () => {
  const { data: session, status } = useSession();
  const [onlineUsers, setOnlineUsers] = useState<any[]>([]); // Sent and received messages
  const [assignedTicket, seetAssignedTicket] = useState("");
  const socketRef = useRef<Socket>();
  const beOnline = () => {
    socketRef?.current?.emit(USER_JOIN_EVENT, {
      email: session?.user?.email,
      name: session?.user?.name,
      image: session?.user?.image,
      ...(session?.user?.type && { type: session.user?.type }),
      //@ts-ignore
      ...(teacherSubjects[session?.user.email] && {
        //@ts-ignore
        subjects: teacherSubjects[session?.user.email],
      }),
    });
  };
  const assignTicketToMentor = (mentorEmail) => {
    socketRef?.current?.emit(USER_LEAVE_EVENT, {
      email: mentorEmail,
    });
    socketRef.current?.emit(MENTOR_ASSIGN_EVENT, {
      email: mentorEmail,
    });
  };
  useEffect(() => {
    if (status !== "loading") {
      // Creates a WebSocket connection
      socketRef.current = socketIOClient(`${SOCKET_SERVER_URL}/user-room`, {});

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
      socketRef.current.on(MENTOR_ASSIGN_EVENT, (data) => {
        if (data.email === session?.user.email) {
          seetAssignedTicket(data.ticketId);
        }
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
