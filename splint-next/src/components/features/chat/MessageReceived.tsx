import Image from 'next/image';
import React from 'react';

type Props = {
  userImage: string;
  message: string;
  time: string;
};

const MessageReceived: React.FC<Props> = ({ userImage, message, time }) => {
  return (
    <div className='flex items-end justify-start self-start pl-px mb-3'>
      <Image src={userImage} className='rounded-full' alt='sender' height={35} width={35} />
      <div className='flex flex-col bg-gray-100 p-3 rounded-md'>
        <p className='text-gray-800 text-sm'>{message}</p>
        <p className='self-end text-xxs -mb-1.5 mt-1 text-gray-500 font-medium'>{time}</p>
      </div>
    </div>
  );
};

export default MessageReceived;
