import React, { createContext, useState, useContext, useEffect } from 'react';
// Create a context
const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
    const [messages, setMessages] = useState([]);
  
    const addMessage = (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };
  
    return (
      <MessageContext.Provider value={{ messages, addMessage }}>
        {children}
      </MessageContext.Provider>
    );
  };
// Use the context in another component
const MessageList = () => {
    const { messages } = useContext(MessageContext);
  /*
    return (
      <div>
        {messages.map((message, index) => (
          //<MessageElement key={index} message={message} />
        ))}
      </div>
    );
    */
  };



const Auth = () => {
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const ws = new WebSocket('ws://localhost:8080/api/v1/ws-message?token='+token);
      ws.onopen = () => {
       
      };
      ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        if (message.type === 'message') {
          //addMessage(message);
        }
      };
      ws.onerror = (error) => { 
        console.error(error); 
    };
      setWs(ws);
    }
  }, []);

  return (
    <div>
      {/* Render your ChatElement and MessageElement components here */}
    </div>
  );
};




export default Auth;