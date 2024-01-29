import React from "react";
import { Typography, Box } from "@mui/material";
import { styled } from '@mui/system';

const MessageContainer = styled(Box)(({ theme, incoming }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: incoming ? theme.palette.grey[200] : theme.palette.grey[50],
  color: theme.palette.getContrastText(incoming ? theme.palette.grey[200] : theme.palette.grey[50]),
  maxWidth: '70%', // Set a maximum width
}));

const FlexContainer = styled(Box)(({ incoming }) => ({
  display: 'flex',
  justifyContent: incoming ? 'flex-start' : 'flex-end',
}));
// Assuming you have the user profile stored in localStorage
const userProfile = localStorage.getItem("profileId");

// Function to check if a message belongs to the currently logged-in user
const isMessageFromCurrentUser = (messageProfileId) => {
  return userProfile == messageProfileId;
};

// Inside your MessageElement component
const MessageElement = ({ content, sender }) => {
  const isCurrentUser = !isMessageFromCurrentUser(sender.id);
  return (
    <FlexContainer incoming={isCurrentUser}>
      <MessageContainer incoming={isCurrentUser}>
        <Typography variant="body1">{content}</Typography>
      </MessageContainer>
    </FlexContainer>
  );
};

export default MessageElement;