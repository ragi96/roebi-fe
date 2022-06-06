import React, { useState, useEffect } from 'react';
import { AuthenticateRequest } from '../services/openapi';
import { TextField, Button, Box, Avatar, Typography } from "@mui/material/";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from "react-router-dom";
import { loginUser } from '../redux/actions/currentUserActions';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';

export default function Login() {
    let navigate = useNavigate()
    const dispatch = useAppDispatch();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const isAuthenticated = useAppSelector((state: RootState) => state.reducers.user.authenticated);

    useEffect(() => {
        if (isAuthenticated === true) {
            navigate("/dashboard")
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let request: AuthenticateRequest = {
            password: password,
            username: username
        }
        await dispatch(loginUser(request));
    };
    return (
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
            <Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: 128, height: 128 }}>
                        <LockOutlinedIcon sx={{ fontSize: 96 }} />
                    </Avatar>
                </Box>
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        onChange={(e) => setUsername(e.target.value)}
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                    />
                    <TextField
                        onChange={(e) => setPassword(e.target.value)}
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
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                </Box>
            </Box>
        </Box>

    );
}