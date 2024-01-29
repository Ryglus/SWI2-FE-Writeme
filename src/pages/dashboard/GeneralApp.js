import React, { useState } from 'react';
import Chats from "./Chats";
import Conversation from "./Conversation";

const GeneralApp = () => {
  const [selectedPerson, setSelectedPerson] = useState(null);

  const handleSelectPerson = (person) => {
    setSelectedPerson(person);
  };

  return (
    <> 
      {/* recent chats and search */}
      <Chats onSelectPerson={handleSelectPerson} />
      {/* chat inspect */}
      <Conversation selectedPerson={selectedPerson} />
    </>
  );
};

export default GeneralApp;