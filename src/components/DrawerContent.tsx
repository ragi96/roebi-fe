import React from "react";
import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout';
import PeopleIcon from '@mui/icons-material/People';
import BedroomChildIcon from '@mui/icons-material/BedroomChild';
import MedicationIcon from '@mui/icons-material/Medication';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotesIcon from '@mui/icons-material/Notes';
import { logoutUser } from "../redux/actions/userActions";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { RootState } from "../app/store";


export default function DrawerContent() {
    let dispatch = useAppDispatch();
    let navigate = useNavigate();
    const user = useAppSelector((state: RootState) => state.reducers.user.currentUser);

    function handleLogout() {
        dispatch(logoutUser())
        navigate('/login');
    }
    return (
        <Box>
            <List>
                {user?.role === 1 || user?.role === 2 || user?.role === 3
                    ?
                    <ListItem component={Link} to="/dashboard">
                        <ListItemButton>
                            <ListItemIcon>
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText sx={{
                                color: "#000"
                            }}>Dashboard</ListItemText>
                        </ListItemButton>
                    </ListItem>
                    : ''
                }
                {user?.role === 1 || user?.role === 2
                    ?
                    <ListItem component={Link} to="/patient">
                        <ListItemButton>
                            <ListItemIcon>
                                <PeopleIcon />
                            </ListItemIcon>
                            <ListItemText sx={{
                                color: "#000"
                            }}>Patient</ListItemText>
                        </ListItemButton>
                    </ListItem>
                    : ''
                }
                {user?.role === 1 || user?.role === 2
                    ?
                    <ListItem component={Link} to="/medication">
                        <ListItemButton>
                            <ListItemIcon>
                                <AccessTimeIcon />
                            </ListItemIcon>
                            <ListItemText sx={{
                                color: "#000"
                            }}>Medikation</ListItemText>
                        </ListItemButton>
                    </ListItem>
                    : ''
                }
                {user?.role === 1 || user?.role === 2
                    ?
                    <ListItem component={Link} to="/medicine">
                        <ListItemButton>
                            <ListItemIcon>
                                <MedicationIcon />
                            </ListItemIcon>
                            <ListItemText sx={{
                                color: "#000"
                            }}>Medikamente</ListItemText>
                        </ListItemButton>
                    </ListItem>
                    : ''
                }
                {user?.role === 1
                    ?
                    <ListItem component={Link} to="/room">
                        <ListItemButton>
                            <ListItemIcon>
                                <BedroomChildIcon />
                            </ListItemIcon>
                            <ListItemText sx={{
                                color: "#000"
                            }}>Raum</ListItemText>
                        </ListItemButton>
                    </ListItem>
                    : ''
                }
            </List>
            <Divider />
            <List>
                <ListItem component={Link} to="/account">
                    <ListItemButton>
                        <ListItemIcon>
                            <AccountCircleIcon />
                        </ListItemIcon>
                        <ListItemText sx={{
                            color: "#000"
                        }}>Mein Account</ListItemText>
                    </ListItemButton>
                </ListItem>
                {user?.role === 1
                    ?
                    <ListItem component={Link} to="/logs">
                        <ListItemButton>
                            <ListItemIcon>
                                <NotesIcon />
                            </ListItemIcon>
                            <ListItemText sx={{
                                color: "#000"
                            }}>Logs</ListItemText>
                        </ListItemButton>
                    </ListItem>
                    : ''
                }
                <ListItem onClick={handleLogout}>
                    <ListItemButton>
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText>Logout</ListItemText>
                    </ListItemButton>
                </ListItem>
            </List>
        </Box >
    )
}