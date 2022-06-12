import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import MessageArea from "../chat/MessageArea";
import MessageReceived from "../chat/MessageReceived";
import MessageSent from "../chat/MessageSent";
import { AiOutlineClose } from "react-icons/ai";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { useSession } from "next-auth/react";
import { getActiveTicketsForStudent } from "../../../../services/client/ticket";
import CreateQueryArea from "../chat/CreateQueryArea";
import { createTicket } from "../../../../services/client/ticket";
import { ICreateTicketPayload } from "../../../../services/server/tickets/ticket.types";

interface chat {
  userImage: string;
  message: string;
  time: string;
  isSent: boolean;
}

const ChatPopUp = ({ onlineUsers }) => {
  console.log(onlineUsers);
  const { status, data: session } = useSession();
  const [activeTicketData, setActiveTicketData] = useState(undefined);
  const fetchTicketsForStudent = async () => {
    const res = await getActiveTicketsForStudent();
    if (res.length) {
      setActiveTicketData(res);
    }
  };
  const matchMakeActiveMentors = () => {
    onlineUsers.forEach((onLineUser) => {
      if (onLineUser.subjects.includes(activeTicketData.subject)) {
        assignRoomToMentor(activeTicketData._id);
      }
    });
  };
  useEffect(() => {
    if (status !== "loading") {
      fetchTicketsForStudent();
    }
  }, [status]);
  useEffect(() => {
    if (activeTicketData) {
      matchMakeActiveMentors();
    }
  }, [activeTicketData]);

  const [isChatOpen, setIsChatOpen] = useState(false);
  const chatRef = useRef(null);
  useClickOutside(chatRef, () => setIsChatOpen(false));
  const handleCreateTicket = async (ticketData: ICreateTicketPayload) => {
    const res = await createTicket(ticketData);
    setActiveTicketData(res);
  };
  return (
    <>
      {/* Chat button */}
      {!isChatOpen && (
        <div
          className="fixed bottom-1 right-6 z-50"
          onClick={() => setIsChatOpen(true)}
        >
          <Image
            src="/splint-logo.svg"
            alt="chat-logo"
            height={100}
            width={100}
            className="cursor-pointer"
          />
          <div className="absolute py-2 speech-bubble px-2 -top-11 right-2 w-36 bg-teal-400 rounded-lg">
            <p className="text-base font-medium text-gray-800">Need help?</p>
            <p className="text-xs font-medium -mt-1 text-gray-800">
              Chat with us, here!
            </p>
            {/* TODO: add a close btn for the pop-up */}
          </div>
        </div>
      )}
      {/* chat popup modal */}
      {isChatOpen && (
        <div
          ref={chatRef}
          className="fixed h-3/5 w-80 bottom-8 right-4 rounded-xl bg-white z-50 box-shadow-01 transition-all duration-500"
          // onClick={() => {
          //   setIsChatOpen(false);
          // }}
        >
          {/* chat header */}
          <div className=" h-22x rounded-t-md flex flex-col items-start justify-center self-center pattern-bg px-5 py-2.5 text-gray-800">
            <p className="m-0 text-base font-bold ">Questions? Chat with us!</p>
            <p className="m-0 text-xs -mt-px">
              Typically replies withing 15mins
            </p>
            <div className="mt-2.5  -mb-2">
              {onlineUsers.map((onlineUser) => (
                <span key={onlineUser.email} className="mr-2">
                  {console.log(onlineUser)}
                  {onlineUser?.image && (
                    <Image
                      className="rounded-full"
                      src={
                        onlineUser.image ||
                        "https://en.wikipedia.org/wiki/File:Sample_User_Icon.png"
                      }
                      alt="agent-image"
                      width={35}
                      height={35}
                    />
                  )}
                </span>
              ))}
            </div>
            <AiOutlineClose
              onClick={() => {
                setIsChatOpen(false);
              }}
              className="absolute top-2 right-2.5 cursor-pointer"
              size={20}
            />
          </div>
          {/* chat area */}
          {activeTicketData ? (
            <MessageArea activeTicketData={activeTicketData} />
          ) : (
            <CreateQueryArea handleCreateTicket={handleCreateTicket} />
          )}
        </div>
      )}
    </>
  );
};

export default ChatPopUp;

export type { chat };
