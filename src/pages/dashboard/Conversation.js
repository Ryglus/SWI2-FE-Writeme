import React from 'react';
import { Typography, Stack, Avatar } from '@mui/material';
import MessageElement from '../../components/Chat/MessageElement';

import { Chat_History } from '../../data';
import ScrollBar from '../../components/Scrollbar';
import { faker } from '@faker-js/faker';
import MessageInput from '../../components/Chat/MessageInput';


const Conversation = () => {
    
    return (
        <Stack direction="column" spacing={2} sx={{ width: "100%", height: "100vh" }}>
            <Stack direction="row" spacing={1} alignItems={"center"} sx={{ width: "100%",padding: "10px",boxShadow: "0px 1px 0px 0px rgba(0, 0, 0, 0.1)" }}>
                <Avatar src={faker.image.avatar()} />
                <Stack direction="column" >
                    <Typography variant="h5">{faker.name.fullName()}</Typography>
                    <Typography variant="caption">{faker.color.human()}</Typography>
                </Stack>
            </Stack>
            <ScrollBar sx={{ paddingRight: "4px" }} spacing={1.5} direction={"column"} justifyContent={"space-between"} autoScrollTo={"bottom"}>
                {Chat_History.map((el) => {
                    return <MessageElement {...el} />;
                })}

            </ScrollBar>
            <MessageInput endpoint={"/send"} />

        </Stack>
    );
};

export default Conversation;
