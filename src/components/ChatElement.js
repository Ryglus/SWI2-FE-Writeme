import React from "react";
import { Box, Typography, Avatar, Badge, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const truncateText = (text, length) => {
    if (text.length > length) {
        return text.substring(0, length) + "...";
    } else {
        return text;
    }
};

const ChatElement = ({ img, name, msg, time, unread, online, id }) => {

    const theme = useTheme();

    return (
        <Box
            sx={{
                width: "100%",
                height: 60,
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                backgroundColor: theme.palette.background.default,
            }}>
            <Stack direction={"row"} sx={{padding: theme.spacing(1)}}>

                {online ? <Badge anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} color="success" overlap="circular" badgeContent=" " variant="dot">
                    <Avatar alt={name} src={img} />
                </Badge> : <Avatar alt={name} src={img} />}


                <Stack sx={{ marginLeft: theme.spacing(1) }}>
                    <Typography variant="subtitle2">{name}</Typography>
                    <Typography variant="caption" color="text.secondary">
                        {truncateText(msg, 20)}
                    </Typography>
                </Stack>

            </Stack>
            <Stack sx={{ marginLeft: "auto", marginRight:"5px" }} direction="column" spacing={4} >
                <Typography variant="caption" color="text.secondary" sx={{ fontSize:10,fontWeight: 420 }}>
                    {time}
                </Typography>
                {unread > 0 && (
                    <Badge badgeContent={unread} color="primary" sx={{ left: '-8px',bottom:'11px' }} />
                )}
            </Stack>
        </Box>
    );
};

export default ChatElement;