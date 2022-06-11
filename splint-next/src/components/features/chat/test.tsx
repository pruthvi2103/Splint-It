import React, { useState } from "react";
import useChat from "../../../hooks/useChat";

const ChatTest = ({ roomId }: { roomId: string }) => {
  const [chat, setChat] = useState("");
  const { messages, sendMessage } = useChat(roomId);
  console.log(messages);

  return (
    <div>
      Test Chat
      <input
        type="text"
        onChange={(e) => {
          setChat(e.target.value);
        }}
      />
      <button
        onClick={() => {
          sendMessage(chat);
          setChat("");
        }}
      >
        Chat!
      </button>
      <ul>
        {messages.map((message, idx) => (
          <li key={`${message.senderId}-idx`}>
            {message.ownedByCurrentUser ? "me:" : "other:"} {message.body}
          </li>
        ))}
      </ul>
    </div>
  );
};

export { ChatTest };
