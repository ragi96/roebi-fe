import { Box, CircularProgress, TextField, Button, Divider, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { updateUser, loadUsers } from '../../redux/actions/userActions';
import { User } from '../../services/openapi';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

export default function UserSingle() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const user = useAppSelector((state: RootState) => state.reducers.users.activeUser);

    useEffect(() => {
        if (user === null) {
            navigate("/user")
        }
    }, [user]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (user != null) {
            let newUsername = username;
            if (newUsername === '') {
                newUsername = user.username ?? '';
            }
            let request: User = {
                id: user.id,
                username: newUsername
            }
            await dispatch(updateUser(request));
        }
    };

    const goBack = async () => {
        await dispatch(loadUsers())
    }

    return (
        <Box>
            {user !== null && user.id != null
                ?
                <Box>
                    <Button variant="outlined" onClick={goBack} startIcon={<KeyboardBackspaceIcon />}>
                        Zurück
                    </Button>
                    <Typography sx={{ paddingTop: "2rem" }} variant="h2">{user.username}</Typography>
                    <Divider sx={{ margin: "2rem 0 3rem 0" }} />
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, maxWidth: "500px", paddingTop: "1rem" }}>
                        <TextField
                            margin="normal"
                            defaultValue={user.id.toString()}
                            required
                            fullWidth
                            id="id"
                            label="Id"
                            name="id"
                            autoFocus
                            disabled
                        />
                        <TextField
                            margin="normal"
                            defaultValue={user.username}
                            required
                            fullWidth
                            id="name"
                            onChange={(e) => setUsername(e.target.value)}
                            label="Name"
                            name="name"
                            autoFocus
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Speichern
                        </Button>
                    </Box>
                </Box>
                :
                <CircularProgress />
            }
        </Box>

    )
}