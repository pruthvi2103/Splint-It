import React, { useState } from "react";
import MessageReceived from "./MessageReceived";
import MessageSent from "./MessageSent";
import type { chat } from "./../chat-popup/index";
import { IoIosSend } from "react-icons/io";
import useChat from "../../../hooks/useChat";

type Props = {
  activeTicketData: any;
};

const MessageArea: React.FC<Props> = ({ activeTicketData }) => {
  const { messages, sendMessage, userEmail } = useChat(activeTicketData._id);
  const [messageText, setMessageText] = useState("");
  return (
    <div className=" h-4/5 rounded-b-md bg-white  z-50 relative overflow-hidden">
      {/* messages */}
      <div className="overflow-y-auto h-5/6 p-3 pt-2 ">
        {messages.map((message) => {
          if (message.notification) {
            return (
              <p className="text-center text-gray-200">
                {message.notification}
              </p>
            );
          }
          if (message.sentBy.email === userEmail) {
            return (
              <MessageSent
                message={message.body}
                userImage={message.sentBy.image}
                time={"12:12"}
              />
            );
          } else {
            return (
              <MessageReceived
                message={message.sentBy.body}
                userImage={message.sentBy.image}
                time={"12:12"}
              />
            );
          }
        })}
      </div>

      {/* Chat controls */}
      <div className=" w-full h-1/6 absolute bottom-0 -mb-4 flex border-t border-gray-200">
        <textarea
          onChange={(e) => {
            setMessageText(e.target.value);
          }}
          value={messageText}
          placeholder="Enter your message..."
          className="w-10/12	py-2 px-3 outline-none leading-5 text-gray-700"
        />
        <div className="w-2/12 border-gray-200 flex items-center justify-start">
          <IoIosSend
            size={40}
            onClick={() => {
              sendMessage(messageText);
              setMessageText("");
            }}
            className="-mt-3.5  cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default MessageArea;
