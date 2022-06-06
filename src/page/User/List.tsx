import React, { useEffect } from 'react';
import { Box, Button, CircularProgress } from "@mui/material/";
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { allUsers, newUser, getUserById } from '../../redux/actions/userActions';
import { RootState } from '../../app/store';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';

const getRole = (params: any) => {
    switch (params.value) {
        case 1:
            return "Admin"
        case 2:
            return "User"
        case 3:
            return "Roboter"
        default:
            break;
    }
};

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'username',
        headerName: 'Username',
        flex: 1,
    },
    {
        field: 'firstName',
        headerName: 'Vorname',
        flex: 1,
    },
    {
        field: 'lastName',
        headerName: 'Nachname',
        flex: 1,
    },
    {
        field: 'role',
        headerName: 'Rolle',
        flex: 1,
        valueGetter: getRole
    },
];

export default function User() {
    const navigate = useNavigate();
    const activeUser = useAppSelector((state: RootState) => state.reducers.users.activeUser);
    const users = useAppSelector((state: RootState) => state.reducers.users.users);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(allUsers())
    }, []);

    useEffect(() => {
        if (activeUser !== null) {
            let activeId = activeUser.id;
            if (activeId !== 0 && activeId !== undefined) {
                navigate("/user/" + activeId)
            } else if (activeId === 0) {
                navigate("/user/new")
            }
        }
    }, [activeUser, navigate, dispatch]);

    function openDetail(toActivateId: number) {
        dispatch(getUserById(toActivateId))
    }

    function createNew() {
        dispatch(newUser())
    }

    return (
        <Box>
            <h1>Benutzer</h1>
            <div style={{ display: 'flex', height: 'fit-content', minHeight: '371px' }}>
                {users !== null
                    ?
                    <Box style={{ flexGrow: 1 }}>
                        <DataGrid
                            disableSelectionOnClick={true}
                            rows={users}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            onRowClick={(rowData) => openDetail(rowData.row['id'])}
                        />

                        <Button variant="contained" sx={{ marginTop: "1rem" }} onClick={createNew}>
                            Benutzer erstellen
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
