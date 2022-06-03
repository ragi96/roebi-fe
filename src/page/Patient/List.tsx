import React, { useEffect } from 'react';
import { Box, Button, CircularProgress } from "@mui/material/";
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { allPatients, newPatient, getPatientById } from '../../redux/actions/patientActions';
import { RootState } from '../../app/store';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'firstname',
        headerName: 'Vorname',
        width: 200,
        editable: true,
    },
    {
        field: 'lastName',
        headerName: 'Nachname',
        flex: 1,
        editable: true,
    },
];

export default function Patient() {
    const navigate = useNavigate();
    const activePatient = useAppSelector((state: RootState) => state.reducers.patient.activePatient);
    const patients = useAppSelector((state: RootState) => state.reducers.patient.patients);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(allPatients())
    }, []);

    useEffect(() => {
        if (activePatient !== null) {
            let activeId = activePatient.id;
            if (activeId !== 0 && activeId !== undefined) {
                navigate("/patient/" + activeId)
            } else if (activeId === 0) {
                navigate("/patient/new")
            }
        }
    }, [activePatient, navigate, dispatch]);

    function openDetail(toActivateId: number) {
        dispatch(getPatientById(toActivateId))
    }

    function createNew() {
        dispatch(newPatient())
    }

    return (
        <Box>
            <h1>Patienten</h1>
            <div style={{ display: 'flex', height: 'fit-content', minHeight: '371px' }}>
                {patients !== null
                    ?
                    <Box style={{ flexGrow: 1 }}>
                        <DataGrid
                            disableSelectionOnClick={true}
                            rows={patients}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            onRowClick={(rowData) => openDetail(rowData.row['id'])}
                        />

                        <Button variant="contained" sx={{ marginTop: "1rem" }} onClick={createNew}>
                            Patient erstellen
                        </Button>
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
