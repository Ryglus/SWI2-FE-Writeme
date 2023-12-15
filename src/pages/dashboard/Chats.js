import { Box, Button, Divider, IconButton, Stack, Typography } from '@mui/material';
import React from 'react';
import { useTheme } from "@mui/material/styles";
import { ArchiveBox, CircleDashed } from 'phosphor-react';
import SearchBar from '../../components/SearchBar';
import ChatElement from '../../components/Chat/ChatElement';
import { ChatList } from '../../data';
import ScrollBar from '../../components/Scrollbar';
const Chats = () => {

    const theme = useTheme();
    return (
        <Box
            sx={{
                width: 320,
                backgroundColor:
                    theme.palette.mode === "light"
                        ? "#F8FAFF"
                        : theme.palette.background.paper,
                boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
            }}>
            <Stack p={3} direction="column" spacing={2} sx={{ height: "100vh" }}>
                <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} color={theme.palette.mode === "light" ? "#080707" : theme.palette.text.primary}>
                    <Typography variant="h5">Chats</Typography>
                    <IconButton sx={{ color: theme.palette.mode === "light" ? "#080707" : theme.palette.text.primary }} ><CircleDashed /></IconButton>
                </Stack>
                <SearchBar sx={{ color: theme.palette.mode === "light" ? "#080707" : theme.palette.text.primary }} />
                <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} color={theme.palette.mode === "light" ? "#080707" : theme.palette.text.primary}>
                    <ArchiveBox size={24} />
                    <Button variant="contained" color="primary">Archive</Button>
                </Stack>
                <Divider width={270} sx={{ alignSelf: "center" }} />
                <ScrollBar sx={{ paddingRight: "4px" }} spacing={1.5} direction={"column"} justifyContent={"space-between"} >

                    <Typography variant="subtitle2">Pinned</Typography>
                    {ChatList.filter((el) => el.pinned).map((el) => {
                        return <ChatElement {...el} />;
                    })}

                    <Divider width={270} sx={{ alignSelf: "center" }} />
                    <Typography variant="subtitle2">Recent</Typography>
                    {ChatList.filter((el) => !el.pinned).map((el) => {
                        return <ChatElement {...el} />;
                    })}

                </ScrollBar>
            </Stack>
        </Box>
    );
}

export default Chats;
