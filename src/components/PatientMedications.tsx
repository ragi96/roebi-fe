import React, { useEffect } from 'react';
import { Box, CircularProgress } from "@mui/material/";
import { useAppDispatch } from '../app/hooks';
import { useAppSelector } from '../app/hooks';
import { getMedicationByUser } from '../redux/actions/medicationActions';
import { RootState } from '../app/store';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'firstname',
        headerName: 'Vorname',
        width: 200,
        editable: true,
    }
];

export default function PatientMedications() {
    const dispatch = useAppDispatch();
    const medications = useAppSelector((state: RootState) => state.reducers.medication.medications);
    const activePatient = useAppSelector((state: RootState) => state.reducers.patient.activePatient);

    useEffect(() => {
        if (activePatient != null && activePatient.id != null) {
            dispatch(getMedicationByUser(activePatient.id))
        }
    }, [activePatient, dispatch]);

    return (
        <Box>
            <h1>Medikation des Patienten</h1>
            <div style={{ display: 'flex', height: 'fit-content', minHeight: '371px' }}>
                {medications !== null
                    ?
                    <Box style={{ flexGrow: 1 }}>
                        <DataGrid
                            disableSelectionOnClick={true}
                            rows={medications}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                        />
                    </Box>
                    :
                    <Box>
                        <CircularProgress />
                    </Box>
                }
            </div>
        </Box>
    );
}