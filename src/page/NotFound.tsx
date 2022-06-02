import { Box } from "@mui/material/";
import NavBar from "../components/NavBar";

export default function NotFound() {
    return (
        <Box sx={{ display: "block" }}>
            <NavBar />
            <Box>
                <h1>Not Found</h1>
            </Box>
        </Box>
    );
}
