import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Typography, Stack, Avatar } from '@mui/material';
import MessageElement from '../../components/Chat/MessageElement';
import ScrollBar from '../../components/Scrollbar';
import { Client } from '@stomp/stompjs';
import MessageInput from '../../components/Chat/MessageInput';

const Conversation = ({ selectedPerson }) => {
  const [chatHistory, setChatHistory] = useState([]);
  const [socket, setSocket] = useState(null);
  const socketRef = useRef();

  useEffect(() => {
    const fetchChatHistory = async (roomId) => {
      try {
        const token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await axios.get(`http://localhost:8080/api/v1/messages/${roomId}`);
        const data = response.data;
        setChatHistory(data);
      } catch (error) {
        console.error('Error fetching chat history:', error);
      }
    };
  
    const initSocket = (roomId) => {
      // Close the existing WebSocket connection, if any
      if (socketRef.current) {
        socketRef.current.deactivate();
      }
  
      const token = localStorage.getItem('token');
      const newSocket = new WebSocket(`ws://localhost:8080/api/v1/ws-message?token=${token}&roomId=${roomId}`);
      const stompClient = new Client({
        webSocketFactory: () => newSocket,
      });
  
      stompClient.onConnect = () => {
        console.log('WebSocket connection opened');
        // Subscribe to the WebSocket topic
        stompClient.subscribe(`/topic/rooms/${roomId}/messages`, (message) => {
          const parsedMessage = JSON.parse(message.body);
          console.log('WebSocket topic message received:', parsedMessage);
          // Add the received message to the chat history
          setChatHistory((prevHistory) => [parsedMessage,...prevHistory]);
        });
      };
  
      stompClient.activate();
  
      // Save the current WebSocket instance to the ref
      socketRef.current = stompClient;
  
      return () => {
        // Close the WebSocket connection when the component is unmounted
        console.log('WebSocket connection closed');
        stompClient.deactivate();
      };
    };
  
    if (selectedPerson && selectedPerson.roomId) {
      fetchChatHistory(selectedPerson.roomId);
      initSocket(selectedPerson.roomId);
    }
  }, [selectedPerson]);

  
  if (!selectedPerson || !selectedPerson.profile) {
    return (
      <Typography variant="caption">Select a person to start a conversation</Typography>
    );
  }

  return (
    <Stack direction="column" spacing={2} sx={{ width: "100%", height: "100vh" }}>
      <Stack direction="row" spacing={1} alignItems={"center"} sx={{ width: "100%", padding: "10px", boxShadow: "0px 1px 0px 0px rgba(0, 0, 0, 0.1)" }}>
        <Avatar src={selectedPerson.profile.profilePictureUrl} />
        <Stack direction="column">
          <Typography variant="h5">{`${selectedPerson.profile.firstname} ${selectedPerson.profile.lastname}`}</Typography>
          <Typography variant="caption">{selectedPerson.profile.bio}</Typography>
        </Stack>
      </Stack>
      <ScrollBar sx={{ paddingRight: "4px" }} spacing={1.5} direction={"row"} justifyContent={"flex-end"} stackDirection={"top"} autoScrollTo={"bottom"}>
        {chatHistory.map((el) => (
          <MessageElement key={el.timestamp} sender={el.profile} content={el.content} />
        ))}
      </ScrollBar>
      <MessageInput endpoint={"/messages"} roomId={selectedPerson.roomId} person={selectedPerson} />
    </Stack>
  );
};

export default Conversation;
