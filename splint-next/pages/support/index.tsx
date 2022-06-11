import React from "react";
import useOnlineUsers from "../../src/hooks/useUserRoom";

type Props = {};

const SupportPage = (props: Props) => {
  const { onlineUsers } = useOnlineUsers();
  console.log(onlineUsers);

  return <div>Online Users:</div>;
};

export default SupportPage;
