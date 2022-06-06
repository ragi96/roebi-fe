import { RootState } from '../../app/store';
import { Box, CircularProgress, Divider, TextField, Button, MenuItem, FormControl, InputLabel, Select } from "@mui/material/";
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useEffect, useState } from 'react';
import { getUserData, updateCurrentUser, updatePasswordOfCurrentUser } from '../../redux/actions/currentUserActions';
import { PasswordCurrentUpdate, UpdateCurrentUserDto } from '../../services/openapi';

export default function MyAccount() {
    const dispatch = useAppDispatch();
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [username, setUsername] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const user = useAppSelector((state: RootState) => state.reducers.user.currentUser);


    useEffect(() => {
        dispatch(getUserData());
    }, []);

    const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (user != null) {
            let newFirstname = firstname;
            let newLastname = lastname;
            let newUsername = username;
            if (newFirstname === '') {
                newFirstname = user.firstName ?? '';
            }
            if (newLastname === '') {
                newLastname = user.lastName ?? '';
            }
            if (newUsername === '') {
                newUsername = user.username ?? '';
            }
            let req: UpdateCurrentUserDto = {
                id: user.id,
                firstName: newFirstname,
                lastName: newLastname,
                username: newUsername

            }
            await dispatch(updateCurrentUser(req));
        }
    };

    const updatePassword = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (user !== null) {
            if (user.id !== undefined) {
                let updatePasswordRequest: PasswordCurrentUpdate = {
                    id: user.id,
                    newPassword: newPassword,
                    oldPassword: oldPassword
                }
                await dispatch(updatePasswordOfCurrentUser(updatePasswordRequest))
            }
        }
    }

    return (
        <Box>
            <h1>Mein Account</h1>
            <Divider />
            {user !== null && user.id != null && user.firstName != null
                ?
                <Box>
                    <Box component="form" onSubmit={handleUpdate} sx={{ mt: 1, maxWidth: "500px", paddingTop: "1rem" }}>
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
                        <FormControl margin="normal" fullWidth>
                            <InputLabel>Role</InputLabel>
                            <Select
                                value={user.role}
                                label="Rolle"
                                required
                                disabled={true}
                            >
                                <MenuItem key="1" value="1">Admin</MenuItem>
                                <MenuItem key="2" value="2">User</MenuItem>
                                <MenuItem key="3" value="3">Roboter</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            margin="normal"
                            defaultValue={user.firstName}
                            required
                            fullWidth
                            id="firstname"
                            label="Vorname"
                            name="firstname"
                            onChange={(e) => setFirstname(e.target.value)}
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            defaultValue={user.lastName}
                            required
                            fullWidth
                            id="lastname"
                            label="Nachname"
                            name="lastname"
                            onChange={(e) => setLastname(e.target.value)}
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            defaultValue={user.username}
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            onChange={(e) => setUsername(e.target.value)}
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
                    <Divider />
                    <Box component="form" onSubmit={updatePassword} sx={{ mt: 1, maxWidth: "500px", paddingTop: "1rem" }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="old-password"
                            onChange={(e) => setOldPassword(e.target.value)}
                            label="Altes Passwort"
                            name="oldPassword"
                            type="password"
                        />
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