import React from 'react';
import { Typography, TextField, Button, Box, Stack, Avatar, IconButton, Input, InputAdornment } from '@mui/material';
import MessageElement from '../../components/MessageElement';
import { Chat_History } from '../../data';
import ScrollBar from '../../components/Scrollbar';
import { faker } from '@faker-js/faker';
import { LinkSimple } from 'phosphor-react';
const Conversation = () => {


    return (
        <Stack direction="column" spacing={2} sx={{ width: "100%", height: "100vh", padding: "20px" }}>
            <Stack direction="row" spacing={1} alignItems={"center"} sx={{ width: "100%" }}>
                <Avatar src={faker.image.avatar()} />
                <Stack direction="column" spacing={0.1}>
                    <Typography variant="h5">{faker.name.fullName()}</Typography>
                    <Typography variant="caption">Bio</Typography>
                </Stack>
            </Stack>
            <ScrollBar sx={{ paddingRight: "4px" }} spacing={1.5} direction={"column"} justifyContent={"space-between"}>
                {Chat_History.map((el) => {
                    return <MessageElement {...el} />;
                })}

            </ScrollBar>
            <Stack direction="row" spacing={2} sx={{ width: "100%" }}>
                <TextField
                    type='message'
                    fullWidth
                    variant="outlined"
                    placeholder="Type a message"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="end">
                                <IconButton variant="contained" color="primary" sx={{ left:"-15px" }}><LinkSimple /></IconButton>
                            </InputAdornment>
                        ),
                    }} />
                <Button variant="contained" color="primary">Send</Button>
            </Stack>

        </Stack>
    );
};

export default Conversation;
