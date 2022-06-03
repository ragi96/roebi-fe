import { Box, CircularProgress, TextField, Button, Divider, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import QRCode from "react-qr-code";
import { updateMedicine, loadMedicines } from '../../redux/actions/medicineActions';
import { Medicine } from '../../services/openapi';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

export default function MedicineSingle() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const medicine = useAppSelector((state: RootState) => state.reducers.medicine.activeMedicine);

    useEffect(() => {
        if (medicine === null) {
            navigate("/medicine")
        }
    }, [medicine]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (medicine != null) {
            let newName = name;
            if (newName === '') {
                newName = medicine.name ?? '';
            }
            let request: Medicine = {
                id: medicine.id,
                name: newName
            }
            await dispatch(updateMedicine(request));
        }
    };

    const goBack = async () => {
        await dispatch(loadMedicines())
    }

    return (
        <Box>
            {medicine !== null && medicine.id != null
                ?
                <Box>
                    <Button variant="outlined" onClick={goBack} startIcon={<KeyboardBackspaceIcon />}>
                        Zurück
                    </Button>
                    <Typography sx={{ paddingTop: "2rem" }} variant="h2">{medicine.name}</Typography>
                    <Box sx={{ padding: "2rem 0 3rem 0" }}>
                        <QRCode value={medicine.id.toString()} />
                    </Box>
                    <Divider />
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, maxWidth: "500px", paddingTop: "1rem" }}>
                        <TextField
                            margin="normal"
                            defaultValue={medicine.id.toString()}
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
                            defaultValue={medicine.name}
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