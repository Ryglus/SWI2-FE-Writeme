import React from 'react';
import { Stack } from '@mui/material';
import { useTheme } from "@mui/material/styles";
import { styled } from '@mui/system';

const StyledStack = styled(Stack)(({ theme }) => ({
  overflow: 'auto',
  overflowX: 'hidden',
  height: '100%',
  '&::-webkit-scrollbar': {
    width: '6px',
    transition: 'opacity 0.5s',
    opacity: 1,
  },
  '&:hover::-webkit-scrollbar': {
    opacity: 1,
  },
  '&::-webkit-scrollbar-track': {
    background: theme.palette.mode === 'light' ? '#f1f1f1' : '#333',
  },
  '&::-webkit-scrollbar-thumb': {
    background: theme.palette.mode === 'light' ? '#888' : '#555',
    borderRadius: '20px',
    transition: 'background 0.5s',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: theme.palette.mode === 'light' ? '#555' : '#888',
  },
}));

const ScrollBar = ({ children, ...props }) => {
  const theme = useTheme();
  return (
    <StyledStack theme={theme} {...props}>
      {children}
    </StyledStack>
  );
}

export default ScrollBar;