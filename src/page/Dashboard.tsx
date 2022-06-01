import { Box } from "@mui/material/";
import NavBar from "../components/NavBar";
import { useSelector } from 'react-redux';
import { User } from "../services/openapi";

export default function Dashboard() {

    let user = useSelector(state => state);

    console.log(user);
    return (
        <Box sx={{ display: "block" }}>
            <NavBar />
            <Box>
                <h1>Dashboard</h1>
            </Box>
        </Box>
    );
}
