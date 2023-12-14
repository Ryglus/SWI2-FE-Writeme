import React from 'react';
import { Box, TextField, Button, Typography, Container, Stack, Divider } from '@mui/material';
import logo from "../../assets/Images/logo.ico";
import { useTheme } from '@mui/material/styles';

const LoginPage = () => {
    const theme = useTheme();
    return (
        <Stack direction={"row"} sx={{ width: "100%" }} justifyContent={"space-evenly"}>


            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: theme.palette.background.paper,
                    padding: 5,
                    borderRadius: 1.5,
                }}
            >
                <Stack direction={"row"} spacing={1} justifyContent={"center"} alignItems={"center"}>
                    <img src={logo} alt="logo" style={{ height: 82, width: 82, borderRadius: 12 }} />
                    <Typography variant="h2">Writeme</Typography>
                </Stack>


                <Box component="form" noValidate sx={{ mt: 1 }}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Stack direction={"row"} spacing={1} justifyContent={"center"}>
                        <Divider sx={{ width: "100%" }} >   <Typography variant="caption">OR</Typography></Divider>
                    </Stack>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                </Box>
            </Box>
        </Stack>
    );
};

export default LoginPage;