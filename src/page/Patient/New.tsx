import { Patient } from '../../services/openapi';
import { Box, CircularProgress, TextField, Button, Divider, Typography } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { createPatient, loadPatients } from '../../redux/actions/patientActions';
import { RootState } from '../../app/store';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NewPatient() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const patient = useAppSelector((state: RootState) => state.reducers.patient.activePatient);

    useEffect(() => {
        if (patient === null) {
            navigate("/patient")
        }
    }, [patient]);

    const goBack = async () => {
        await dispatch(loadPatients())
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (patient != null) {
            let newFirstname = name;
            if (newFirstname === '') {
                newFirstname = patient.firstname ?? '';
            }
            let request: Patient = {
                id: patient.id,
                firstname: newFirstname
            }
            await dispatch(createPatient(request));
        }
    };


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
                            defaultValue={patient.id.toString()}
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
                            defaultValue={patient.firstname}
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
                            Medikament Erstellen
                        </Button>
                    </Box>
                </Box>
                :
                <CircularProgress />
            }
        </Box >
    )
}