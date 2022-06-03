import { Box, CircularProgress, TextField, Button, Divider, Typography, Select, SelectChangeEvent, MenuItem, InputLabel, FormControl } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import QRCode from "react-qr-code";
import { updatePatient, loadPatients } from '../../redux/actions/patientActions';
import { UpdatePatientDto } from '../../services/openapi';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { allRooms } from '../../redux/actions/roomActions';
import PatientMedications from '../../components/PatientMedications';

export default function PatientSingle() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const patient = useAppSelector((state: RootState) => state.reducers.patient.activePatient);
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [caseHistory, setCaseHistory] = useState("");
    const [entrystamp, setEntrystamp] = React.useState<Date | null>(new Date());
    const [exitstamp, setExitstamp] = React.useState<Date | null>(new Date());
    const [room, setRoom] = useState("");
    const rooms = useAppSelector((state: RootState) => state.reducers.room.rooms);
    let disabled = false;

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

    useEffect(() => {
        if (patient?.room && patient.room.id != null) {
            setRoom(patient.room.id?.toString());
            setExitstamp(new Date());
        }
    }, [patient])

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
            if (entrystamp != null) {
                let newEntryStamp = Math.floor(entrystamp?.getTime() / 1000)
                if (newEntryStamp === 0 && patient.entryStamp != null) {
                    newEntryStamp = patient.entryStamp;
                }
                let newExitStamp = 0;
                if (exitstamp != null) {
                    newExitStamp = Math.floor(exitstamp.getTime() / 1000) ?? 0
                }

                let request: UpdatePatientDto = {
                    id: patient.id,
                    firstname: newFirstname,
                    lastName: newLastname,
                    caseHistory: newCaseHistory,
                    entryStamp: newEntryStamp,
                    exitStamp: newExitStamp,
                    room: Number(room)
                }
                await dispatch(updatePatient(request));
            }
        }
    };

    const goBack = async () => {
        await dispatch(loadPatients())
    }

    const handleSelectChange = (event: SelectChangeEvent) => {
        setRoom(event.target.value as string);
    };


    let roomItem = null;
    if (rooms != null) {
        roomItem = rooms.map((room) => <MenuItem key={room.id} value={room.id}>{room.name}</MenuItem>)
    }

    if (patient != null && patient.entryStamp != null && patient.exitStamp != null) {
        disabled = false;
    }

    return (
        <Box>
            {patient !== null && patient.id != null && patient.caseHistory != null && patient.entryStamp != null && patient.exitStamp != null
                ?
                <Box>
                    <Button variant="outlined" onClick={goBack} startIcon={<KeyboardBackspaceIcon />}>
                        Zurück
                    </Button>
                    <Typography sx={{ paddingTop: "2rem" }} variant="h2">{patient.firstname} {patient.lastName}</Typography>
                    <Box sx={{ padding: "2rem 0 3rem 0" }}>
                        <QRCode value={patient.id.toString()} />
                    </Box>
                    <Divider />
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, maxWidth: "500px", paddingTop: "1rem" }}>
                        <TextField
                            margin="normal"
                            defaultValue={patient.id.toString()}
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
                            defaultValue={patient.firstname}
                            required
                            fullWidth
                            id="firstname"
                            onChange={(e) => setFirstname(e.target.value)}
                            label="Vorname"
                            name="firstname"
                            autoFocus
                            disabled={disabled}
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
                            disabled={disabled}
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
                            disabled={disabled}
                        />
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DateTimePicker
                                renderInput={(props) => <TextField margin="normal" fullWidth autoFocus disabled={disabled} required {...props} />}
                                label="Eintritt"
                                value={new Date(patient.entryStamp * 1000)}
                                autoFocus
                                disabled
                                ampm={false}
                                onChange={(newValue) => { setEntrystamp(newValue); }}
                            />
                            <DateTimePicker
                                renderInput={(props) => <TextField margin="normal" fullWidth autoFocus disabled={disabled} required {...props} />}
                                label="Austritt"
                                value={new Date(patient.exitStamp * 1000)}
                                autoFocus
                                ampm={false}
                                onChange={(newValue) => { setExitstamp(newValue); }}
                            />
                        </LocalizationProvider>
                        {roomItem != null ?
                            <FormControl margin="normal" fullWidth>
                                <InputLabel id="demo-simple-select-label">Raum</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
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
                            Speichern
                        </Button>
                        <Divider />
                        <PatientMedications />
                    </Box>
                </Box>
                :
                <CircularProgress />
            }
        </Box>

    )
}