import { Box, Button, Divider, IconButton, Stack, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTheme } from "@mui/material/styles";
import { ArchiveBox, CircleDashed } from 'phosphor-react';
import SearchBar from '../../components/SearchBar';
import ChatElement from '../../components/Chat/ChatElement';
import ScrollBar from '../../components/Scrollbar';
import GroupCreationWindow from '../../components/Chat/GroupCreationWindow';


const Chats = ({ onSelectPerson }) => {
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [chatList, setChatList] = useState([]);
    const [drafts, setDrafts] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [isGroupCreationOpen, setGroupCreationOpen] = useState(false);

    useEffect(() => {
        const fetchChatList = async () => {
            try {
                const token = localStorage.getItem('token');
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const response = await axios.get('http://localhost:8080/api/v1/rooms');
                const data = response.data;
                console.log(data)
                setChatList(data);
            } catch (error) {
                console.error('Error fetching chat list:', error);
            }
        };

        fetchChatList();
    }, []);

    const theme = useTheme();

    const handleCreateGroupDraft = (selectedPeople) => {
        // Update the drafts state with the selected people
        setDrafts([selectedPeople]);
        setSelectedPerson(selectedPeople);
        onSelectPerson(selectedPeople);
        let ids=[]
        selectedPeople.profiles.forEach(element => {
            ids[ids.length]=element.id
        });
        axios.post("http://localhost:8080/api/v1/rooms", { name: Math.random(),description:Math.random(), userIds: ids })
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.error(error);
        }); 
        setGroupCreationOpen(false);
    };

    const handleSelectPerson = (person) => {
        setSelectedPerson(person);
        setSelectedChat(person.roomId);

        onSelectPerson(person); // Pass the selected room to the parent component
    };

    const handleSearchBarChange = (selectedPerson) => {
        setDrafts([selectedPerson]);
        setSelectedPerson(selectedPerson);
        setSelectedChat(selectedPerson.roomId);
        axios.post("http://localhost:8080/api/v1/rooms", { name: selectedPerson.roomId,description:"asd", userIds: selectedPerson.roomId })
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.error(error);
        }); 
        onSelectPerson(selectedPerson); // Pass the selected person to the parent component
    };

    const handleOpenGroupCreation = () => {
        setGroupCreationOpen(true);
    };

    const handleCloseGroupCreation = () => {
        setGroupCreationOpen(false);
    };



    return (
        <>
            <GroupCreationWindow
                isOpen={isGroupCreationOpen}
                onClose={handleCloseGroupCreation}
                onCreateGroupDraft={handleCreateGroupDraft} // Pass the handler to GroupCreationWindow
            />
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
                        <IconButton
                            sx={{ color: theme.palette.mode === "light" ? "#080707" : theme.palette.text.primary }}
                            onClick={handleOpenGroupCreation}
                        >
                            <CircleDashed />
                        </IconButton>
                    </Stack>
                    <SearchBar onChange={handleSearchBarChange} sx={{ color: theme.palette.mode === "light" ? "#080707" : theme.palette.text.primary }} />
                    <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} color={theme.palette.mode === "light" ? "#080707" : theme.palette.text.primary}>
                        <ArchiveBox size={24} />
                        <Button variant="contained" color="primary">Archive</Button>
                    </Stack>

                    {drafts.length > 0 && (
                        <>
                            <Divider width={270} sx={{ alignSelf: "center" }} />
                            <Typography variant="subtitle2">Draft</Typography>
                            {drafts.map((draft, index) => (
                                <ChatElement
                                    key={index}
                                    isDraft={true}
                                    unread={0}
                                    user={draft.profiles && draft.profiles.length > 0 ? draft.profiles[0] : {}} // Check if profiles array exists and has elements
                                    onSelectConversation={onSelectPerson}
                                    isSelected={selectedChat === draft.roomId}
                                />
                            ))}
                        </>
                    )}
                    <Divider width={270} sx={{ alignSelf: "center" }} />
                    <Typography variant="subtitle2">Recent</Typography>
                    <ScrollBar sx={{ paddingRight: "4px" }} spacing={1.5} direction={"column"} >

                        {chatList.map(el => (
                            <ChatElement
                                key={el.room.id}
                                room={el.room}
                                owner={el.owner}
                                lastMessage={el.lastMessage}
                                unread={0}
                                isDraft={false}
                                isSelected={selectedChat === el.room.id}
                                onSelectConversation={onSelectPerson} // Corrected prop name
                            />
                        ))}

                    </ScrollBar>
                </Stack>
            </Box>
        </>
    );
}

export default Chats;
