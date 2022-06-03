import { Box, CircularProgress, TextField, Button, Divider, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import QRCode from "react-qr-code";
import { updatePatient, loadPatients } from '../../redux/actions/patientActions';
import { Patient } from '../../services/openapi';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

export default function PatientSingle() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [firstname, setFirstname] = useState("");
    const patient = useAppSelector((state: RootState) => state.reducers.patient.activePatient);

    useEffect(() => {
        if (patient === null) {
            navigate("/patient")
        }
    }, [patient]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (patient != null) {
            let newFirstname = firstname;
            if (newFirstname === '') {
                newFirstname = patient.firstname ?? '';
            }
            let request: Patient = {
                id: patient.id,
                firstname: newFirstname
            }
            await dispatch(updatePatient(request));
        }
    };

    const goBack = async () => {
        await dispatch(loadPatients())
    }

    return (
        <Box>
            {patient !== null && patient.id != null
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
                            label="firstname"
                            name="firstname"
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