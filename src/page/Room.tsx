import React, { useEffect } from 'react';
import { Box, CircularProgress } from "@mui/material/";
import { useAppDispatch } from '../app/hooks';
import { useAppSelector } from '../app/hooks';
import { allRooms } from '../redux/actions/roomActions';
import { RootState } from '../app/store';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { getRoomById } from '../redux/actions/roomActions';
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

export default function Room() {
    const navigate = useNavigate();
    let activeRoom = useAppSelector((state: RootState) => state.reducers.room.activeRoom);
    const rooms = useAppSelector((state: RootState) => state.reducers.room.rooms);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(allRooms())
    }, []);

    useEffect(() => {
        if (activeRoom !== null) {
            let activeId = activeRoom.id;
            if (activeId !== 0 && activeId !== undefined) {
                navigate("/room/" + activeId)
            }
        }
    }, [activeRoom, navigate, dispatch]);

    function openDetail(toActivateId: number) {
        dispatch(getRoomById(toActivateId))
    }
    return (
        <Box>
            <h1>Rooms</h1>
            <div style={{ display: 'flex', height: 'fit-content', minHeight: '350px' }}>
                <div style={{ flexGrow: 1 }}>
                    {rooms !== null
                        ?
                        <DataGrid
                            disableSelectionOnClick={true}
                            rows={rooms}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            onRowClick={(rowData) => openDetail(rowData.row['id'])}
                        />
                        :
                        <Box>
                            <CircularProgress />
                        </Box>
                    }
                </div>
            </div>
        </Box>
    );
}
