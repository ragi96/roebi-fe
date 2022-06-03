import { Box, CircularProgress, TextField, Button, MenuItem, SelectChangeEvent, FormControl, InputLabel, Select } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { updateMedication, loadMedications } from '../../redux/actions/medicationActions';
import { UpdateMedicationDto } from '../../services/openapi';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

export default function MedicationSingle() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [patient, setPatient] = useState("");
    const [medicine, setMedicine] = useState("");
    const [takingstamp, setTakingStamp] = useState<Date | null>(new Date());
    const medication = useAppSelector((state: RootState) => state.reducers.medication.activeMedication);
    const patients = useAppSelector((state: RootState) => state.reducers.patient.patients);
    const medicines = useAppSelector((state: RootState) => state.reducers.medicine.medicines);
    let disabled = true;

    useEffect(() => {
        if (medication === null) {
            navigate("/medication")
        }
    }, [medication, navigate]);

    useEffect(() => {
        if (medication?.patient && medication.patient.id != null) {
            setPatient(medication.patient.id?.toString());
        }
        if (medication?.medicine && medication.medicine.id != null) {
            setMedicine(medication.medicine.id.toString())
        }
        if (medication?.takingStamp) {
            setTakingStamp(new Date(medication.takingStamp * 1000))
        }
    }, [medication])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (medication != null) {
            let newTakingStamp = takingstamp
            if (newTakingStamp === null) {
                newTakingStamp = new Date()
            }
            let request: UpdateMedicationDto = {
                id: medication.id,
                patient: Number(patient),
                medicine: Number(medicine),
                takingStamp: Math.floor(newTakingStamp.getTime() / 1000)
            }
            await dispatch(updateMedication(request));
        }
    };

    const goBack = async () => {
        await dispatch(loadMedications())
    }

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

    if (medication != null) {
        if (Math.floor(Date.now() / 1000) < medication.takingStamp) {
            disabled = false;
        }
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
                                    disabled={disabled}
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
                                    disabled={disabled}
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
                                disabled={disabled}
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