import React, { useEffect } from 'react';
import { authenticate, currentUser } from '../services/api/auth';
import { AuthenticateRequest } from '../services/openapi';
import { TextField, Button, Box, Avatar, Typography } from "@mui/material/";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from "react-router-dom";

export default function Login() {
    let navigate = useNavigate();
    useEffect(() => {
        const fetchUser = async () => {
            const user = await currentUser();
            if(user.firstName !== null){
                navigate("/dashboard");
            }
        }
        fetchUser();
    })

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let request: AuthenticateRequest = {
            password: data.get('username')?.toString() ?? "",
            username: data.get('password')?.toString() ?? ""
        }
        authenticate(request);
        if(localStorage.getItem('token') !== ""){
            navigate("/dashboard");
        }
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
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Login in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Email Address"
                        name="username"
                        autoComplete="username"
                        autoFocus
                    />
                    <TextField
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