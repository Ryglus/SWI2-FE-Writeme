import React, { useState, useRef, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useTheme } from "@mui/material/styles";
import { Box, Button, IconButton, InputAdornment, Stack } from '@mui/material';
import { LinkSimple, Smiley, PaperPlaneTilt } from 'phosphor-react';
import EmojiPicker from '@emoji-mart/react';
import data from '@emoji-mart/data';

const MessageInput = ({ endpoint, roomId, people }) => {
    const theme = useTheme();
    const [inputValue, setInputValue] = useState('');
    const [openPicker, setOpenPicker] = useState(false);
    const fileInput = useRef(null);

    const handleButtonClick = () => {
        fileInput.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        // Handle the file here
        console.log(file);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSendMessage();
        }
    };
    const handleSendMessage = () => {
        if (inputValue.trim() !== '') {
            sendRequest();
            setInputValue('');
        }
    };
    const sendRequest = () => {
        if (roomId) {
            axios.post("http://localhost:8080/api/v1" + endpoint, { roomId: roomId, content: inputValue })
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            }); 
        }
       
    };


    const emojipick = emoji => {
        console.log(emoji)
        setInputValue(inputValue + emoji.native);
        setOpenPicker(false);
    };

    useEffect(() => {
        if (!fileInput.current) {
            fileInput.current = document.createElement('input');
            fileInput.current.type = 'file';
            fileInput.current.style.display = 'none';
            fileInput.current.addEventListener('change', handleFileChange);
            document.body.appendChild(fileInput.current);
        }
    }, []);

    return (
        <Stack sx={{ width: "100%", padding: "10px", paddingLeft: "0px" }} direction={"row"} spacing={2}>
            <Box sx={{
                display: openPicker ? "inline" : "none",
                zIndex: 10,
                position: "fixed",
                bottom: 74,
                right: 89,
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
            }}>
                <EmojiPicker

                    data={data}
                    onEmojiSelect={emojipick}
                    theme={theme.palette.mode}
                />
            </Box>

            <TextField
                type='message'
                fullWidth
                variant="outlined"
                placeholder="Type a message"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                onKeyDown={handleKeyDown}
                InputProps={{
                    startAdornment: (
                        <IconButton variant="contained" color="primary" sx={{ left: "-2px" }} onClick={handleButtonClick}>
                            <LinkSimple />
                        </IconButton>
                    ), endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={() => setOpenPicker(!openPicker)} variant="contained" color="primary" sx={{ left: "4px" }}><Smiley /></IconButton>
                        </InputAdornment>
                    ),
                }} />

            <Button onClick={handleSendMessage} variant="contained" color="primary"><PaperPlaneTilt size={22} color={theme.palette.mode === "light" ? "#080707" : theme.palette.text.primary} sx={{}} /></Button>

        </Stack>
    );
};

export default MessageInput;
