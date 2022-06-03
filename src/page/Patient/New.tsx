import { AddPatientDto } from '../../services/openapi';
import { Box, CircularProgress, TextField, Button, Divider, Typography, Select, SelectChangeEvent, MenuItem, InputLabel, FormControl } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { createPatient, loadPatients } from '../../redux/actions/patientActions';
import { RootState } from '../../app/store';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { allRooms } from '../../redux/actions/roomActions';

export default function NewPatient() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [caseHistory, setCaseHistory] = useState("");
    const [entrystamp, setEntrystamp] = useState<Date | null>(new Date());
    const [room, setRoom] = useState("");
    const patient = useAppSelector((state: RootState) => state.reducers.patient.activePatient);
    const rooms = useAppSelector((state: RootState) => state.reducers.room.rooms);

    useEffect(() => {
        if (patient === null) {
            navigate("/patient")
        }
    }, [patient, navigate]);

    useEffect(() => {
        if (rooms === null) {
            dispatch(allRooms())
        }
    }, [rooms, dispatch])

    const goBack = async () => {
        await dispatch(loadPatients())
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (patient != null) {
            let newFirstname = firstname;
            if (newFirstname === '') {
                newFirstname = patient.firstname ?? '';
            }
            let newLastname = lastname;
            if (newLastname === '') {
                newLastname = patient.lastName ?? '';
            }
            let newCaseHistory = caseHistory;
            if (newCaseHistory === '') {
                newCaseHistory = patient.caseHistory ?? '';
            }
            let newEntryStamp = entrystamp
            if (newEntryStamp === null) {
                newEntryStamp = new Date()
            }
            let request: AddPatientDto = {
                firstname: newFirstname,
                lastName: newLastname,
                caseHistory: newCaseHistory,
                entryStamp: Math.floor(newEntryStamp.getTime() / 1000),
                room: Number(room)
            }
            await dispatch(createPatient(request));
        }
    };

    const handleSelectChange = (event: SelectChangeEvent) => {
        setRoom(event.target.value as string);
    };


    let roomItem = null;
    if (rooms != null) {
        roomItem = rooms.map((room) => <MenuItem key={room.id} value={room.id}>{room.name}</MenuItem>)
    }
    return (
        <Box>
            {patient !== null && patient.id != null
                ?
                <Box>
                    <Button variant="outlined" onClick={goBack} startIcon={<KeyboardBackspaceIcon />}>
                        Zurück
                    </Button>
                    <Typography sx={{ padding: "2rem 0 3rem 0" }} variant="h2">Patient hinzufügen</Typography>
                    <Divider />
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, maxWidth: "500px", paddingTop: "1rem" }}>
                        <TextField
                            margin="normal"
                            defaultValue={patient.firstname}
                            required
                            fullWidth
                            id="firstname"
                            onChange={(e) => setFirstname(e.target.value)}
                            label="Vorname"
                            name="firstname"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            defaultValue={patient.lastName}
                            required
                            fullWidth
                            id="lastname"
                            onChange={(e) => setLastname(e.target.value)}
                            label="Nachname"
                            name="lastname"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            defaultValue={patient.caseHistory}
                            id="casehistory"
                            onChange={(e) => setCaseHistory(e.target.value)}
                            label="Case History"
                            name="casehistory"
                            minRows={4}
                            multiline
                            autoFocus
                            required
                            fullWidth
                        />
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DateTimePicker
                                renderInput={(props) => <TextField margin="normal" fullWidth autoFocus required {...props} />}
                                label="Eintritt"
                                value={entrystamp}
                                autoFocus
                                inputFormat="dd.mm.yyyy HH:mm"
                                ampm={false}
                                onChange={(newValue) => { setEntrystamp(newValue); }}
                            />
                        </LocalizationProvider>
                        {roomItem != null ?
                            <FormControl margin="normal" fullWidth>
                                <InputLabel>Raum</InputLabel>
                                <Select
                                    value={room}
                                    label="Raum"
                                    required
                                    onChange={handleSelectChange}
                                >
                                    {roomItem}
                                </Select>
                            </FormControl>
                            : ""}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Patient Erstellen
                        </Button>
                    </Box>
                </Box>
                :
                <CircularProgress />
            }
        </Box >
    )
}