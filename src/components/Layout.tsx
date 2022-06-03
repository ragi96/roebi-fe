import React, { useState } from "react";
import { AppBar, Grid, IconButton, Toolbar, Drawer, Box } from "@mui/material"
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
                ? <Grid container>
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
                        {props.children}
                    </Grid>
                </Grid >
                :

                <Grid>
                    <Grid item>
                        {props.children}
                    </Grid>
                </Grid>
            }
        </Box>
    )
}