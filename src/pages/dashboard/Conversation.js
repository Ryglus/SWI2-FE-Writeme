import React from 'react';
import { Typography, TextField, Button, Box, Stack } from '@mui/material';
import MessageElement from '../../components/MessageElement';
import { Chat_History } from '../../data';
import ScrollBar from '../../components/Scrollbar';
const Conversation = () => {


    return (
        <Stack direction="column" spacing={2} sx={{ width: "100%", height: "100vh", padding: "20px" }}>
            <Stack direction="row" spacing={2} sx={{ width: "100%" }}>
                <Typography variant="h5">Name</Typography>
                <Typography variant="caption">Online</Typography>
            </Stack>
            <ScrollBar sx={{ paddingRight:"4px"}} spacing={1.5} direction={"column"} justifyContent={"space-between"}>
                {Chat_History.map((el) => {
                    return <MessageElement {...el} />;
                })}

            </ScrollBar>
            <Stack direction="row" spacing={2} sx={{ width: "100%" }}>
                <TextField fullWidth variant="outlined" placeholder="Type a message" />
                <Button variant="contained" color="primary">Send</Button>
            </Stack>

        </Stack>
    );
};

export default Conversation;
