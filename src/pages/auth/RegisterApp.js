import React, { useState } from 'react';
import { TextField, Button, Typography, Stack, Divider, Box, FormControlLabel, Checkbox, Link } from '@mui/material';
import DefaultAuth from './default';
import axios from 'axios';
import { ArrowLeft } from 'phosphor-react';

const RegisterApp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [termsChecked, setTermsChecked] = useState(false);
    const [response, setResponse] = useState(null);

    const handleRegister = async () => {
        try {
            const res = await axios.post(`http://localhost:8080/api/v1/auth/signup`, { username, password, firstname, lastname });

            if (res.status === 200) {
                setResponse("ok")
            } else {

            }
        } catch (error) {
            setResponse("error")
            console.error(error);
        }
    };

    return (
        <DefaultAuth>
            <Box sx={{ mt: 3 }}>
                {response === null ? (
                    <>
                        <Divider sx={{ width: "100%" }} >
                            <Typography variant="h5">Sign Up</Typography>
                        </Divider>
                        <Stack direction={"row"} spacing={1} sx={{ mt: 1 }}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="First Name"
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="Last Name"
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                            />
                        </Stack>
                        <Stack direction={"column"} spacing={1} sx={{ mt: 1 }}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="Password"
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={termsChecked}
                                        onChange={(e) => setTermsChecked(e.target.checked)}
                                        color="primary"
                                    />
                                }
                                label="I agree to the Terms of Service"
                            />
                            <Stack direction={"column"} spacing={1} sx={{ mt: 2 }}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    disabled={!termsChecked || !username || !password || !firstname || !lastname}
                                    onClick={handleRegister}
                                >
                                    Register
                                </Button>
                            </Stack>
                            <Link variant="subsection1"
                                    href={"/login"}
                                    type="submit"
                                    color="primary"
                                >
                                    <ArrowLeft /> Go Back
                                </Link>
                        </Stack>
                    </>
                ) : response === "ok" ? (
                    (<Stack spacing={2}>
                        <Divider sx={{ width: "100%" }} >
                            <Typography variant="subsection1">Welcome!</Typography>
                        </Divider>
                        <Typography variant="body1">Your registration was successful, if we happend to be using email you should check it to confirm it's actualy you. We most likely aint though so you dont need to, you may follow to login into our application! Enjoy chatting!</Typography>
                        <Button
                            href={"/login"}
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Back to Login!
                        </Button>
                    </Stack>

                    )) : (<Stack spacing={2}>
                        <Divider sx={{ width: "100%" }} >
                            <Typography color={"darkorange"} variant="subsection1">Error!</Typography>
                        </Divider>
                        <Typography variant="body1">Error happend, please try again!</Typography>
                        <Button
                            href={"/register"}
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="error"
                        >
                            Try Again!
                        </Button>
                    </Stack>)}
            </Box>
        </DefaultAuth>
    );
};





export default RegisterApp;
