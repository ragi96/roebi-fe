import React, { useState } from "react";
import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout';
import PeopleIcon from '@mui/icons-material/People';
import BedroomChildIcon from '@mui/icons-material/BedroomChild';
import MedicationIcon from '@mui/icons-material/Medication';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { logoutUser } from "../redux/actions/userActions";
import { useAppDispatch } from "../app/hooks";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";


export default function DrawerContent() {
    let dispatch = useAppDispatch();
    let navigate = useNavigate();

    function handleLogout() {
        dispatch(logoutUser())
        navigate('/login');
    }
    return (
        <div>
            <List>
                <ListItem component={Link} to="/dashboard">
                    <ListItemButton>
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText>Dashboard</ListItemText>
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton>
                        <ListItemIcon>
                            <PeopleIcon />
                        </ListItemIcon>
                        <ListItemText>Patient</ListItemText>
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton>
                        <ListItemIcon>
                            <MedicationIcon />
                        </ListItemIcon>
                        <ListItemText>Medikamente</ListItemText>
                    </ListItemButton>
                </ListItem>
                <ListItem component={Link} to="/room">
                    <ListItemButton>
                        <ListItemIcon>
                            <BedroomChildIcon />
                        </ListItemIcon>
                        <ListItemText>Raum</ListItemText>
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem onClick={handleLogout}>
                    <ListItemButton>
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText>Logout</ListItemText>
                    </ListItemButton>
                </ListItem>
            </List>
        </div>
    )
}