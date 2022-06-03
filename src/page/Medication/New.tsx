import { AddMedicationDto, Medication } from '../../services/openapi';
import { Box, CircularProgress, TextField, Button, Divider, Typography } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { createMedication, loadMedications } from '../../redux/actions/medicationActions';
import { RootState } from '../../app/store';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NewMedication() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const medication = useAppSelector((state: RootState) => state.reducers.medication.activeMedication);

    useEffect(() => {
        if (medication === null) {
            navigate("/medication")
        }
    }, [medication]);

    const goBack = async () => {
        await dispatch(loadMedications())
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (medication != null) {
            let request: AddMedicationDto = {
            }
            await dispatch(createMedication(request));
        }
    };


    return (
        <Box>
            {medication !== null && medication.id != null
                ?
                <Box>
                    <Button variant="outlined" onClick={goBack} startIcon={<KeyboardBackspaceIcon />}>
                        Zurück
                    </Button>
                    <Typography sx={{ padding: "2rem 0 3rem 0" }} variant="h2">Medikation hinzufügen</Typography>
                    <Divider />
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, maxWidth: "500px", paddingTop: "1rem" }}>
                        <TextField
                            margin="normal"
                            defaultValue={medication.id.toString()}
                            required
                            fullWidth
                            id="id"
                            label="Id"
                            name="id"
                            autoFocus
                            disabled
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