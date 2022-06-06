import { Box, CircularProgress, TextField, Button, Divider, Typography, FormControl, SelectChangeEvent, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { updatePasswordOfUser, updateUser, loadUsers } from '../../redux/actions/userActions';
import { PasswordUpdate, UpdateUserDto } from '../../services/openapi';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

export default function UserSingle() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [role, setRole] = useState("");
    const user = useAppSelector((state: RootState) => state.reducers.users.activeUser);

    useEffect(() => {
        if (user === null) {
            navigate("/user")
        }
        if (user?.role != null) {
            setRole(user?.role?.toString());
        }
    }, [user]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (user != null) {
            let newFirstname = firstname;
            let newLastname = lastname;
            let newUsername = username;
            let newRole = Number(role);
            if (newFirstname === '') {
                newFirstname = user.firstName ?? '';
            }
            if (newLastname === '') {
                newLastname = user.lastName ?? '';
            }
            if (newUsername === '') {
                newUsername = user.username ?? '';
            }
            if (newRole !== 1 && newRole !== 2 && newRole !== 3) {
                newRole = Number(user.role);
            }
            let req: UpdateUserDto = {
                id: user.id,
                firstName: newFirstname,
                lastName: newLastname,
                username: newUsername,
                role: newRole
            }
            await dispatch(updateUser(req));
        }
    };

    const updatePassword = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (user !== null) {
            if (user.id !== undefined) {
                let updatePasswordRequest: PasswordUpdate = {
                    id: user.id,
                    password: newPassword
                }
                await dispatch(updatePasswordOfUser(updatePasswordRequest))
            }
        }
    }

    const goBack = async () => {
        await dispatch(loadUsers())
    }

    const handleRoleChange = (event: SelectChangeEvent) => {
        setRole(event.target.value as string);
    };

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
                            id="Username"
                            onChange={(e) => setUsername(e.target.value)}
                            label="Username"
                            name="Username"
                        />
                        <TextField
                            margin="normal"
                            defaultValue={user.firstName}
                            required
                            fullWidth
                            id="Firstname"
                            onChange={(e) => setFirstname(e.target.value)}
                            label="Vorname"
                            name="firstname"
                        />
                        <TextField
                            margin="normal"
                            defaultValue={user.lastName}
                            required
                            fullWidth
                            id="lastname"
                            onChange={(e) => setLastname(e.target.value)}
                            label="Nachname"
                            name="lastname"
                        />
                        <FormControl margin="normal" fullWidth>
                            <InputLabel>Role</InputLabel>
                            <Select
                                value={role}
                                label="Rolle"
                                required
                                onChange={handleRoleChange}
                            >
                                <MenuItem key="1" value="1">Admin</MenuItem>
                                <MenuItem key="2" value="2">User</MenuItem>
                                <MenuItem key="3" value="3">Roboter</MenuItem>
                            </Select>
                        </FormControl>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Speichern
                        </Button>
                    </Box>
                    <Box component="form" onSubmit={updatePassword} sx={{ mt: 1, maxWidth: "500px", paddingTop: "1rem" }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="new-password"
                            onChange={(e) => setNewPassword(e.target.value)}
                            label="Neues Passwort"
                            name="newPassword"
                            type="password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Passwort ändern
                        </Button>
                    </Box>
                </Box>
                :
                <CircularProgress />
            }
        </Box>

    )
}