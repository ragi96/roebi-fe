import React, { useState } from "react";
import { AppBar, Box, Grid, IconButton, Toolbar, Drawer } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu";
import { useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';
import DrawerContent from './DrawerContent';

interface ILayout {
    children: React.ReactNode
}
export default function Layout(props: ILayout) {
    const [open, setOpen] = useState(false);
    const isAuthenticated = useAppSelector((state: RootState) => state.reducers.user.authenticated);
    return (
        <Box>
            {isAuthenticated
                ? <Grid>
                    <AppBar position="relative">
                        <Toolbar>
                            <IconButton color="inherit" onClick={() => setOpen(true)}>
                                <MenuIcon />
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    <Grid item>
                        <Drawer open={open} onClose={() => setOpen(false)}>
                            <DrawerContent />
                        </Drawer>
                    </Grid>
                    <Grid item>
                        <Box sx={{
                            display: "block", margin: "0 auto", maxWidth: "1200px", width: "100%", padding: "2rem 1rem"
                        }}>
                            {props.children}
                        </Box>
                    </Grid>
                </Grid >
                :

                <Grid>
                    <Grid>
                        {props.children}
                    </Grid>
                </Grid>
            }
        </Box>
    )
}