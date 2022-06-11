import React from 'react';
import MessageReceived from './MessageReceived';
import MessageSent from './MessageSent';
import type { chat } from './../chat-popup/index';
import { IoIosSend } from 'react-icons/io';

type Props = {
  chats: chat[];
};

const MessageArea: React.FC<Props> = ({ chats }) => {
  return (
    <div className=' h-4/5 rounded-b-md bg-white  z-50 relative overflow-hidden'>
      {/* messages */}
      <div className='overflow-y-auto h-5/6 p-3 pt-2 '>
        {chats.map((chat) => {
          if (chat.isSent) {
            return <MessageSent message={chat.message} userImage={chat.userImage} time={chat.time} />;
          } else {
            return <MessageReceived message={chat.message} userImage={chat.userImage} time={chat.time} />;
          }
        })}
      </div>

      {/* Chat controls */}
      <div className=' w-full h-1/6 absolute bottom-0 -mb-4 flex border-t border-gray-200'>
        <textarea
          placeholder='Enter your message...'
          className='w-10/12	py-2 px-3 outline-none leading-5 text-gray-700'
        />
        <div className='w-2/12 border-gray-200 flex items-center justify-start'>
          <IoIosSend size={40} className='-mt-3.5  cursor-pointer' />
        </div>
      </div>
    </div>
  );
};

export default MessageArea;
