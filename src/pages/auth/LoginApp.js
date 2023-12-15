import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Stack, Divider } from '@mui/material';
import { useNavigate } from "react-router-dom";
import DefaultAuth from './default';
import axios from 'axios';

const LoginPage = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleButtonClick = async () => {
        try {
            const res = await axios.post(`http://localhost:8080/api/v1/auth/signin`, { username, password });
            localStorage.setItem("token",res.data)
            navigate("/app");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <DefaultAuth>
            
            <Box sx={{ mt: 3 }}>
            <Divider sx={{ width: "100%" }} >   <Typography variant="h5">Sign In</Typography></Divider>
            
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="Username"
                    label="Username"
                    name="Username"
                    autoComplete="Username"
                    autoFocus
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Stack direction={"column"} spacing={1} sx={{mt:2}}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleButtonClick}
                    >
                        Sign In
                    </Button>
                    <Divider sx={{ width: "100%" }} >   <Typography variant="caption">OR</Typography></Divider>
                    <Button
                        href={"/register"}
                        fullWidth
                        variant="contained"
                        
                    >
                        Sign Up
                    </Button>
                </Stack>

            </Box>
        </DefaultAuth>
    );
};

export default LoginPage;