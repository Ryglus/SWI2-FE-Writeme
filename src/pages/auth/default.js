import React from 'react';
import { Box, TextField, Button, Typography, Stack, Divider } from '@mui/material';
import logo from "../../assets/Images/logo.ico";
import { useTheme } from '@mui/material/styles';

const DefaultAuth = ({ children }) => {
    const theme = useTheme();
    return (
        <Stack direction={"row"} sx={{ width: "100%", height: "80vh" }} justifyContent={"center"} alignItems={"center"}>
            <Stack direction={"column"} sx={{height:"100%", width: "100%" }} justifyContent={"center"} alignItems={"center"}>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        backgroundColor: theme.palette.background.paper,
                        padding: 5,
                        borderRadius: 1.5,
                    }}>

                    <Stack direction={"row"} spacing={1} justifyContent={"center"} alignItems={"center"}>
                        <img src={logo} alt="logo" style={{ height: 82, width: 82, borderRadius: 12 }} />
                        <Typography variant="h2">Writeme</Typography>
                    </Stack>
                    <Stack>
                        {children}
                    </Stack>

                </Box>
            </Stack>
        </Stack>
    );
};

export default DefaultAuth;
