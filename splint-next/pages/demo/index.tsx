import React from 'react';
import ChatPopUp from '../../src/components/features/chat-popup';
import DemoPage from '../../src/components/features/demopage';

const Demo = () => {
  return (
    <div className='relative max-w-full'>
      <DemoPage />
      <ChatPopUp />
    </div>
  );
};

export default Demo;
