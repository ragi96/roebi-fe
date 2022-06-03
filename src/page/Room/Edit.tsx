import { Box, CircularProgress, TextField, Button, Divider, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import QRCode from "react-qr-code";
import { updateRoom, loadRooms } from '../../redux/actions/roomActions';
import { Room } from '../../services/openapi';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

export default function RoomSingle() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const room = useAppSelector((state: RootState) => state.reducers.room.activeRoom);
    useEffect(() => {
        if (room === null) {
            navigate("/room")
        }
    }, [room]);

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
            await dispatch(updateRoom(request));
        }
    };

    const goBack = async () => {
        await dispatch(loadRooms())
    }

    return (
        <Box>
            {room !== null && room.id != null
                ?
                <Box>
                    <Button variant="outlined" onClick={goBack} startIcon={<KeyboardBackspaceIcon />}>
                        Zurück
                    </Button>
                    <Typography sx={{ paddingTop: "2rem" }} variant="h2">{room.name}</Typography>
                    <Box sx={{ padding: "2rem 0 3rem 0" }}>
                        <QRCode value={room.id.toString()} />
                    </Box>
                    <Divider />
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, maxWidth: "500px", paddingTop: "1rem" }}>
                        <TextField
                            margin="normal"
                            defaultValue={room.id.toString()}
                            required
                            fullWidth
                            id="id"
                            onChange={(e) => setName(e.target.value)}
                            label="Id"
                            name="id"
                            autoFocus
                            disabled
                        />
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