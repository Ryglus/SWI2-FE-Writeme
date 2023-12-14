import React from "react";
import Chats from "./Chats";
import Conversation from "./Conversation";

const GeneralApp = () => {

  return (
    <> 
      {/* recent chants and search */}
      <Chats />
      {/* chat insplect */}
      <Conversation />
    </>
  );
};

export default GeneralApp;