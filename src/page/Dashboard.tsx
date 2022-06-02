import { Box } from "@mui/material/";
import NavBar from "../components/NavBar";
//import { useAppSelector } from '../app/hooks';
// import { User } from "../services/openapi";

export default function Dashboard() {
    // let user = useAppSelector(state => state);
    return (
        <Box sx={{ display: "block" }}>
            <NavBar />
            <Box>
                <h1>Dashboard</h1>
            </Box>
        </Box>
    );
}
