import React from 'react';
import './App.css';

import Camera from './Component/Camera';
import { Box, Grid } from '@mui/material';
import DrawerAppBar from './Component/AppBar';
import FishInformation from './Component/FishInformation';

function App() {
    return (
        <>
            <DrawerAppBar />
            <Grid
                sx={{ p: 5}}
                container
                justifyContent='center'
            >
                <Grid item>
                    <Camera />
                </Grid>


                <Grid item>
                    <FishInformation />
                </Grid>
            </Grid>
        </>
    );
}

export default App;
