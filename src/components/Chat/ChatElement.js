import React, { useState } from "react";
import { Box, Typography, Avatar, Badge, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const truncateText = (text, length) => {
    if (text.length > length) {
        return text.substring(0, length) + "...";
    } else {
        return text;
    }
};

const ChatElement = ({ room = {}, lastMessage = {}, user = {}, unread, isDraft, onSelectConversation, isSelected }) => {
    const theme = useTheme();

    const lastMessageProfile = lastMessage && lastMessage.profile ? lastMessage.profile : (user && user.profile ? user.profile : {});

    const roomId = room.id || "";
    const name = room.name || "";
    const description = room.description || "";

    // Ensure lastMessage is not null before accessing its properties
    const lastMessageContent = lastMessage && lastMessage.content ? lastMessage.content : "";
    const lastMessageTimestamp = lastMessage && lastMessage.timestamp ? lastMessage.timestamp : 0;

    const handleChatElementClick = () => {
        onSelectConversation({ profile: lastMessageProfile, roomId });
    };

    return (
        <Box
            onClick={handleChatElementClick}
            sx={{
                width: "100%",
                height: 60,
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                backgroundColor: isSelected ? "#fda92d" : theme.palette.background.default,
            }}
        >
            <Stack direction={"row"} sx={{ padding: theme.spacing(1) }}>
                <Avatar alt={lastMessageProfile.firstname} src={lastMessageProfile.profilePictureUrl || ''} />

                <Stack sx={{ marginLeft: theme.spacing(1) }}>
                    <Typography variant="subtitle2">{lastMessageProfile.firstname + " " + lastMessageProfile.lastname}</Typography>
                    <Typography variant="caption" color="text.secondary">
                        {truncateText(lastMessageContent, 20)}
                    </Typography>
                </Stack>
            </Stack>
            <Stack sx={{ marginLeft: "auto", marginRight: "5px" }} direction="column" spacing={4}>
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: 10, fontWeight: 420 }}>
                    {new Date(lastMessageTimestamp).toLocaleTimeString()} {/* Convert timestamp to readable time */}
                </Typography>
                {unread > 0 && <Badge badgeContent={unread} color="primary" sx={{ left: '-8px', bottom: '11px' }} />}
            </Stack>
        </Box>
    );
};

export default ChatElement;
