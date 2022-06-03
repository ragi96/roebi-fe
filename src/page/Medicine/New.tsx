import { Medicine } from '../../services/openapi';
import { Box, CircularProgress, TextField, Button, Divider, Typography } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { createMedicine, loadMedicines } from '../../redux/actions/medicineActions';
import { RootState } from '../../app/store';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NewMedicine() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const medicine = useAppSelector((state: RootState) => state.reducers.medicine.activeMedicine);

    useEffect(() => {
        if (medicine === null) {
            navigate("/medicine")
        }
    }, [medicine]);

    const goBack = async () => {
        await dispatch(loadMedicines())
    }

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
            await dispatch(createMedicine(request));
        }
    };


    return (
        <Box>
            {medicine !== null && medicine.id != null
                ?
                <Box>
                    <Button variant="outlined" onClick={goBack} startIcon={<KeyboardBackspaceIcon />}>
                        Zurück
                    </Button>
                    <Typography sx={{ padding: "2rem 0 3rem 0" }} variant="h2">Medikament hinzufügen</Typography>
                    <Divider />
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, maxWidth: "500px", paddingTop: "1rem" }}>
                        <TextField
                            margin="normal"
                            defaultValue={medicine.id.toString()}
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