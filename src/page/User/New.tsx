import { AddUserDto } from '../../services/openapi';
import { Box, CircularProgress, TextField, Button, Divider, Typography, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { createUser, loadUsers } from '../../redux/actions/userActions';
import { RootState } from '../../app/store';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NewUser() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [role, setRole] = useState("");
    const [password, setPassword] = useState("");
    const user = useAppSelector((state: RootState) => state.reducers.users.activeUser);

    useEffect(() => {
        if (user === null) {
            navigate("/user")
        }
    }, [user, navigate]);

    const goBack = async () => {
        await dispatch(loadUsers())
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (user != null) {
            let newUsername = username;
            if (newUsername === '') {
                newUsername = user.username ?? '';
            }
            let newFirstname = firstname;
            if (newFirstname === '') {
                newFirstname = user.firstName ?? '';
            }
            let newLastname = lastname;
            if (newLastname === '') {
                newLastname = user.lastName ?? '';
            }
            let newRole = Number(role);
            if (newRole !== 1 && newRole !== 2 && newRole !== 3) {
                newRole = 2;
            }
            let request: AddUserDto = {
                id: user.id,
                username: newUsername,
                firstName: newFirstname,
                lastName: newLastname,
                passwordHash: password,
                role: newRole
            }
            await dispatch(createUser(request));
        }
    };

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
                    <Typography sx={{ padding: "2rem 0 3rem 0" }} variant="h2">Benutzer hinzufügen</Typography>
                    <Divider />
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, maxWidth: "500px", paddingTop: "1rem" }}>
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
                        {user.role !== undefined
                            ?
                            <FormControl margin="normal" fullWidth>
                                <InputLabel>Role</InputLabel>
                                <Select
                                    defaultValue='2'
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
                            : ''
                        }
                        <TextField
                            onChange={(e) => setPassword(e.target.value)}
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            User Erstellen
                        </Button>
                    </Box>
                </Box>
                :
                <CircularProgress />
            }
        </Box >
    )
}