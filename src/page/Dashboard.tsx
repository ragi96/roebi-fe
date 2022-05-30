import React, { useEffect } from "react";
import { currentUser } from "../services/api/auth";
import { Box } from "@mui/material/";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    let navigate = useNavigate();
    useEffect(() => {
        const fetchUser = async () => {
            let user = await currentUser();
            console.log(user);
            if (user instanceof Error) {
                navigate("/login");
            }
        };
        fetchUser();
    }, []);
    return (
        <Box sx={{ display: "flex" }}>
            <NavBar />
        </Box>
    );
}
