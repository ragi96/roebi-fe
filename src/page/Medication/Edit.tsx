import { Box, CircularProgress, TextField, Button, Divider, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import QRCode from "react-qr-code";
import { updateMedication, loadMedications } from '../../redux/actions/medicationActions';
import { Medication, UpdateMedicationDto } from '../../services/openapi';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

export default function MedicationSingle() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const medication = useAppSelector((state: RootState) => state.reducers.medication.activeMedication);
    useEffect(() => {
        if (medication === null) {
            navigate("/medication")
        }
    }, [medication, navigate]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (medication != null) {
            let request: UpdateMedicationDto = {
                id: medication.id
            }
            await dispatch(updateMedication(request));
        }
    };

    const goBack = async () => {
        await dispatch(loadMedications())
    }

    return (
        <Box>
            {medication !== null && medication.id != null
                ?
                <Box>
                    <Button variant="outlined" onClick={goBack} startIcon={<KeyboardBackspaceIcon />}>
                        Zurück
                    </Button>
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