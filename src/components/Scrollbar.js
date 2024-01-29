import React, { useEffect, useRef } from 'react';
import { Stack } from '@mui/material';
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

const ScrollBar = ({ children, autoScrollTo, stackDirection = 'bottom' }) => {
  const messagesEndRef = useRef(null);
  const messagesStartRef = useRef(null);
  const scrollContainerRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => {
    messagesStartRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    const handleScroll = () => {
      const isAtBottom = scrollContainer.scrollTop + scrollContainer.clientHeight === scrollContainer.scrollHeight;

      if (autoScrollTo === "bottom" && isAtBottom) {
        scrollToBottom();
      }
    };

    scrollContainer.addEventListener('scroll', handleScroll);

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, [autoScrollTo]);

  useEffect(() => {
    if (autoScrollTo === "bottom") {
      scrollToBottom();
    } else if (autoScrollTo === "top") {
      scrollToTop();
    }
  }, [children, autoScrollTo]);

  return (
    <StyledStack
      ref={scrollContainerRef}
      sx={{ paddingRight:"4px"}}
      spacing={1.5}
      direction={"column"}
      justifyContent={"space-between"}
    >
      <div ref={messagesStartRef} />
      {stackDirection === 'top' && [...children].reverse()}
      {stackDirection === 'bottom' && children}
      <div ref={messagesEndRef} />
    </StyledStack>
  );
};

export default ScrollBar;
