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
  
  const MessageElement = ({ message, incoming }) => {
    return (
      <FlexContainer incoming={incoming}>
        <MessageContainer incoming={incoming}>
          <Typography variant="body1">{message}</Typography>
        </MessageContainer>
      </FlexContainer>
    );
  };
  
  export default MessageElement;