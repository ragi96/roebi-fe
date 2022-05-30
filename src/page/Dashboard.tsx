import React, { useState } from 'react';
import { currentUser } from '../services/api/auth';
import { Box } from "@mui/material/";
import NavBar from '../components/NavBar';
export default function Dashboard() {
    let user = currentUser();
    console.log(user);
    return (
        <Box sx={{ display: 'flex' }}>
            <NavBar></NavBar>
        </Box>
    )
}