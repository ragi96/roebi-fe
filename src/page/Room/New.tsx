import { Room } from '../../services/openapi';
import { Box, CircularProgress, TextField, Button, Divider, Typography } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { createRoom, loadRooms } from '../../redux/actions/roomActions';
import { RootState } from '../../app/store';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NewRoom() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const room = useAppSelector((state: RootState) => state.reducers.room.activeRoom);

    useEffect(() => {
        if (room === null) {
            navigate("/room")
        }
    }, [room]);

    const goBack = async () => {
        await dispatch(loadRooms())
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (room != null) {
            let newName = name;
            if (newName === '') {
                newName = room.name ?? '';
            }
            let request: Room = {
                id: room.id,
                name: newName
            }
            await dispatch(createRoom(request));
        }
    };


    return (
        <Box>
            {room !== null && room.id != null
                ?
                <Box>
                    <Button variant="outlined" onClick={goBack} startIcon={<KeyboardBackspaceIcon />}>
                        Zurück
                    </Button>
                    <Typography sx={{ padding: "2rem 0 3rem 0" }} variant="h2">Raum hinzufügen</Typography>
                    <Divider />
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, maxWidth: "500px", paddingTop: "1rem" }}>
                        <TextField
                            margin="normal"
                            defaultValue={room.name}
                            required
                            fullWidth
                            id="name"
                            onChange={(e) => setName(e.target.value)}
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
                            Erstellen
                        </Button>
                    </Box>
                </Box>
                :
                <CircularProgress />
            }
        </Box >
    )
}