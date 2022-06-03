import React, { useEffect } from 'react';
import { Box, Button, CircularProgress } from "@mui/material/";
import { useAppDispatch } from '../../app/hooks';
import { useAppSelector } from '../../app/hooks';
import { allMedications, newMedication } from '../../redux/actions/medicationActions';
import { RootState } from '../../app/store';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { getMedicationById } from '../../redux/actions/medicationActions';
import { useNavigate } from 'react-router-dom';

const getMedicine = (params: any) => params.value.name;
const getPatientName = (params: any) => params.value.firstname + ' ' + params.value.lastName;
const getTakingStamp = (params: any) => new Date(params.value * 1000).toLocaleString();

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'patient',
        headerName: 'Patient',
        width: 250,
        valueGetter: getPatientName
    },
    {
        field: 'medicine',
        headerName: 'Medikament',
        width: 200,
        valueGetter: getMedicine,
    },
    {
        field: 'takingStamp',
        headerName: 'Geplanter Einahme Zeitpunkt',
        flex: 1,
        valueGetter: getTakingStamp
    }
];

export default function Medication() {
    const navigate = useNavigate();
    const activeMedication = useAppSelector((state: RootState) => state.reducers.medication.activeMedication);
    const medications = useAppSelector((state: RootState) => state.reducers.medication.medications);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(allMedications())
    }, []);

    useEffect(() => {
        if (activeMedication !== null) {
            let activeId = activeMedication.id;
            if (activeId !== 0 && activeId !== undefined) {
                navigate("/medication/" + activeId)
            } else if (activeId === 0) {
                navigate("/medication/new")
            }
        }
    }, [activeMedication, navigate]);

    function openDetail(toActivateId: number) {
        dispatch(getMedicationById(toActivateId))
    }

    function createNew() {
        dispatch(newMedication())
    }

    return (
        <Box>
            <h1>Medikation</h1>
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
                            onRowClick={(rowData) => openDetail(rowData.row['id'])}
                        />

                        <Button variant="contained" sx={{ marginTop: "1rem" }} onClick={createNew}>
                            Medikation hinzufügen
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
