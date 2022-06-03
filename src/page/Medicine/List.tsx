import React, { useEffect } from 'react';
import { Box, Button, CircularProgress } from "@mui/material/";
import { useAppDispatch } from '../../app/hooks';
import { useAppSelector } from '../../app/hooks';
import { allMedicines, newMedicine, getMedicineById } from '../../redux/actions/medicineActions';
import { RootState } from '../../app/store';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'name',
        headerName: 'Name',
        flex: 1,
        editable: true,
    },
];

export default function Medicine() {
    const navigate = useNavigate();
    const activeMedicine = useAppSelector((state: RootState) => state.reducers.medicine.activeMedicine);
    const medicines = useAppSelector((state: RootState) => state.reducers.medicine.medicines);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(allMedicines())
    }, []);

    useEffect(() => {
        if (activeMedicine !== null) {
            let activeId = activeMedicine.id;
            if (activeId !== 0 && activeId !== undefined) {
                navigate("/medicine/" + activeId)
            } else if (activeId === 0) {
                navigate("/medicine/new")
            }
        }
    }, [activeMedicine, navigate, dispatch]);

    function openDetail(toActivateId: number) {
        dispatch(getMedicineById(toActivateId))
    }

    function createNew() {
        dispatch(newMedicine())
    }

    return (
        <Box>
            <h1>Medikamente</h1>
            <div style={{ display: 'flex', height: 'fit-content', minHeight: '371px' }}>
                {medicines !== null
                    ?
                    <Box style={{ flexGrow: 1 }}>
                        <DataGrid
                            disableSelectionOnClick={true}
                            rows={medicines}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            onRowClick={(rowData) => openDetail(rowData.row['id'])}
                        />

                        <Button variant="contained" sx={{ marginTop: "1rem" }} onClick={createNew}>
                            Medikament erstellen
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
