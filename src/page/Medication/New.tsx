import { AddMedicationDto } from '../../services/openapi';
import { Box, CircularProgress, TextField, Button, Divider, Typography, MenuItem, FormControl, InputLabel, Select, SelectChangeEvent } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { createMedication, loadMedications } from '../../redux/actions/medicationActions';
import { RootState } from '../../app/store';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { allPatients } from '../../redux/actions/patientActions';
import { allMedicines } from '../../redux/actions/medicineActions';

export default function NewMedication() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [patient, setPatient] = useState("");
    const [medicine, setMedicine] = useState("");
    const [takingstamp, setTakingStamp] = useState<Date | null>(new Date());
    const medication = useAppSelector((state: RootState) => state.reducers.medication.activeMedication);
    const patients = useAppSelector((state: RootState) => state.reducers.patient.patients);
    const medicines = useAppSelector((state: RootState) => state.reducers.medicine.medicines);



    useEffect(() => {
        if (patients === null) {
            dispatch(allPatients())
        }
    }, [patients, dispatch])

    useEffect(() => {
        if (medicines === null) {
            dispatch(allMedicines())
        }
    }, [medicines, dispatch])

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
            let newTakingStamp = takingstamp
            if (newTakingStamp === null) {
                newTakingStamp = new Date()
            }
            let request: AddMedicationDto = {
                patient: Number(patient),
                medicine: Number(medicine),
                takingStamp: Math.floor(newTakingStamp.getTime() / 1000),
            }
            await dispatch(createMedication(request));
        }
    };

    const handlePatientChange = (event: SelectChangeEvent) => {
        setPatient(event.target.value as string);
    };

    const handleMedicineChange = (event: SelectChangeEvent) => {
        setMedicine(event.target.value as string);
    };

    let patientItem = null;
    if (patients != null) {
        patientItem = patients.map((patient) => <MenuItem key={patient.id} value={patient.id}>{patient.firstname} {patient.lastName} </MenuItem>)
    }

    let medicineItem = null;
    if (medicines != null) {
        medicineItem = medicines.map((medicine) => <MenuItem key={medicine.id} value={medicine.id}>{medicine.name}</MenuItem>)
    }
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
                        {patientItem != null ?
                            <FormControl margin="normal" fullWidth>
                                <InputLabel>Patient</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={patient}
                                    label="Patient"
                                    required
                                    onChange={handlePatientChange}
                                >
                                    {patientItem}
                                </Select>
                            </FormControl>
                            : ""}
                        {medicineItem != null ?
                            <FormControl margin="normal" fullWidth>
                                <InputLabel>Medikament</InputLabel>
                                <Select
                                    value={medicine}
                                    label="Medikament"
                                    required
                                    onChange={handleMedicineChange}
                                >
                                    {medicineItem}
                                </Select>
                            </FormControl>
                            : ""}
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DateTimePicker
                                renderInput={(props) => <TextField margin="normal" fullWidth autoFocus required {...props} />}
                                label="Eintritt"
                                value={takingstamp}
                                autoFocus
                                ampm={false}
                                disablePast
                                inputFormat="dd.MM.yyyy HH:mm"
                                onChange={(newValue) => { setTakingStamp(newValue); }}
                            />
                        </LocalizationProvider>
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