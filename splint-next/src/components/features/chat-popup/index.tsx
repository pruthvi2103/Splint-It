import Image from 'next/image';
import React, { useState } from 'react';

const ChatPopUp = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  return (
    <>
      {/* Chat button */}
      {!isChatOpen && (
        <div className='fixed bottom-1 right-6 z-50' onClick={() => setIsChatOpen(true)}>
          <Image src='/splint-logo.svg' alt='chat-logo' height={100} width={100} className='cursor-pointer' />
          <div className='absolute py-2 speech-bubble px-2 -top-11 right-2 w-36 bg-teal-400 rounded-lg'>
            <p className='text-base font-medium text-gray-800'>Need help?</p>
            <p className='text-xs font-medium -mt-1 text-gray-800'>Chat with us, here!</p>
            {/* TODO: add a close btn for the pop-up */}
          </div>
        </div>
      )}
      {/* chat popup modal */}
      {isChatOpen && (
        <div
          className='fixed h-2/3 w-80 bottom-4 right-4 rounded-xl bg-white z-50 box-shadow-01'
          // onClick={() => {
          //   setIsChatOpen(false);
          // }}
        >
          {/* chat header */}
          <div className=' h-1/5 rounded-t-lg bg-teal-400 p-3'>
            <p>Questions? Chat with us!</p>
            <p></p>
          </div>
          {/* chat area */}
          <div className=' h-4/5 rounded-b-lg bg-white p-3'>Test</div>
        </div>
      )}
    </>
  );
};

export default ChatPopUp;
