import React from "react";
import ChatPopUp from "../../src/components/features/chat-popup";
import DemoPage from "../../src/components/features/demopage";
import useOnlineUsers from "../../src/hooks/useUserRoom";

const Demo = () => {
  const { beOnline, onlineUsers } = useOnlineUsers();
  return (
    <div className="relative max-w-full">
      <DemoPage />
      <ChatPopUp onlineUsers={onlineUsers} />
    </div>
  );
};

export default Demo;
Demo.requireAuth = true;
