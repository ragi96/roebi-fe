import React, { useEffect } from 'react';
import { Box, Divider, CircularProgress } from "@mui/material/";
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { allLogs } from '../../redux/actions/logActions';
import { allRoboterLogs } from '../../redux/actions/roboterLogActions';

const getTimestamp = (params: any) => new Date(params.value * 1000).toLocaleString();

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', maxWidth: 90 },
    {
        field: 'timestamp',
        headerName: 'Zeitpunkt',
        minWidth: 175,
        valueGetter: getTimestamp
    },
    {
        field: 'message',
        headerName: 'Log',
        width: 500,
        flex: 1,
    }
];

export default function Logs() {
    const logs = useAppSelector((state: RootState) => state.reducers.log.logs);
    const roboterLogs = useAppSelector((state: RootState) => state.reducers.roboterLog.roboterLogs)
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(allLogs())
        dispatch(allRoboterLogs())
    }, []);

    return (
        <Box>
            <h1>Log</h1>
            <div style={{ display: 'flex', height: 'fit-content', minHeight: '800px' }}>
                {logs !== null
                    ?
                    <Box style={{ flexGrow: 1 }}>
                        <DataGrid
                            disableSelectionOnClick={true}
                            rows={logs}
                            columns={columns}
                            pageSize={15}
                            rowsPerPageOptions={[15]}
                            initialState={{
                                sorting: {
                                    sortModel: [{ field: 'id', sort: 'desc' }],
                                },
                            }}
                        />
                    </Box>
                    :
                    <Box>
                        <CircularProgress />
                    </Box>
                }
            </div>
            <Divider sx={{ marginTop: "2rem" }} />
            <h1>Roboter Log</h1>
            <div style={{ display: 'flex', height: 'fit-content', minHeight: '800px' }}>
                {roboterLogs !== null
                    ?
                    <Box style={{ flexGrow: 1 }}>
                        <DataGrid
                            disableSelectionOnClick={true}
                            rows={roboterLogs}
                            columns={columns}
                            pageSize={15}
                            rowsPerPageOptions={[15]}
                            initialState={{
                                sorting: {
                                    sortModel: [{ field: 'id', sort: 'desc' }],
                                },
                            }}
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