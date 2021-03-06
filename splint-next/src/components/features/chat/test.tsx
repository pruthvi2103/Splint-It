import React, { useState } from 'react';
import useChat from '../../../hooks/useChat';

const ChatTest = ({ roomId }: { roomId: string }) => {
  const [chat, setChat] = useState('');
  const { messages, sendMessage, userEmail } = useChat(roomId);

  return (
    <div>
      Test Chat
      <input
        type='text'
        onChange={(e) => {
          setChat(e.target.value);
        }}
      />
      <button
        onClick={() => {
          sendMessage(chat);
          setChat('');
        }}
      >
        Chat!
      </button>
      <ul>
        {messages.map((message, idx) => (
          <li key={`${message.senderId}-idx`}>
            {message.sentBy.email === userEmail ? 'me:' : 'other:'} {message.body}
          </li>
        ))}
      </ul>
    </div>
  );
};

export { ChatTest };
